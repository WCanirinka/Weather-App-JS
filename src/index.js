const appId = '70485a8e13b31fcaee6010aadf0328be';
const units = 'metric';
let searchMethod;

const getSearchMethod = searchTerm => {
  if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
    searchMethod = 'zip';
  } else searchMethod = 'q';
};

const searchWeather = searchTerm => {
  getSearchMethod(searchTerm);
  fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => { return result.json(); }).then(result => { init(result); });};

const init = (resultFromServer) => {
  switch (resultFromServer.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("./../dist/images/clear.jpeg")';
      break;

    case 'Clouds':
      document.body.style.backgroundImage = 'url("./../dist/images/cloudy.jpeg")';
      break;

    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = 'url("./../dist/images/rain.jpeg")';
      break;

    case 'Thunderstorm':
      document.body.style.backgroundImage = 'url("./../dist/images/storm.jpeg")';
      break;

    case 'Snow':
      document.body.style.backgroundImage = 'url("./../dist/images/snow.jpeg")';
      break;

    default:
      break;
  }

  const weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  const temperatureElement = document.getElementById('temperature');
  const humidityElement = document.getElementById('humidity');
  const windSpeedElement = document.getElementById('windSpeed');
  const cityHeader = document.getElementById('cityHeader');
  const weatherIcon = document.getElementById('documentIconImg');

  weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

  const resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176' + ' C';
  temperatureElement.addEventListener('click', () => {
    if (
      temperature.innerHTML ===
      Math.floor(resultFromServer.main.temp) + '°' + ' C'
    ) {
      let fahrenheit = celsiusToFahrenheit(resultFromServer.main.temp);
      fahrenheit = Math.floor(fahrenheit);
      temperatureElement.innerHTML = `${fahrenheit}&#176 F`;
    } else {
      temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176' + ' C';
    }
  });
  windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

  setPositionForWeatherInfo();
};

const setPositionForWeatherInfo = () => {
  let weatherContainer = document.getElementById('weatherContainer');
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
  weatherContainer.style.visibility = 'visible';
};

const celsiusToFahrenheit = temperature => {
  return (temperature * 9) / 5 + 32;
};

document.getElementById('searchBtn').addEventListener('click', () => {
  let searchTerm = document.getElementById('searchInput').value;
  if (searchTerm) searchWeather(searchTerm);
});
