# WanderLust — Complete Setup Guide

## Prerequisites
| Requirement | Minimum version |
|---|---|
| Node.js | 18.0.0 or newer |
| npm | 8.x or newer |
| MongoDB Atlas account | free tier works |
| Cloudinary account | free tier works |
| Gmail account | for OTP emails |

---

## 1. Unzip & enter the project

```bash
unzip WanderLust.zip
cd WanderLust
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in **all** values:

| Variable | Where to get it |
|---|---|
| `ATLASDB_URL` | MongoDB Atlas → Connect → Drivers → copy URI |
| `SECRET` | Any long random string (≥ 32 chars) |
| `CLOUD_NAME` | Cloudinary Dashboard |
| `CLOUD_API_KEY` | Cloudinary Dashboard |
| `CLOUD_API_SECRET` | Cloudinary Dashboard |
| `VERIFICATION_SENDER_EMAIL` | Your Gmail address |
| `VERIFICATION_EMAIL_PASSWORD` | Gmail App Password (see below) |

### Gmail App Password
1. Google Account → Security → 2-Step Verification → enable it
2. Google Account → Security → App Passwords
3. Generate a password for "Mail / Other" → copy the 16-char code
4. Paste it as `VERIFICATION_EMAIL_PASSWORD` (not your regular Gmail password)

> **MAP_TOKEN is NOT required.**
> Maps use Leaflet + OpenStreetMap (free, no account needed).
> Geocoding uses Nominatim API (free, no account needed).

---

## 4. (Optional) Seed sample listings

```bash
npm run init
```

⚠️  Edit `init/index.js` first and replace the hardcoded owner ObjectId with a
real User `_id` from your database, or create a user via signup first.

---

## 5. Start the server

```bash
npm start         # production
npm run dev       # development (auto-restart with nodemon)
```

Open → **http://localhost:8080**

---

## Project structure

```
WanderLust/
├── app.js                        Main Express application
├── cloudConfig.js                Cloudinary v2 + multer memoryStorage setup
├── middleware.js                 isLoggedIn, isOwner, validateListing, validateReview, etc.
├── schema.js                     Joi validation schemas
├── package.json
├── .env.example
├── SETUP.md
│
├── utils/
│   ├── wrapAsync.js              Async error wrapper for route handlers
│   └── ExpressError.js           Custom HTTP error class
│
├── models/
│   ├── listing.js                Listing schema (with geometry for map)
│   ├── reviews.js                Review schema
│   └── user.js                   User schema (passport-local-mongoose)
│
├── controllers/
│   ├── listings.js               Listing CRUD + Nominatim geocoding
│   ├── reviews.js                Review create/delete
│   └── users.js                  Signup (OTP flow), login, logout
│
├── routes/
│   ├── listing.js                /listings routes
│   ├── review.js                 /listings/:id/reviews routes
│   └── user.js                   /signup /send-otp /login /logout routes
│
├── views/
│   ├── layouts/boilerplate.ejs   Main HTML shell (Leaflet, Bootstrap, FA)
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── flash.ejs
│   │   └── footer.ejs
│   ├── listings/
│   │   ├── index.ejs             All listings grid + category filters
│   │   ├── show.ejs              Single listing + Leaflet map + reviews
│   │   ├── new.ejs               Create listing form
│   │   └── edit.ejs              Edit listing form
│   ├── users/
│   │   ├── signup.ejs            Two-step OTP signup
│   │   └── login.ejs
│   └── error.ejs
│
├── public/
│   ├── css/
│   │   ├── style.css             Custom styles
│   │   └── rating.css            Starability pure-CSS star ratings
│   └── js/
│       ├── script.js             Bootstrap validation + flash auto-dismiss
│       └── map.js                Leaflet map initialisation (show page)
│
└── init/
    ├── index.js                  Database seeder runner
    └── data.js                   12 sample listings
```

---

## Key technical decisions

| Feature | Implementation |
|---|---|
| Maps | Leaflet + OpenStreetMap (free, no token) |
| Geocoding | Nominatim API (free, no token) |
| Image uploads | Cloudinary v2 via `upload_stream` + multer `memoryStorage` |
| Authentication | Passport.js local strategy + passport-local-mongoose |
| Email / OTP | Nodemailer v9 via Gmail App Password |
| Sessions | express-session + connect-mongo (stored in Atlas) |
| Validation | Joi (server-side) + Bootstrap (client-side) |
| Star ratings | Starability pure-CSS widget |

---

## Signup flow (OTP)

1. User fills in username, email, password → clicks **Send Verification Code**
2. Front-end POSTs to `POST /send-otp` → Nodemailer sends a 6-digit OTP to the email
3. User enters OTP → form POSTs to `POST /signup`
4. Server validates OTP, creates user, logs in, redirects to `/listings`

