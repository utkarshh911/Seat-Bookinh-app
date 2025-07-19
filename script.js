const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

const selectMovie = document.querySelector(".selectMovie");
const movieNameEl = document.getElementById("movieName");
const moviePriceEl = document.getElementById("moviePrice");
const totalPriceEl = document.getElementById("totalPrice");
const seatCont = document.querySelectorAll("#seatCont .seat");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const proceedBtn = document.getElementById("proceedBtn");
const cancelBtn = document.getElementById("cancelBtn");

let selectedSeats = [];
let currentMoviePrice = 7; // default
let currentMovieName = "Flash";

// 1. Populate dropdown menu
moviesList.forEach((movie) => {
  const option = document.createElement("option");
  option.value = movie.price;
  option.textContent = movie.movieName;
  if (movie.movieName === "Flash") {
    option.selected = true;
  }
  option.addEventListener("click", () => {
    currentMovieName = movie.movieName;
    currentMoviePrice = movie.price;
    movieNameEl.textContent = currentMovieName;
    moviePriceEl.textContent = currentMoviePrice;
    updateTotalPrice();
  });
  selectMovie.appendChild(option);
});

// 2. Set default movie name and price
movieNameEl.textContent = currentMovieName;
moviePriceEl.textContent = currentMoviePrice;

// 3. Seat click logic
seatCont.forEach((seat) => {
  if (!seat.classList.contains("occupied")) {
    seat.addEventListener("click", () => {
      seat.classList.toggle("selected");

      if (seat.classList.contains("selected")) {
        selectedSeats.push(seat);
      } else {
        selectedSeats = selectedSeats.filter((s) => s !== seat);
      }

      updateTotalPrice();
      updateSelectedSeatHolder();
    });
  }
});

function updateTotalPrice() {
  totalPriceEl.textContent = selectedSeats.length * currentMoviePrice;
}

selectedSeatsHolder.textContent = `${selectedSeats.length} seat(s) selected`;


function updateSelectedSeatHolder() {
  selectedSeatsHolder.innerHTML = "";

  if (selectedSeats.length === 0) {
    selectedSeatsHolder.innerHTML = `<span>No seat Selected</span>`;
  } else {
    selectedSeats.forEach((seat, index) => {
      const span = document.createElement("span");
      span.textContent = seat.innerText || `Seat ${index + 1}`;
      span.classList.add("selected-seat");
      selectedSeatsHolder.appendChild(span);
    });
  }
}



// 4. Continue button logic
proceedBtn.addEventListener("click", () => {
  if (selectedSeats.length === 0) {
    alert("Oops no seat Selected");
  } else {
    alert("Yayy! Your Seats have been booked");

    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("occupied");
    });

    selectedSeats = [];
    updateTotalPrice();
    updateSelectedSeatHolder();
  }
});

// 5. Cancel button logic
cancelBtn.addEventListener("click", () => {
  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
  });
  selectedSeats = [];
  updateTotalPrice();
  updateSelectedSeatHolder();
});
