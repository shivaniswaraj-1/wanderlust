const mongoose = require("mongoose");

// ── OTP model ──────────────────────────────────────────────────────────────
// Stores ONLY what's needed to verify that a given email requested and
// received a specific one-time code. It intentionally does NOT store the
// user's username or password (plaintext, hashed, or encrypted) — those are
// only ever handled in the single request that actually creates the account
// (see verifyOtpAndSignup in controllers/users.js). This keeps the blast
// radius of a leaked `otps` collection to "an email address and a 6-digit
// code that expires in 5 minutes," never any credential material.
//
// The `createdAt` field has `expires: 300`, which tells MongoDB to build a
// TTL index and automatically delete the document 300 seconds (5 minutes)
// after `createdAt`. No manual cleanup job or expiry check is required.
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // TTL in seconds — MongoDB deletes the doc automatically
  },
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;