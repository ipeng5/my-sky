// Promisifying geolocation
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Consuming geolocation promise
const getLocation = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lon } = pos.coords;
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude==hourly,minutesly,alerts&appid=5d2c21bb5b0794860fac445eda4259ea`,
      { mode: 'cors' }
    );
    const dataWeather = await res.json();
    console.log(dataWeather);
  } catch {
    err => console.log(err);
  }
};
