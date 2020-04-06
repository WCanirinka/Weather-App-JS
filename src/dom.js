/* eslint-disable no-useless-concat */
/* eslint-disable max-len */
import setPositionForWeatherInfo from './positionWeather';

const errorMessage = document.getElementById('errorMessage');
const init = (resultFromServer) => {
  if (typeof resultFromServer !== 'string') {
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

    weatherIcon.src = `http://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}.png`;

    const resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = `${Math.floor(resultFromServer.main.temp)}&#176`;
    windSpeedElement.innerHTML = `Winds at ${Math.floor(resultFromServer.wind.speed)} m/s`;
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = `Humidity levels at ${resultFromServer.main.humidity}%`;

    setPositionForWeatherInfo();
  } else {
    errorMessage.innerText = resultFromServer;
    if (!errorMessage.hasAttribute('style')) {
      errorMessage.setAttribute('style', 'display: block !important');
    }
  }
};

export default init;