const setPositionForWeatherInfo = () => {
  const weatherContainer = document.getElementById('weatherContainer');
  const weatherContainerHeight = weatherContainer.clientHeight;
  const weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
  weatherContainer.style.visibility = 'visible';
};

export default setPositionForWeatherInfo;