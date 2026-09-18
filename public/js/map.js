/**
 * map.js – Leaflet + Esri World Street Map tiles for WanderLust show page.
 * No API key required. Reads `listingData` injected by show.ejs.
 *
 * Tried and rejected first: tile.openstreetmap.org (blocks third-party apps
 * outright per https://operations.osmfoundation.org/policies/tiles/, serves a
 * 403 "Access blocked" tile), then CARTO's basemaps.cartocdn.com (now serves
 * a watermarked "API KEY REQUIRED" tile for unauthenticated requests). Esri's
 * World Street Map tile service serves real tiles with neither restriction.
 */
(function () {
  const coords = listingData.geometry && listingData.geometry.coordinates;

  // GeoJSON is [lng, lat]; Leaflet wants [lat, lng]
  const hasCoords = coords && Array.isArray(coords) && coords[0] !== 0;
  const latlng    = hasCoords ? [coords[1], coords[0]] : [20, 0];
  const zoom      = hasCoords ? 9 : 2;

  const map = L.map("map").setView(latlng, zoom);

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom",
      maxZoom: 19,
    }
  ).addTo(map);

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
