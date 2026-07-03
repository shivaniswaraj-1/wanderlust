/**
 * Sample seed data for WanderLust.
 *
 * The owner field is overwritten at seed time (init/index.js) so these
 * placeholder IDs are never written to the DB.
 *
 * geometry is intentionally omitted here – the app sets it at create-time
 * via Nominatim geocoding.  For the seeded entries we supply pre-resolved
 * coordinates so the map works immediately after seeding even without a
 * live geocoding call.
 */

const sampleListings = [
  {
    title: "Cozy Beachside Cottage",
    description:
      "A charming cottage steps from the beach. Enjoy the sound of waves and stunning sunsets every evening.",
    image: {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: { type: "Point", coordinates: [-118.7798, 34.0259] },
  },
  {
    title: "Mountain View Retreat",
    description:
      "Escape to this peaceful retreat nestled in the mountains. Perfect for hiking enthusiasts and nature lovers.",
    image: {
      url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 1200,
    location: "Aspen",
    country: "United States",
    geometry: { type: "Point", coordinates: [-106.8175, 39.1911] },
  },
  {
    title: "Historic City Centre Flat",
    description:
      "A beautifully restored flat in the heart of the old city. Walk to museums, restaurants, and landmarks.",
    image: {
      url: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 2200,
    location: "Rome",
    country: "Italy",
    geometry: { type: "Point", coordinates: [12.4964, 41.9028] },
  },
  {
    title: "Tropical Paradise Villa",
    description:
      "Luxurious villa with a private pool surrounded by tropical gardens. Pure paradise.",
    image: {
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 5000,
    location: "Bali",
    country: "Indonesia",
    geometry: { type: "Point", coordinates: [115.1889, -8.4095] },
  },
  {
    title: "Rustic Farmhouse Stay",
    description:
      "Experience farm life in this rustic farmhouse. Fresh air, open fields, and authentic countryside charm.",
    image: {
      url: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 900,
    location: "Tuscany",
    country: "Italy",
    geometry: { type: "Point", coordinates: [11.2558, 43.7711] },
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "A sleek, modern loft with city views. Close to all the action – bars, restaurants, and galleries.",
    image: {
      url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 3500,
    location: "New York City",
    country: "United States",
    geometry: { type: "Point", coordinates: [-74.006, 40.7128] },
  },
  {
    title: "Seaside Fishing Village Hut",
    description:
      "A quaint hut in a picturesque fishing village. Fresh seafood, friendly locals, and stunning sea views.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 700,
    location: "Goa",
    country: "India",
    geometry: { type: "Point", coordinates: [73.8278, 15.2993] },
  },
  {
    title: "Desert Oasis Camp",
    description:
      "Sleep under a sky full of stars at this unique desert camp. Camel rides and Bedouin culture included.",
    image: {
      url: "https://images.unsplash.com/photo-1548102245-c79dbcfa9f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 1800,
    location: "Sahara Desert",
    country: "Morocco",
    geometry: { type: "Point", coordinates: [-5.0078, 31.7917] },
  },
  {
    title: "Alpine Ski Chalet",
    description:
      "Ski-in ski-out chalet with a roaring fireplace and stunning Alpine panoramas. The ultimate winter escape.",
    image: {
      url: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 4500,
    location: "Zermatt",
    country: "Switzerland",
    geometry: { type: "Point", coordinates: [7.7491, 46.0207] },
  },
  {
    title: "Houseboat on Dal Lake",
    description:
      "A traditional Kashmiri houseboat floating on the serene Dal Lake with mountain views all around.",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 2500,
    location: "Srinagar",
    country: "India",
    geometry: { type: "Point", coordinates: [74.7973, 34.0837] },
  },
  {
    title: "Jungle Treehouse",
    description:
      "Fall asleep to the sounds of the jungle in this enchanting treehouse. Wildlife at your doorstep.",
    image: {
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 1100,
    location: "Costa Rica",
    country: "Costa Rica",
    geometry: { type: "Point", coordinates: [-84.0739, 9.7489] },
  },
  {
    title: "Cliffside Greek Villa",
    description:
      "Iconic whitewashed villa on the cliff with breathtaking caldera views and a private infinity pool.",
    image: {
      url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 6000,
    location: "Santorini",
    country: "Greece",
    geometry: { type: "Point", coordinates: [25.4615, 36.3932] },
  },
];

module.exports = { data: sampleListings };
