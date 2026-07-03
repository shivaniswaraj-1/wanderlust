const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const { cloudinary, uploadToCloudinary } = require("../cloudConfig");

// ── Nominatim geocoding (OpenStreetMap – no API key required) ────────────────
async function geocodeLocation(locationString) {
  try {
    const encoded = encodeURIComponent(locationString);
    const url =
      `https://nominatim.openstreetmap.org/search` +
      `?q=${encoded}&format=json&limit=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "WanderLust/1.0 (wanderlust-app; contact@example.com)",
      },
    });

    if (!response.ok) {
      console.warn(`[Geocoding] Nominatim returned HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (!data || data.length === 0) {
      console.warn(`[Geocoding] No results for: "${locationString}"`);
      return null;
    }

    const { lon, lat } = data[0];
    return {
      type: "Point",
      coordinates: [parseFloat(lon), parseFloat(lat)],
    };
  } catch (err) {
    console.error("[Geocoding] Error fetching from Nominatim:", err.message);
    return null;
  }
}
// ─────────────────────────────────────────────────────────────────────────────

module.exports.index = async (req, res) => {
  let allListing = await Listing.find({});
  res.render("./listings/index.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Bad request");
  }

  // Geocode with Nominatim (free, no token required)
  const locationQuery =
    `${req.body.listing.location}, ${req.body.listing.country}`.trim();
  const geometry = await geocodeLocation(locationQuery);

  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  // Image: upload buffer to Cloudinary v2 if a file was provided
  if (req.file) {
    const { url, filename } = await uploadToCloudinary(
      req.file.buffer,
      req.file.mimetype
    );
    newListing.image = { url, filename };
  } else {
    newListing.image = {
      url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "default",
    };
  }

  newListing.geometry = geometry || { type: "Point", coordinates: [0, 0] };

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl =
    listing.image && listing.image.url
      ? listing.image.url.replace("/upload", "/upload/h_300,w_250")
      : "";
  res.render("./listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    // Delete old image from Cloudinary (skip default placeholder)
    if (listing.image && listing.image.filename && listing.image.filename !== "default") {
      await cloudinary.uploader.destroy(listing.image.filename);
    }
    const { url, filename } = await uploadToCloudinary(
      req.file.buffer,
      req.file.mimetype
    );
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndDelete(id);
  // Clean up Cloudinary image on delete
  if (listing && listing.image && listing.image.filename && listing.image.filename !== "default") {
    await cloudinary.uploader.destroy(listing.image.filename);
  }
  req.flash("success", "Deleted listing!");
  res.redirect("/listings");
};
