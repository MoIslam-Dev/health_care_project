let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

    // Example using Fetch API
const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  console.log('Form submitted!');
  const formData = new FormData(form);
  const response = await fetch('http://localhost:4000/authenticate', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    // Handle successful login
    const data = await response.json();
    console.log('Login successful:', data);
    // Redirect to the user's profile or another page
  } else {
    // Handle login failure
    const error = await response.text();
    console.error('Login failed:', error);
    // Display an error message to the user
  }
});

