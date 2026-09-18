const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isBookingGuest } = require("../middleware.js");
const bookingController = require("../controllers/bookings.js");

// GET /trips → the logged-in user's own bookings
router.get("/", isLoggedIn, wrapAsync(bookingController.index));

// DELETE /trips/:bookingId → cancel a booking
router.delete(
  "/:bookingId",
  isLoggedIn,
  isBookingGuest,
  wrapAsync(bookingController.destroyBooking)
);

module.exports = router;
