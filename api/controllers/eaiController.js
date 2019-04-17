import axios from 'axios';

const rapidAPIKey = '0e44b53391mshc1447918d7fb6a1p10d453jsn715d3b3d4502';

const countriesAPI = axios.create({
  baseURL: 'https://restcountries-v1.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Host': 'restcountries-v1.p.rapidapi.com',
    'X-RapidAPI-Key': rapidAPIKey,
  },
});

const weatherAPI = axios.create({
  baseURL: 'https://community-open-weather-map.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
    'X-RapidAPI-Key': rapidAPIKey,
  },
});

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
