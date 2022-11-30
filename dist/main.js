/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/api.js":
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCityInfo\": () => (/* binding */ getCityInfo),\n/* harmony export */   \"getLocationCity\": () => (/* binding */ getLocationCity),\n/* harmony export */   \"getLocationWeather\": () => (/* binding */ getLocationWeather),\n/* harmony export */   \"getSearchWeather\": () => (/* binding */ getSearchWeather)\n/* harmony export */ });\nconst renderError = function (msg) {\n  const errorContainer = document.querySelector('.info__left--location');\n  errorContainer.textContent = `Something went wrong! ${msg}`;\n};\n\n// Promisifying geolocation\nconst getPosition = function () {\n  return new Promise(function (resolve, reject) {\n    navigator.geolocation.getCurrentPosition(resolve, reject);\n  });\n};\n\n// Consuming weather info based on location automatically\nconst getLocationWeather = async function (spinnerContainer) {\n  try {\n    const pos = await getPosition();\n    const { latitude: lat, longitude: lon } = pos.coords;\n    const res = await fetch(\n      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude==hourly,minutesly,alerts&appid=5d2c21bb5b0794860fac445eda4259ea`,\n      { mode: 'cors' }\n    );\n    if (!res.ok) throw new Error('Problem getting weather data');\n    const dataWeather = await res.json();\n    return dataWeather;\n  } catch (err) {\n    spinnerContainer.innerHTML = '';\n    console.error(err);\n    renderError(err.message);\n  }\n};\n\nconst getLocationCity = async function (lat, lon, spinnerContainer) {\n  try {\n    const res = await fetch(\n      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=5d2c21bb5b0794860fac445eda4259ea`,\n      { mode: 'cors' }\n    );\n    if (!res.ok) throw new Error('Problem getting weather data');\n    const dataCity = await res.json();\n    return dataCity;\n  } catch (err) {\n    spinnerContainer.innerHTML = '';\n    console.error(err);\n    renderError(err.message);\n  }\n};\n\n// Get city name, lat, lon based on search input\nconst getCityInfo = async function (city, spinnerContainer) {\n  try {\n    const res = await fetch(\n      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&units=metric&limit=1&appid=5d2c21bb5b0794860fac445eda4259ea`,\n      { mode: 'cors' }\n    );\n    if (!res.ok) throw new Error(`${city} not found`);\n    const dataCity = await res.json();\n    return dataCity;\n  } catch (err) {\n    spinnerContainer.innerHTML = '';\n    console.error(err);\n    renderError(err.message);\n  }\n};\n\n// Get weather info based on search\nconst getSearchWeather = async function (data, spinnerContainer) {\n  try {\n    const { lat, lon } = data[0];\n    const res = await fetch(\n      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude==hourly,minutesly,alerts&appid=5d2c21bb5b0794860fac445eda4259ea`,\n      { mode: 'cors' }\n    );\n    const dataWeather = await res.json();\n    return dataWeather;\n  } catch (err) {\n    spinnerContainer.innerHTML = '';\n    console.error(err);\n    renderError('Problem getting weather data');\n  }\n};\n\n\n//# sourceURL=webpack://weather-app/./src/js/api.js?");

/***/ }),

/***/ "./src/js/dom.js":
/*!***********************!*\
  !*** ./src/js/dom.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currentWeather\": () => (/* binding */ currentWeather)\n/* harmony export */ });\nconst currentWeather = function (dataCity, dataWeather, spinnerContainer) {\n  const cityName = document.querySelector('.info__left--location');\n  const temperature = document.querySelector('.info__left--temperature');\n  const description = document.querySelector('.info__left--weather');\n  const descriptionData = dataWeather.current.weather[0].description;\n  const date = document.querySelector('.info__left--date');\n  const time = document.querySelector('.info__left--time');\n  const feelsLike = document.querySelector('#feels-like');\n  const humidity = document.querySelector('#humidity');\n  const chanceOfRain = document.querySelector('#rain');\n  const windSpeed = document.querySelector('#wind');\n  const todayIconContainer = document.querySelector('.container__icon-top');\n  const dailyIconContainers = document.querySelectorAll('.container__icon');\n  const dayNames = document.querySelectorAll('.weekday__day');\n  const dayDescriptions = document.querySelectorAll('.weekday__weather');\n  const maxTemps = document.querySelectorAll('.weekday__temp-top');\n  const minTemps = document.querySelectorAll('.weekday__temp-bottom');\n  const now = new Date();\n  const dayIndex = new Date().getDay();\n  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];\n  const options = {\n    day: 'numeric',\n    month: 'short',\n    year: 'numeric',\n    weekday: 'short',\n  };\n\n  const getDayName = function (index, day) {\n    if (index + day >= 7) return days[index - 7 + day];\n    return days[index + day];\n  };\n\n  const getTime = function () {\n    time.textContent = new Date().toLocaleTimeString('en-GB');\n    setTimeout(getTime, 1000);\n  };\n  getTime();\n\n  const getDescription = function (i) {\n    const string = dataWeather.daily[i].weather[0].description;\n    return string[0].toUpperCase() + string.slice(1);\n  };\n\n  const getMarkup = function (i) {\n    const iconNum = dataWeather.daily[i].weather[0].icon;\n    const url = `https://openweathermap.org/img/wn/${iconNum}@2x.png`;\n    const markup = `<img src=\"${url}\" class=\"weekday__icon\">`;\n\n    return markup;\n  };\n\n  const getMaxTemp = function (i) {\n    return `${dataWeather.daily[i].temp.max}°C`;\n  };\n\n  const getMinTemp = function (i) {\n    return `${dataWeather.daily[i].temp.min}°C`;\n  };\n\n  // Update weather info for today\n  cityName.textContent = dataCity[0].name;\n  temperature.textContent = `${dataWeather.current.temp}°C`;\n  description.textContent = descriptionData[0].toUpperCase() + descriptionData.slice(1);\n  date.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);\n  feelsLike.textContent = `${dataWeather.current.feels_like}°C`;\n  humidity.textContent = `${dataWeather.current.humidity}%`;\n  chanceOfRain.textContent = `${Math.round(dataWeather.daily[0].pop * 100)}%`;\n  windSpeed.textContent = `${(dataWeather.current.wind_speed * 3.6).toFixed(1)} km/h`;\n\n  // Update day name for next 7 days\n  dayNames[0].textContent = 'Tomorrow';\n  for (let i = 1; i < 7; i++) {\n    dayNames[i].textContent = getDayName(dayIndex, i + 1);\n  }\n\n  // Update today's weather icon\n  todayIconContainer.innerHTML = '';\n  todayIconContainer.insertAdjacentHTML('afterbegin', getMarkup(0));\n\n  for (let i = 0; i < 7; i++) {\n    // Update weather icon for next 7 days\n    dailyIconContainers[i].innerHTML = '';\n    dailyIconContainers[i].insertAdjacentHTML('afterbegin', getMarkup(i + 1));\n\n    // Update weather description for next 7 days\n    dayDescriptions[i].textContent = getDescription(i + 1);\n\n    // Update max and min temperature for next 7 days\n    maxTemps[i].textContent = getMaxTemp(i + 1);\n    minTemps[i].textContent = getMinTemp(i + 1);\n  }\n\n  spinnerContainer.innerHTML = '';\n};\n\n\n//# sourceURL=webpack://weather-app/./src/js/dom.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/js/api.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/js/dom.js\");\n\n\n\nconst searchBar = document.querySelector('.search__input');\nconst spinnerContainer = document.querySelector('.spinner-container');\nsearchBar.addEventListener('change', async function () {\n  renderSpinner();\n  const dataCity = await _api__WEBPACK_IMPORTED_MODULE_0__.getCityInfo(searchBar.value, spinnerContainer);\n  const dataWeather = await _api__WEBPACK_IMPORTED_MODULE_0__.getSearchWeather(dataCity, spinnerContainer);\n  _dom__WEBPACK_IMPORTED_MODULE_1__.currentWeather(dataCity, dataWeather, spinnerContainer);\n  searchBar.value = '';\n});\n\nconst renderSpinner = function () {\n  const markup = `<i class=\"fa fa-spinner fa-spin\" style=\"font-size:40px\"></i>`;\n  spinnerContainer.innerHTML = '';\n  spinnerContainer.insertAdjacentHTML('afterbegin', markup);\n};\n\nconst init = async function () {\n  renderSpinner();\n  const dataWeather = await _api__WEBPACK_IMPORTED_MODULE_0__.getLocationWeather(spinnerContainer);\n  const dataCity = await _api__WEBPACK_IMPORTED_MODULE_0__.getLocationCity(dataWeather.lat, dataWeather.lon, spinnerContainer);\n  _dom__WEBPACK_IMPORTED_MODULE_1__.currentWeather(dataCity, dataWeather, spinnerContainer);\n};\ninit();\n\n\n//# sourceURL=webpack://weather-app/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;