const Listing    = require("./models/listing");
const Review     = require("./models/reviews");
const Booking    = require("./models/booking");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema, bookingSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do that!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// isOwner – safe null check before .equals()
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }
  if (!listing.owner || !listing.owner._id.equals(req.user._id)) {
    req.flash("error", "You are not the owner of this listing.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Every form on the site now carries a `_csrf` field (see app.js's CSRF
// setup), which isn't part of any of these domain schemas — Joi rejects
// unknown top-level keys by default, so it must be stripped before
// validating, not treated as a schema field.
function withoutCsrf(body) {
  const { _csrf, ...rest } = body;
  return rest;
}

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(withoutCsrf(req.body));
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(withoutCsrf(req.body));
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// isReviewAuthor – safe null check before .equals()
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }
  if (!review.author || !review.author._id.equals(req.user._id)) {
    req.flash("error", "You are not the author of this review.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(withoutCsrf(req.body));
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// isBookingGuest – only the guest who made a booking may cancel it
module.exports.isBookingGuest = async (req, res, next) => {
  const { bookingId } = req.params;
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    req.flash("error", "Booking not found.");
    return res.redirect("/trips");
  }
  if (!booking.guest || !booking.guest._id.equals(req.user._id)) {
    req.flash("error", "You are not the guest on this booking.");
    return res.redirect("/trips");
  }
  next();
};
