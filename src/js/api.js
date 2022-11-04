const spinnerContainer = document.querySelector('.spinner-container');

const renderSpinner = function () {
  const markup = `<i class="fa fa-spinner fa-spin" style="font-size:40px"></i>`;
  spinnerContainer.innerHTML = '';
  spinnerContainer.insertAdjacentHTML('afterbegin', markup);
};

// Promisifying geolocation
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Consuming weather info based on location automatically
export const getLocationWeather = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lon } = pos.coords;
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude==hourly,minutesly,alerts&appid=5d2c21bb5b0794860fac445eda4259ea`,
      { mode: 'cors' }
    );
    const dataWeather = await res.json();
    return dataWeather;
  } catch {
    err => console.log(err);
  }
};

export const getLocationCity = async function (lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=5d2c21bb5b0794860fac445eda4259ea`,
      { mode: 'cors' }
    );
    const dataCity = await res.json();
    return dataCity;
  } catch {
    err => console.log(err);
  }
};

// Get city name, lat, lon based on search input
export const getCityInfo = async function (city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&units=metric&limit=1&appid=5d2c21bb5b0794860fac445eda4259ea`,
      { mode: 'cors' }
    );
    const dataCity = await res.json();
    return dataCity;
  } catch {
    err => console.log(err);
  }
};

// Get weather info based on search
export const getSearchWeather = async function (data) {
  try {
    const { lat, lon } = data[0];
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude==hourly,minutesly,alerts&appid=5d2c21bb5b0794860fac445eda4259ea`,
      { mode: 'cors' }
    );
    const dataWeather = await res.json();
    return dataWeather;
  } catch {
    err => console.log(err);
  }
};
