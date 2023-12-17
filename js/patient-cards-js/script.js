// Initialize Swiper
const swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  fade: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});




// Get the search input element and search button
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Get all the card elements and the "No results" message element
const cards = document.querySelectorAll('.card.swiper-slide');
const noResultsMessage = document.getElementById('no-results-message');

// Add event listener to the search input for live search
searchInput.addEventListener('input', searchByName);

// Function to search by name
function searchByName() {
  const searchTerm = searchInput.value.toLowerCase();
  let foundMatch = false;

  cards.forEach(function (card) {
    const nameElement = card.querySelector('.name');
    const name = nameElement.textContent.toLowerCase();

    if (name.includes(searchTerm)) {
      card.style.display = 'block';
      foundMatch = true;
    } else {
      card.style.display = 'none';
    }
  });

  // Display no results message if no matches found
  if (!foundMatch) {
    noResultsMessage.style.display = 'block';
    cards.forEach(function (card) {
      card.style.display = 'none';
    });
  } else {
    noResultsMessage.style.display = 'none';
  }
}

// Get the order by alphabetical button and card container
const orderByAlphabeticalButton = document.getElementById('filter-alphabetical');
const cardContainer = document.querySelector('.card-wrapper');

orderByAlphabeticalButton.addEventListener('click', function () {
  const cardsArray = Array.from(cardContainer.querySelectorAll('.card'));

  cardsArray.sort(function (cardA, cardB) {
    const nameA = cardA.querySelector('.name').textContent.toLowerCase();
    const nameB = cardB.querySelector('.name').textContent.toLowerCase();

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });

  cardContainer.innerHTML = '';

  cardsArray.forEach(function (card) {
    cardContainer.appendChild(card);
  });
});

// Get the filter by date button
const filterDateButton = document.getElementById('filter-date');

filterDateButton.addEventListener('click', function () {
  const cardsArray = Array.from(cardContainer.querySelectorAll('.card'));

  cardsArray.sort(function (cardA, cardB) {
    const dateA = new Date(cardA.querySelector('.extra-data:last-of-type').textContent);
    const dateB = new Date(cardB.querySelector('.extra-data:last-of-type').textContent);
    return dateB - dateA; // Compare in descending order (recent to old)
  });

  cardContainer.innerHTML = '';

  cardsArray.forEach(function (card) {
    cardContainer.appendChild(card);
  });
});

// Store the original order of the cards
const originalOrder = Array.from(document.querySelectorAll('.card.swiper-slide'));

// Function to restore the original order of the cards
function restoreCardOrder() {
  cardContainer.innerHTML = '';

  originalOrder.forEach(function (card) {
    cardContainer.appendChild(card);
  });
}

// Add event listener to the restore order button
const restoreOrderButton = document.getElementById('restore-order');
restoreOrderButton.addEventListener('click', restoreCardOrder);
document.addEventListener("DOMContentLoaded", function () {
  // Use fetch or another method to get data from your API
  fetch('http://localhost:4000/doctor_followups/D001')
    .then(response => response.json())
    .then(data => {
      // Iterate through the data and dynamically create cards
      data.forEach(patient => {
        const cardWrapper = document.querySelector('.card-wrapper');

        const card = document.createElement('div');
        card.classList.add('card', 'swiper-slide');

        card.innerHTML =
          '<div class="image-content">' +
          '<span class="overlay"></span>' +
          '<div class="card-image">' +
          '<img src="' + patient.picture + '" alt="" class="card-img">' +
          '</div>' +
          '</div>' +
          '<div class="card-content">' +
          '<h2 class="name">' + patient.first_name + ' ' + patient.last_name + '</h2>' +
          '<p class="extra-data">Age: ' + calculateAge(patient.birthdate) + '</p>' +
          '<p class="extra-data">Gender: ' + patient.gender + '</p>' +
          '<p class="extra-data">Last consultation: <span class="date">' + formatDate(patient.last_consultation) + '</span></p>' +
          '<div class="buttons-container">' +
          '<div class="patient-buttons">' +
          '<a href="patient-profiles/' + generateProfileUrl(patient) + '"><button class="button">Full profile</button></a>' +
          '<a href="consultation-page.html"><button class="button">New consultation</button></a>' +
          '</div>' +
          '</div>' +
          '</div>';

        cardWrapper.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});

    
    // Helper function to calculate age
    function calculateAge(birthdate) {
        // Implement the logic to calculate age from birthdate
        // For simplicity, let's assume birthdate is in the format 'YYYY-MM-DD'
        const birthYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        // Implement the logic to format the date as needed
        // For simplicity, let's assume dateString is in the format 'YYYY-MM-DD'
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    
    // Helper function to generate profile URL
    function generateProfileUrl(patient) {
        // Implement the logic to generate the profile URL as needed
        return `${patient.first_name}-${patient.last_name}.html`;
    }