import '../styles/main.scss';
import * as api from './api';
import * as dom from './dom';

const searchBar = document.querySelector('.search__input');
const spinnerContainer = document.querySelector('.spinner-container');

searchBar.addEventListener('change', async () => {
  const dataCity = await api.getCityInfo(searchBar.value);
  const dataWeather = await api.getSearchWeather(dataCity);
  dom.currentWeather(dataCity, dataWeather, spinnerContainer);
  searchBar.value = '';
});

const renderSpinner = function () {
  const markup = `<i class="fa fa-spinner fa-spin" style="font-size:40px"></i>`;
  spinnerContainer.innerHTML = '';
  spinnerContainer.insertAdjacentHTML('afterbegin', markup);
};

const init = async function () {
  renderSpinner();
  const dataWeather = await api.getLocationWeather();
  const dataCity = await api.getLocationCity(dataWeather.lat, dataWeather.lon);
  dom.currentWeather(dataCity, dataWeather, spinnerContainer);
};
init();
