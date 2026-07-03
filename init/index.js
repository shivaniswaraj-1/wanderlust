require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Uses Atlas URL from .env if available, falls back to local for convenience
const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  // NOTE: Replace the owner ID below with a real User _id from your DB
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a3f75e56a254d68a293284f",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
