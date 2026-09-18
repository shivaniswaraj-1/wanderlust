/**
 * map.js – Leaflet + OpenStreetMap map for WanderLust show page.
 * No API key required. Reads `listingData` injected by show.ejs.
 */
(function () {
  const coords = listingData.geometry && listingData.geometry.coordinates;

  // GeoJSON is [lng, lat]; Leaflet wants [lat, lng]
  const hasCoords = coords && Array.isArray(coords) && coords[0] !== 0;
  const latlng    = hasCoords ? [coords[1], coords[0]] : [20, 0];
  const zoom      = hasCoords ? 9 : 2;

  const map = L.map("map").setView(latlng, zoom);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  if (hasCoords) {
    // Leaflet's bindPopup() renders string content as raw HTML, so building
    // it with a template literal would let a listing's `location` field
    // inject arbitrary markup/script (e.g. via <img onerror=...>). Build the
    // popup as DOM nodes instead and set the location via textContent so it
    // is always treated as plain text.
    const popupEl = document.createElement("div");
    const strongEl = document.createElement("b");
    strongEl.textContent = listingData.location;
    popupEl.appendChild(strongEl);
    popupEl.appendChild(document.createElement("br"));
    popupEl.appendChild(document.createTextNode("Exact location provided after booking."));

    L.marker(latlng)
      .addTo(map)
      .bindPopup(popupEl)
      .openPopup();
  }
})();
