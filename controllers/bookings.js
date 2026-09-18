const Booking = require("../models/booking");
const Listing = require("../models/listing");

const MS_PER_NIGHT = 24 * 60 * 60 * 1000;

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const checkIn = new Date(req.body.booking.checkIn);
  const checkOut = new Date(req.body.booking.checkOut);

  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  if (listing.owner && listing.owner.equals(req.user._id)) {
    req.flash("error", "You can't book your own listing.");
    return res.redirect(`/listings/${id}`);
  }

  if (checkIn < startOfToday()) {
    req.flash("error", "Check-in date can't be in the past.");
    return res.redirect(`/listings/${id}`);
  }

  // Overlap check: two ranges [checkIn, checkOut) intersect exactly when
  // one's check-in is before the other's check-out on both sides. Doing
  // this as a DB query (not a JS loop over fetched bookings) means it stays
  // correct even if two people submit at nearly the same time — the second
  // request's query still runs against the just-saved first booking.
  const conflict = await Booking.findOne({
    listing: id,
    checkIn: { $lt: checkOut },
    checkOut: { $gt: checkIn },
  });

  if (conflict) {
    req.flash("error", "Those dates are no longer available for this listing.");
    return res.redirect(`/listings/${id}`);
  }

  const nights = Math.round((checkOut - checkIn) / MS_PER_NIGHT);
  const totalPrice = nights * listing.price;

  await Booking.create({
    listing: id,
    guest: req.user._id,
    checkIn,
    checkOut,
    totalPrice,
  });

  req.flash("success", "Your stay is booked!");
  res.redirect("/trips");
};

module.exports.index = async (req, res) => {
  const bookings = await Booking.find({ guest: req.user._id })
    .populate("listing")
    .sort({ checkIn: 1 });
  res.render("trips/index.ejs", { bookings });
};

module.exports.destroyBooking = async (req, res) => {
  const { bookingId } = req.params;
  await Booking.findByIdAndDelete(bookingId);
  req.flash("success", "Booking cancelled.");
  res.redirect("/trips");
};
