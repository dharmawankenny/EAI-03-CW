import axios from 'axios';

// Secret key, should be in the env variable but i couldn't be bothered
const rapidAPIKey = '0e44b53391mshc1447918d7fb6a1p10d453jsn715d3b3d4502';

// axios base instance to be used in accessing countries API, attached default headers needed
const countriesAPI = axios.create({
  baseURL: 'https://restcountries-v1.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Host': 'restcountries-v1.p.rapidapi.com',
    'X-RapidAPI-Key': rapidAPIKey,
  },
});

// axios base instance to be used in accessing weather API, attached default headers needed
const weatherAPI = axios.create({
  baseURL: 'https://community-open-weather-map.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
    'X-RapidAPI-Key': rapidAPIKey,
  },
});

// This API provides access to all country list
// simplified by only providing country name and subregion
// as needed by the frontend, this function is a 
// simple proxy to the countries API by redirecting
// API call from the client to the RapidAPI server
// and providing necessary headers and secret keys
export async function getAllCountries(req, res) {
  try {
    const countriesData = await countriesAPI.get('/all');

    if (!countriesData || countriesData.status !== 200 || !countriesData.data.length) res.send({ status: '404', message: 'Countries Not Found' });

    const countriesNames = countriesData.data.map(country => ({ name: country.name, subregion: country.subregion }));

    res.send(countriesNames);
  } catch (err) {
    res.send(err);
  }
}

// This API provides the ability to get any weather of a capital
// of a given country. It simply takes a country as a URL Query parameter
// and returns the respective country's capital weather data.
// if the country is invalid, it will return a 404
export async function getCapitalWeather(req, res) {
  try {
    const country = req.query.country;
    const countryData = await countriesAPI.get(`/name/${country}`);

    if (!countryData || countryData.status !== 200 || !countryData.data.length) res.send({ status: '404', message: 'Country Not Found' });

    const mostRelevantCountryResult = countryData.data[0];

    const currentWeatherData = await weatherAPI.get(`/weather?q=${mostRelevantCountryResult.capital},${mostRelevantCountryResult.alpha3Code}`);

    res.send({
      current: currentWeatherData.data,
    });
  } catch (err) {
    res.send(err);
  }
}

// This API provides the ability to get any weather forecaset of a capital
// of a given country. It simply takes a country as a URL Query parameter
// and returns the respective country's capital forecast weather data.
// if the country is invalid, it will return a 404
export async function getForecastWeather(req, res) {
  try {
    const country = req.query.country;
    const countryData = await countriesAPI.get(`/name/${country}`);

    if (!countryData || countryData.status !== 200 || !countryData.data.length) res.send({ status: '404', message: 'Country Not Found' });

    const mostRelevantCountryResult = countryData.data[0];

    const currentWeatherData = await weatherAPI.get(`/forecast?q=${mostRelevantCountryResult.capital},${mostRelevantCountryResult.alpha2Code}`);

    res.send({
      current: currentWeatherData.data,
    });
  } catch (err) {
    res.send(err);
  }
}
