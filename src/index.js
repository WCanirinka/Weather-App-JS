/* eslint-disable import/no-unresolved */
/* eslint-disable radix */
import '@babel/polyfill';

import init from './dom';

const errorMessage = document.getElementById('errorMessage');
const appId = '70485a8e13b31fcaee6010aadf0328be';
let searchMethod;

const getSearchMethod = (searchTerm) => {
  if (searchTerm.length === 5 && `${Number.parseInt(searchTerm)}` === searchTerm) {
    searchMethod = 'zip';
  } else searchMethod = 'q';
};

const searchWeather = async (searchTerm, units) => {
  try {
    if (errorMessage.hasAttribute('style')) {
      errorMessage.removeAttribute('style');
    }
    getSearchMethod(searchTerm);
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`,
      {
        mode: 'cors',
      });

    if (result.status === 200) {
      return result.json();
    }
    return 'City not found';
  } catch (error) {
    return error.message;
  }
};

document.getElementById('celsiusBtn').addEventListener('click', async () => {
  try {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
      const response = await searchWeather(searchTerm, 'metric');
      init(response);
    }
  } catch (error) {
    errorMessage.innerText = error.message;
    if (!errorMessage.hasAttribute('style')) {
      errorMessage.setAttribute('style', 'display: block !important');
    }
  }
});

document.getElementById('fahrenheitBtn').addEventListener('click', async () => {
  try {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
      const response = await searchWeather(searchTerm, 'imperial');
      init(response);
    }
  } catch (error) {
    errorMessage.innerText = error.message;
    if (!errorMessage.hasAttribute('style')) {
      errorMessage.setAttribute('style', 'display: block !important');
    }
  }
});