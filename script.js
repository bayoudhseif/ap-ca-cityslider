import { apiKey } from '/key.js';
import './style.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function initSwiper() {
  return new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
}

function fetchAndDisplayWeather(slide) {
  const city = slide.getAttribute('data-city');
  const temperatureElement = slide.querySelector('.temperature');
  temperatureElement.textContent = 'Loading...';

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
  )
    .then((response) => response.json())
    .then((data) => {
      const roundedTemp = Math.round(data.main.temp);
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      temperatureElement.innerHTML = `${roundedTemp}°C <img src="${iconUrl}" alt="Weather icon">`;
    })
    .catch(() => {
      temperatureElement.textContent = 'Failed to load temperature';
    });
}

function init() {
  initSwiper();
  const slides = document.querySelectorAll('.swiper-slide');

  slides.forEach((slide) => {
    fetchAndDisplayWeather(slide);
  });
}

init();
