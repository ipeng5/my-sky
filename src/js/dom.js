export const currentWeather = function (dataCity, dataWeather) {
  const cityName = document.querySelector('.info__left--location');
  const temperature = document.querySelector('.info__left--temperature');
  const description = document.querySelector('.info__left--weather');
  const date = document.querySelector('.info__left--date');
  const time = document.querySelector('.info__left--time');
  const feelsLike = document.querySelector('#feels-like');
  const humidity = document.querySelector('#humidity');
  const chanceOfRain = document.querySelector('#rain');
  const windSpeed = document.querySelector('#wind');
  const dayName1 = document.querySelector('#day-1-name');
  const dayName2 = document.querySelector('#day-2-name');
  const dayName3 = document.querySelector('#day-3-name');
  const dayName4 = document.querySelector('#day-4-name');
  const dayName5 = document.querySelector('#day-5-name');
  const dayName6 = document.querySelector('#day-6-name');
  const dayName7 = document.querySelector('#day-7-name');
  //   const dayContainer1 = document.querySelector('#day-1');
  //   const dayContainer2 = document.querySelector('#day-2');
  //   const dayContainer3 = document.querySelector('#day-3');
  //   const dayContainer4 = document.querySelector('#day-4');
  //   const dayContainer5 = document.querySelector('#day-5');
  //   const dayContainer6 = document.querySelector('#day-6');
  //   const dayContainer7 = document.querySelector('#day-7');

  const now = new Date();
  const dayIndex = new Date().getDay();

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short',
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getDayName = function (index, day) {
    if (index + day >= 7) return days[index - 7 + day];
    return days[index + day];
  };

  const getTime = function () {
    let timer = new Date();
    time.textContent = timer.toLocaleTimeString('en-GB', { timeZone: `${dataWeather.timezone}` });
    setTimeout(getTime, 1000);
  };

  console.log(dataWeather); //TODO
  console.log(dataWeather.daily[0].weather[0].icon);

  const getUrl = function (iconNum) {
    // for(let i =0; i<7; i++){}
    return `http://openweathermap.org/img/wn/${iconNum}@2x.png`;
  };

  cityName.textContent = dataCity[0].name;
  temperature.textContent = `${dataWeather.current.temp}°C`;
  description.textContent = dataWeather.current.weather[0].description;
  date.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);
  getTime();
  feelsLike.textContent = dataWeather.current.feels_like;
  humidity.textContent = dataWeather.current.humidity;
  chanceOfRain.textContent = `${dataWeather.hourly[0].pop * 100}%`;
  windSpeed.textContent = dataWeather.current.wind_speed;

  dayName1.textContent = 'Tomorrow';

  dayName2.textContent = getDayName(dayIndex, 2);
  dayName3.textContent = getDayName(dayIndex, 3);
  dayName4.textContent = getDayName(dayIndex, 4);
  dayName5.textContent = getDayName(dayIndex, 5);
  dayName6.textContent = getDayName(dayIndex, 6);
  dayName7.textContent = getDayName(dayIndex, 7);

  // weekday.forEach(day => day.lastElementChild.insertAdjacentHTML('beforeend', getUrl()));

  const dayNames = document.querySelectorAll('.weekday__day');
  dayNames.forEach(d => console.log(d.closest('weekday__day')));
  console.log(dayNames);
};
