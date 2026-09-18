/**
 * booking.js – live price summary + client-side date-range warning for the
 * show page's booking form. Reads `bookedRanges` and `listingPrice`
 * injected by show.ejs.
 *
 * This is a UX nicety only, not the source of truth: the server
 * (controllers/bookings.js createBooking) re-checks for overlaps against
 * the database before ever confirming a booking, since bookedRanges here is
 * only as fresh as the last page load.
 */
(function () {
  const form = document.getElementById("booking-form");
  if (!form) return; // not shown to owners or logged-out visitors

  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");
  const summary = document.getElementById("booking-summary");
  const MS_PER_NIGHT = 24 * 60 * 60 * 1000;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];
  checkInInput.min = todayStr;
  checkOutInput.min = todayStr;

  function nightsBetween(checkIn, checkOut) {
    return Math.round((new Date(checkOut) - new Date(checkIn)) / MS_PER_NIGHT);
  }

  function overlapsExisting(checkIn, checkOut) {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    return bookedRanges.some(
      (r) => inDate < new Date(r.checkOut) && outDate > new Date(r.checkIn)
    );
  }

  function updateSummary() {
    checkOutInput.min = checkInInput.value || todayStr;

    if (!checkInInput.value || !checkOutInput.value) {
      summary.textContent = "";
      return;
    }

    const nights = nightsBetween(checkInInput.value, checkOutInput.value);
    if (nights <= 0) {
      summary.textContent = "Check-out must be after check-in.";
      return;
    }

    if (overlapsExisting(checkInInput.value, checkOutInput.value)) {
      summary.textContent = "Those dates overlap an existing booking — try different dates.";
      return;
    }

    const total = nights * listingPrice;
    const nightsLabel = nights === 1 ? "night" : "nights";
    summary.textContent =
      `${nights} ${nightsLabel} × ₹${listingPrice.toLocaleString("en-IN")} ` +
      `= ₹${total.toLocaleString("en-IN")}`;
  }

  checkInInput.addEventListener("change", updateSummary);
  checkOutInput.addEventListener("change", updateSummary);
})();
