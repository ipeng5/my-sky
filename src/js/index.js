import '../styles/main.scss';
import * as api from './api';
import * as dom from './dom';

const searchBar = document.querySelector('.search__input');

searchBar.addEventListener('change', async () => {
  const dataCity = await api.getCityInfo(searchBar.value);
  const dataWeather = await api.getSearchWeather(dataCity);
  dom.currentWeather(dataCity, dataWeather);
  searchBar.value = '';
});

const init = async function () {
  const dataWeather = await api.getLocationWeather();
  const dataCity = await api.getLocationCity(dataWeather.lat, dataWeather.lon);
  dom.currentWeather(dataCity, dataWeather);
};
init();
