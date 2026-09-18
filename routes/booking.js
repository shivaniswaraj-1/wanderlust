const express = require("express");
// mergeParams: true lets us access :id from the parent /listings/:id route
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateBooking } = require("../middleware.js");
const bookingController = require("../controllers/bookings.js");

// POST /listings/:id/bookings → createBooking
router.post(
  "/",
  isLoggedIn,
  validateBooking,
  wrapAsync(bookingController.createBooking)
);

module.exports = router;
