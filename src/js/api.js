const renderError = function (msg) {
  const spinnerContainer = document.querySelector('.spinner-container');
  spinnerContainer.innerHTML = `<div heading-3>Something went wrong, ${msg}</div>`;
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
    if (!res.ok) throw new Error('Problem getting weather data');
    const dataWeather = await res.json();
    return dataWeather;
  } catch {
    err => {
      console.error(err);
      renderError(`Something went wrong, ${err.message}`);
    };
  }
};

export const getLocationCity = async function (lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=5d2c21bb5b0794860fac445eda4259ea`,
      { mode: 'cors' }
    );
    if (!res.ok) throw new Error('Problem getting location data');
    const dataCity = await res.json();
    return dataCity;
  } catch {
    err => {
      console.error(err);
      renderError(`Something went wrong, ${err.message}`);
    };
  }
};

// Get city name, lat, lon based on search input
export const getCityInfo = async function (city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&units=metric&limit=1&appid=5d2c21bb5b0794860fac445eda4259ea`,
      { mode: 'cors' }
    );
    if (!res.ok) throw new Error('Problem getting city data');
    const dataCity = await res.json();
    return dataCity;
  } catch {
    err => console.error(err);
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
    if (!res.ok) throw new Error('Problem getting weather data');
    const dataWeather = await res.json();
    return dataWeather;
  } catch {
    err => {
      console.error(err);
      renderError(`Something went wrong, ${err.message}`);
    };
  }
};
