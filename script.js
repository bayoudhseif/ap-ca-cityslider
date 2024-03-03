import {apiKey} from "/key.js";

import "./style.css";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

// init Swiper:
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const slides = document.querySelectorAll('.swiper-slide');

slides.forEach(slide => {
  const city = slide.getAttribute('data-city');
  const temperatureElement = slide.querySelector('.temperature');
  temperatureElement.textContent = 'Loading...';

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const roundedTemp = Math.round(data.main.temp);
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      temperatureElement.innerHTML = `${roundedTemp}°C <img src="${iconUrl}" alt="Weather icon">`;
    })
    .catch(() => {
      temperatureElement.textContent = 'Failed to load temperature';
    });
});