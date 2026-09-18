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
    category: "rooms",
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
    category: "mountains",
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
    category: "iconic-cities",
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
    category: "amazing-pools",
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
    category: "farm",
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
    category: "trending",
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
    category: "rooms",
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
    category: "camping",
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
    category: "arctic",
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
    category: "boats",
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
    category: "domes",
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
    category: "castles",
    geometry: { type: "Point", coordinates: [25.4615, 36.3932] },
  },

  // ── Additional listings so each filter-bar category has more than one
  // result. Every image below was downloaded and visually checked (not just
  // HTTP-status checked) before being added here.
  {
    title: "Skyline Villa with Private Pool",
    description:
      "A sleek modern villa with floor-to-ceiling glass and a private pool, moments from the city's best nightlife.",
    image: {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 7000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "trending",
    geometry: { type: "Point", coordinates: [55.2708, 25.2048] },
  },
  {
    title: "Boho Plant-Filled City Retreat",
    description:
      "A sun-lit, plant-filled apartment in a walkable neighbourhood full of coffee shops and record stores.",
    image: {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 1600,
    location: "Portland",
    country: "United States",
    category: "trending",
    geometry: { type: "Point", coordinates: [-122.6765, 45.5231] },
  },
  {
    title: "Minimalist Studio in the Old Town",
    description:
      "A clean, minimalist studio apartment with a fully equipped kitchen, steps from the historic centre.",
    image: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 1300,
    location: "Milan",
    country: "Italy",
    category: "rooms",
    geometry: { type: "Point", coordinates: [9.19, 45.4642] },
  },
  {
    title: "Parisian Rooftop View Apartment",
    description:
      "Wake up to views of the Seine and the Eiffel Tower from this classic Haussmann-era apartment.",
    image: {
      url: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 4000,
    location: "Paris",
    country: "France",
    category: "iconic-cities",
    geometry: { type: "Point", coordinates: [2.3522, 48.8566] },
  },
  {
    title: "Downtown Loop Loft",
    description:
      "A high-rise loft overlooking the river and skyline, right in the heart of the financial district.",
    image: {
      url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 3200,
    location: "Chicago",
    country: "United States",
    category: "iconic-cities",
    geometry: { type: "Point", coordinates: [-87.6298, 41.8781] },
  },
  {
    title: "Cloud-Covered Alpine Cabin",
    description:
      "Perched above the clouds with sweeping views of jagged peaks at sunrise — a hiker's dream basecamp.",
    image: {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 2100,
    location: "Chamonix",
    country: "France",
    category: "mountains",
    geometry: { type: "Point", coordinates: [6.8693, 45.9237] },
  },
  {
    title: "Himalayan Base Camp Lodge",
    description:
      "A cosy stone lodge with unobstructed views of snow-capped Himalayan peaks at dawn.",
    image: {
      url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 1400,
    location: "Pokhara",
    country: "Nepal",
    category: "mountains",
    geometry: { type: "Point", coordinates: [83.9856, 28.2096] },
  },
  {
    title: "Half-Timbered Town House by the Gate",
    description:
      "Stay inside a medieval walled town, in a centuries-old half-timbered house beside the old town gate.",
    image: {
      url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 1900,
    location: "Rothenburg ob der Tauber",
    country: "Germany",
    category: "castles",
    geometry: { type: "Point", coordinates: [10.1786, 49.3757] },
  },
  {
    title: "Fairytale Castle Guest Cottage",
    description:
      "A guest cottage on the grounds of a mist-wrapped hilltop castle, complete with its own moat reflection views.",
    image: {
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 3800,
    location: "Wierschem",
    country: "Germany",
    category: "castles",
    geometry: { type: "Point", coordinates: [7.3352, 50.1512] },
  },
  {
    title: "Nighttime Infinity Pool Resort Suite",
    description:
      "A resort suite overlooking a glowing infinity pool that blends into the night sky.",
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 4600,
    location: "Seminyak",
    country: "Indonesia",
    category: "amazing-pools",
    geometry: { type: "Point", coordinates: [115.1656, -8.6905] },
  },
  {
    title: "Overwater Bungalow with Ocean Views",
    description:
      "Step straight from your private deck into the turquoise lagoon below this overwater bungalow.",
    image: {
      url: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 8000,
    location: "Male",
    country: "Maldives",
    category: "amazing-pools",
    geometry: { type: "Point", coordinates: [73.5093, 4.1755] },
  },
  {
    title: "Forest View Canvas Tent",
    description:
      "Unzip the flap to a wall of towering pines every morning — glamping without leaving nature behind.",
    image: {
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 600,
    location: "Olympic National Park",
    country: "United States",
    category: "camping",
    geometry: { type: "Point", coordinates: [-123.5, 47.8] },
  },
  {
    title: "Starlit Pine Forest Campsite",
    description:
      "Pitch your tent under a canopy of pines and a sky full of stars, with a campfire ring included.",
    image: {
      url: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 550,
    location: "Yosemite",
    country: "United States",
    category: "camping",
    geometry: { type: "Point", coordinates: [-119.5383, 37.8651] },
  },
  {
    title: "Golden Wheatfield Cottage",
    description:
      "A stone cottage bordered by golden wheat fields, with countryside walks right from the front door.",
    image: {
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 1100,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "farm",
    geometry: { type: "Point", coordinates: [-1.8433, 51.833] },
  },
  {
    title: "Sunset Barn Retreat",
    description:
      "A converted barn with its original grain silo still standing, surrounded by working farmland.",
    image: {
      url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 800,
    location: "Iowa",
    country: "United States",
    category: "farm",
    geometry: { type: "Point", coordinates: [-93.0977, 41.878] },
  },
  {
    title: "Snowbound Lapland Cabin",
    description:
      "A timber cabin buried in snow at the edge of the forest, with a real chance of catching the northern lights.",
    image: {
      url: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 3600,
    location: "Rovaniemi",
    country: "Finland",
    category: "arctic",
    geometry: { type: "Point", coordinates: [25.7482, 66.5039] },
  },
  {
    title: "Frosted Pines Wilderness Lodge",
    description:
      "A remote lodge among snow-dusted pines, lit gold by the low arctic sun.",
    image: {
      url: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 4200,
    location: "Tromso",
    country: "Norway",
    category: "arctic",
    geometry: { type: "Point", coordinates: [18.9553, 69.6492] },
  },
];

module.exports = { data: sampleListings };
