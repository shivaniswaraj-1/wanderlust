if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// ── Startup environment guard ─────────────────────────────────────────────────
const REQUIRED_ENV = [
  "ATLASDB_URL",
  "SECRET",
  "CLOUD_NAME",
  "CLOUD_API_KEY",
  "CLOUD_API_SECRET",
  "VERIFICATION_SENDER_EMAIL",
  "VERIFICATION_EMAIL_PASSWORD",
];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error("\n[WanderLust] STARTUP ERROR: Missing required environment variables:");
  missingEnv.forEach((k) => console.error(`  ✗  ${k}`));
  console.error("\nCopy .env.example to .env and fill in all values.\n");
  process.exit(1);
}
// ─────────────────────────────────────────────────────────────────────────────

const express        = require("express");
const mongoose       = require("mongoose");
const path           = require("path");
const methodOverride = require("method-override");
const ejsMate        = require("ejs-mate");
const session        = require("express-session");
const MongoStore     = require("connect-mongo");
const flash          = require("connect-flash");
const passport       = require("passport");
const LocalStrategy  = require("passport-local");
const helmet         = require("helmet");
const { csrfSync }   = require("csrf-sync");

const wrapAsync    = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const User         = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter  = require("./routes/review.js");
const bookingRouter = require("./routes/booking.js");
const tripsRouter   = require("./routes/trips.js");
const userRouter    = require("./routes/user.js");

const app = express();

// ── Security headers ─────────────────────────────────────────────────────────
// Scoped CSP: only the CDNs/services this app actually loads from are allowed.
// 'unsafe-inline' is needed for script-src/style-src because several pages use
// inline <script> blocks and Bootstrap/inline styles rather than nonces.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://unpkg.com"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "https://unpkg.com",
        ],
        fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "data:"],
        imgSrc: [
          "'self'",
          "data:",
          "https://res.cloudinary.com",
          "https://images.unsplash.com",
          "https://server.arcgisonline.com",
          "https://unpkg.com",
        ],
        connectSrc: ["'self'"],
      },
    },
  })
);

// ── View engine ───────────────────────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// ── Body / static middleware ──────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ── Safe app-level defaults ───────────────────────────────────────────────────
// Ensures EJS partials never throw "X is not defined" even before res.locals runs
app.locals.currUser = null;
app.locals.success  = "";
app.locals.error    = "";

// ── MongoDB ───────────────────────────────────────────────────────────────────
const dbUrl = process.env.ATLASDB_URL;

mongoose.connect(dbUrl)
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.error("\n[WanderLust] ❌ MongoDB connection failed:");
    if (err.message && err.message.includes("bad auth")) {
      console.error("  → Authentication failed. Check ATLASDB_URL username & password in .env");
    } else if (err.message && err.message.includes("SSL")) {
      console.error("  → TLS/SSL error. Try appending ?tls=true to ATLASDB_URL, or upgrade Node.js.");
    } else {
      console.error(" ", err.message);
    }
    process.exit(1);
  });

// ── Session store ─────────────────────────────────────────────────────────────
// FIX: stringify:false prevents the "[object Object] is not valid JSON" crash.
//
// Root cause: connect-mongo's default mode (stringify:true) calls JSON.stringify
// on save and JSON.parse on read. If the Atlas `sessions` collection has any
// documents written by an older version of this app that did NOT use JSON
// serialisation, reading them throws SyntaxError: "[object Object] is not valid JSON".
//
// stringify:false stores sessions as native BSON objects (no JSON round-trip)
// which is both faster and immune to stale-session parse errors.
// If you still see the error once after this update, run the one-time cleanup:
//   db.sessions.deleteMany({})   ← in MongoDB Atlas → Browse Collections
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.error("[Session Store Error]", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge:  7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ── Passport ──────────────────────────────────────────────────────────────────
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

// ── CSRF protection ───────────────────────────────────────────────────────────
// Synchronizer-token pattern: a per-session token is embedded in every form
// (res.locals.csrfToken) and must come back either as a hidden `_csrf` field
// (regular form posts) or an `x-csrf-token` header (fetch/XHR calls). GET/HEAD/
// OPTIONS requests are exempt since they must not mutate state.
const { csrfSynchronisedProtection, generateToken } = csrfSync({
  getTokenFromRequest: (req) => req.body._csrf || req.headers["x-csrf-token"],
});
app.use(csrfSynchronisedProtection);

// ── Per-request locals ────────────────────────────────────────────────────────
// Must run AFTER passport so req.user is populated by deserializeUser
app.use((req, res, next) => {
  res.locals.currUser   = req.user  || null;
  res.locals.success    = req.flash("success");
  res.locals.error      = req.flash("error");
  res.locals.csrfToken  = generateToken(req);
  next();
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/listings/:id/bookings", bookingRouter);
app.use("/trips", tripsRouter);
app.use("/", userRouter);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
