const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// ── Signup (OTP flow) ────────────────────────────────────────────────────────
router.get("/signup", userController.renderSignUpForm);

// Step 1 – send OTP to the supplied email
router.post(
  "/send-otp",
  wrapAsync(userController.sendOtpVerificationEmail)
);

// Step 2 – verify OTP, create user, log in
router.post(
  "/signup",
  wrapAsync(userController.verifyOtpAndSignup)
);

// ── Login / Logout ───────────────────────────────────────────────────────────
router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout", userController.logout);

module.exports = router;
