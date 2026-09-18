const rateLimit = require("express-rate-limit");

// Limits how often a given IP can request an OTP be emailed out. Without this,
// /send-otp can be scripted to spam arbitrary inboxes from our Gmail sender
// (reputation/ban risk) or to rapid-fire OTP generation for a brute-force run.
module.exports.otpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many verification codes requested. Please try again later.",
  },
});

// Limits OTP verification (signup completion) attempts per IP, independent of
// the per-code attempt counter in models/otp.js — this stops an attacker from
// rotating through many different emails/codes from one IP.
module.exports.otpVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    req.flash("error", "Too many attempts. Please try again later.");
    res.redirect("/signup");
  },
});

// Limits login attempts per IP to slow down password brute-forcing.
module.exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    req.flash("error", "Too many login attempts. Please try again later.");
    res.redirect("/login");
  },
});
