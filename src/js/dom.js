export const currentWeather = function (dataCity, dataWeather, spinnerContainer) {
  const cityName = document.querySelector('.info__left--location');
  const temperature = document.querySelector('.info__left--temperature');
  const description = document.querySelector('.info__left--weather');
  const descriptionData = dataWeather.current.weather[0].description;
  const date = document.querySelector('.info__left--date');
  const time = document.querySelector('.info__left--time');
  const feelsLike = document.querySelector('#feels-like');
  const humidity = document.querySelector('#humidity');
  const chanceOfRain = document.querySelector('#rain');
  const windSpeed = document.querySelector('#wind');
  const todayIconContainer = document.querySelector('.container__icon-top');
  const dailyIconContainers = document.querySelectorAll('.container__icon');
  const dayNames = document.querySelectorAll('.weekday__day');
  const dayDescriptions = document.querySelectorAll('.weekday__weather');
  const maxTemps = document.querySelectorAll('.weekday__temp-top');
  const minTemps = document.querySelectorAll('.weekday__temp-bottom');
  const now = new Date();
  const dayIndex = new Date().getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short',
  };

  const getDayName = function (index, day) {
    if (index + day >= 7) return days[index - 7 + day];
    return days[index + day];
  };

  const getTime = function () {
    time.textContent = new Date().toLocaleTimeString('en-GB');
    setTimeout(getTime, 1000);
  };
  getTime();

  const getDescription = function (i) {
    const string = dataWeather.daily[i].weather[0].description;
    return string[0].toUpperCase() + string.slice(1);
  };

  const getMarkup = function (i) {
    const iconNum = dataWeather.daily[i].weather[0].icon;
    const url = `http://openweathermap.org/img/wn/${iconNum}@2x.png`;
    const markup = `<img src="${url}" class="weekday__icon">`;

    return markup;
  };

  const getMaxTemp = function (i) {
    return `${dataWeather.daily[i].temp.max}°C`;
  };

  const getMinTemp = function (i) {
    return `${dataWeather.daily[i].temp.min}°C`;
  };

  // Update weather info for today
  cityName.textContent = dataCity[0].name;
  temperature.textContent = `${dataWeather.current.temp}°C`;
  description.textContent = descriptionData[0].toUpperCase() + descriptionData.slice(1);
  date.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);
  feelsLike.textContent = dataWeather.current.feels_like;
  humidity.textContent = dataWeather.current.humidity;
  chanceOfRain.textContent = `${Math.floor(dataWeather.hourly[0].pop * 100)}%`;
  windSpeed.textContent = dataWeather.current.wind_speed;

  // Update day name for next 7 days
  dayNames[0].textContent = 'Tomorrow';
  for (let i = 1; i < 7; i++) {
    dayNames[i].textContent = getDayName(dayIndex, i + 1);
  }

  // Update today's weather icon
  todayIconContainer.innerHTML = '';
  todayIconContainer.insertAdjacentHTML('afterbegin', getMarkup(0));

  for (let i = 0; i < 7; i++) {
    // Update weather icon for next 7 days
    dailyIconContainers[i].innerHTML = '';
    dailyIconContainers[i].insertAdjacentHTML('afterbegin', getMarkup(i + 1));

    // Update weather description for next 7 days
    dayDescriptions[i].textContent = getDescription(i + 1);

    // Update max and min temperature for next 7 days
    maxTemps[i].textContent = getMaxTemp(i + 1);
    minTemps[i].textContent = getMinTemp(i + 1);
  }

  spinnerContainer.innerHTML = '';
};
