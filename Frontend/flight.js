document.getElementById("searchFlights").addEventListener("click", function(e) {
  e.preventDefault();
  
  let isValid = true;

  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => input.classList.remove("input-error"));

  const from = document.getElementById("from");
  const to = document.getElementById("to");
  const departure = document.getElementById("departure");
  const returnDate = document.getElementById("return");
  const passengers = document.getElementById("passengers");
  const travelClass = document.getElementById("class");

  function markError(field) {
    field.classList.add("input-error");
    if (isValid) {
      field.focus();
    }
    isValid = false;
  }

  if (!from.value.trim()) markError(from);
  if (!to.value.trim()) markError(to);
  if (!departure.value) markError(departure);
  if (!returnDate.value) markError(returnDate);
  if (!passengers.value || passengers.value <= 0) markError(passengers);
  if (!travelClass.value) markError(travelClass);

  if (isValid) {
    document.getElementById("step1").classList.remove("show");
    document.getElementById("step2").classList.add("show");

    const flightResults = document.querySelector(".flight-results");
    flightResults.innerHTML = `<h3>Available Flights:</h3>`;

    const flights = generateFlights(from.value, to.value, travelClass.value);

    flights.forEach((flight, index) => {
      const flightCard = document.createElement("div");
      flightCard.classList.add("flight-card");
      flightCard.innerHTML = `
        <div class="info">Flight Number: <span class="highlight">${flight.flightNumber}</span></div>
        <div class="info">From: <span class="highlight">${flight.from}</span></div>
        <div class="info">To: <span class="highlight">${flight.to}</span></div>
        <div class="info">Price: <span class="highlight">${flight.price}</span> USD</div>
        <div class="info">Class: <span class="highlight">${flight.flightClass}</span></div>
        <button class="btn1" onclick="bookFlight('${flight.flightNumber}', '${flight.from}', '${flight.to}', '${flight.price}')">Book Now</button>
      `;
      flightResults.appendChild(flightCard);
    });
  }
});

function generateFlights(from, to, travelClass) {
  const flights = [];

  for (let i = 0; i < 4; i++) { 
    const flightNumber = "MS" + Math.floor(100 + Math.random() * 900);
    const price = (Math.floor(Math.random() * 300) + 100).toFixed(2); 

    flights.push({
      flightNumber: flightNumber,
      from: from,
      to: to,
      price: price,
      flightClass: travelClass
    });
  }

  return flights;
}

function bookFlight(flightNumber, from, to, price) {
  document.getElementById("step2").classList.remove("show");
  document.getElementById("step3").classList.add("show");

  document.getElementById("bookingFlightNumber").textContent = flightNumber;
  document.getElementById("bookingFrom").textContent = from;
  document.getElementById("bookingTo").textContent = to;
  document.getElementById("bookingPrice").textContent = price;
}

document.getElementById("confirmBooking").addEventListener("click", function () {
  document.getElementById("step3").style.display = "none";
  document.getElementById("step4").style.display = "block";

  const confirmationNumber = Math.floor(100000 + Math.random() * 900000);
  document.getElementById("confirmationNumber").textContent = confirmationNumber;
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function (event) {
      navLinks.classList.toggle("show");
      event.stopPropagation();
  });

  document.addEventListener("click", function (event) {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
          navLinks.classList.remove("show");
      }
  });
});
