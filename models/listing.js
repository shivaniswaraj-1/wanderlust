const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const Booking = require("./booking.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  // Backs the clickable filter bar on the index page (Trending, Rooms, ...).
  category: {
    type: String,
    enum: [
      "trending", "rooms", "iconic-cities", "mountains", "castles",
      "amazing-pools", "camping", "farm", "arctic", "domes", "boats",
    ],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // geometry is optional – populated by Nominatim geocoding at create time.
  // NOT marked required so a geocoding failure never blocks listing creation.
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
});

// Cascade-delete all reviews and bookings when the listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
    await Booking.deleteMany({ listing: listing._id });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
