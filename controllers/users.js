const User = require("../models/user");
const Otp  = require("../models/otp");
const nodemailer = require("nodemailer");

// ── Temporary debug logging ─────────────────────────────────────────────────
// Gated behind an env var so it can be flipped on during an incident
// investigation without a code change, and stays silent by default.
// Set DEBUG_SIGNUP=true in the environment to enable.
// TODO: remove this whole block once the OTP/signup flow has been stable
// in production for a while — it is not meant to be permanent.
const DEBUG = process.env.DEBUG_SIGNUP === "true";
function debugLog(...args) {
  if (DEBUG) console.log("[DEBUG signup]", ...args);
}

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to WanderLust! you are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};

// ── Step 1: send OTP to email ────────────────────────────────────────────────
// Only ever receives/handles `email`. Username and password are NOT sent
// here (the client keeps them locally until the final /signup submission),
// and nothing here is persisted except the email + one-time code.
module.exports.sendOtpVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        debugLog("/send-otp body:", req.body);

        if (!email || typeof email !== "string") {
            return res.status(400).json({
                success: false,
                message: "A valid email is required.",
            });
        }

        // ⛔ Duplicate email check
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            debugLog("rejected, email already registered:", email);
            return res.status(400).json({
                success: false,
                message: "Email is already registered. Please log in instead.",
            });
        }

        const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

        // Delete any previous OTP for this email before creating a new one,
        // so re-clicking "Send Verification Code" doesn't leave stale docs
        // behind (the TTL index would clean them up eventually anyway, but
        // this keeps only one active code per email at a time).
        await Otp.deleteMany({ email });

        // Persist ONLY the email + code. TTL index in models/otp.js deletes
        // this automatically after 5 minutes.
        await Otp.create({ email, code: otp });
        debugLog("OTP persisted for", email, "(expires in 5 min)");

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.VERIFICATION_SENDER_EMAIL,
                pass: process.env.VERIFICATION_EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.VERIFICATION_SENDER_EMAIL,
            to: email,
            subject: "Welcome to WanderLust! Here's your OTP to complete the signup:",
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        });

        debugLog("OTP email sent to", email);
        res.status(200).json({ success: true, message: "OTP sent!" });

    } catch (error) {
        console.error("[send-otp] ERROR:", error); // always logged — genuine failure, not a debug trace
        res.status(500).json({
            success: false,
            message: "Failed to send OTP",
            error: error.message,
        });
    }
};

// ── Step 2: verify OTP (from MongoDB) and complete signup ──────────────────
// This is the ONLY place the plaintext password ever exists. It arrives in
// this request's body over TLS, is handed directly to
// `User.register()` (which hashes + salts it via passport-local-mongoose's
// PBKDF2 implementation and saves the resulting hash), and is never written
// to any collection — not plaintext, not hashed, not encrypted — outside of
// the User document itself.
module.exports.verifyOtpAndSignup = async (req, res, next) => {
    const { username, email, password, otp } = req.body;
    debugLog("/signup body (password redacted):", { username, email, otp });

    if (!username || !email || !password || !otp) {
        req.flash("error", "All fields are required.");
        return res.redirect("/signup");
    }

    const stored = await Otp.findOne({ email });
    debugLog("OTP lookup:", stored ? "found" : "not found / expired");

    if (!stored || stored.code !== otp) {
        req.flash("error", "Invalid or expired OTP");
        return res.redirect("/signup");
    }

    try {
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        debugLog("User.register succeeded for", username);

        // OTP is single-use: delete it immediately after a successful signup
        // so it can never be replayed, even within its remaining TTL window.
        await Otp.deleteOne({ email });

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            debugLog("session created for", registeredUser.username);
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });

    } catch (err) {
        console.error("[signup] registration ERROR:", err); // always logged
        if (err.code === 11000) {
            req.flash("error", "That email or username is already registered.");
        } else {
            req.flash("error", err.message);
        }
        res.redirect("/signup");
    }
};