/* eslint-disable radix */
import init from './dom';

const appId = '70485a8e13b31fcaee6010aadf0328be';
const units = 'metric';
let searchMethod;

const getSearchMethod = searchTerm => {
  if (searchTerm.length === 5 && `${Number.parseInt(searchTerm)}` === searchTerm) {
    searchMethod = 'zip';
  } else searchMethod = 'q';
};

const searchWeather = searchTerm => {
  getSearchMethod(searchTerm);
  fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => result.json()).then(result => { init(result); });
};

document.getElementById('searchBtn').addEventListener('click', () => {
  const searchTerm = document.getElementById('searchInput').value;
  if (searchTerm) searchWeather(searchTerm);
});
