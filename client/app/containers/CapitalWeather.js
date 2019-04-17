import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import convert from 'convert-units';

import Spinner from '../components/Spinner';
import api from '../services/api';

export default function CapitalWeather(props) {
  const { selectedCountry, setSelectedCountry } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(
    () => {
      const fetchCapitalWeather = async () => {
        try {
          const weatherRes = await api.get(`/capitalWeather?country=${selectedCountry}`);
    
          if (weatherRes.data && weatherRes.data.current) {
            setWeatherData(weatherRes.data.current);
            setIsLoaded(true);
          } else {
            setIsError(true);
          }
        } catch (err) {
          setIsError(true);
        }
      };

      if (selectedCountry === '') {
        setWeatherData({});
        setIsLoaded(false);
        setIsError(false);

        document.body.style.overflow = 'auto';
      } else {
        fetchCapitalWeather();

        document.body.style.overflow = 'hidden';
      }
    },
    [selectedCountry]
  );

  return (
    <Wrapper active={selectedCountry !== ''}>
      <Header>
        <Close onClick={() => setSelectedCountry('')}>{'<—'}</Close>
        <Capital>{selectedCountry}</Capital>
      </Header>
      {(isLoaded && !isError) && (
        <WeatherInfoWrapper>
          <WeatherInfo full>
            <span>Ibu Kota:</span>
            <h1>{weatherData.name}</h1>
          </WeatherInfo>
          {(weatherData.weather.length > 0 && weatherData.weather[0]) && (
            <WeatherInfo full>
              <span>Cuaca Sekarang:</span>
              <h1>{weatherData.weather[0].main}</h1>
            </WeatherInfo>
          )}
          <WeatherInfo full>
            <span>Temperatur rerata:</span>
            <h1>{convert(Number(weatherData.main.temp)).from('K').to('C').toFixed(2)} ºC</h1>
          </WeatherInfo>
          <WeatherInfo>
            <span>Temperatur minimal:</span>
            <h1>{convert(Number(weatherData.main.temp_min)).from('K').to('C').toFixed(2)} ºC</h1>
          </WeatherInfo>
          <WeatherInfo>
            <span>Temperatur maksimal:</span>
            <h1>{convert(Number(weatherData.main.temp_max)).from('K').to('C').toFixed(2)} ºC</h1>
          </WeatherInfo>
          <WeatherInfo>
            <span>Tekanan udara:</span>
            <h1>{weatherData.main.pressure} hPa</h1>
          </WeatherInfo>
          <WeatherInfo>
            <span>Kelembaban</span>
            <h1>{weatherData.main.humidity}%</h1>
          </WeatherInfo>
          <WeatherInfo>
            <span>Kecepatan angin:</span>
            <h1>{weatherData.wind.speed} m/s</h1>
          </WeatherInfo>
          <WeatherInfo>
            <span>Awan:</span>
            <h1>{weatherData.clouds.all}%</h1>
          </WeatherInfo>
          <WeatherInfo>
            <span>Jarak pandang:</span>
            <h1>{convert(Number(weatherData.visibility)).from('m').to('km')} km</h1>
          </WeatherInfo>
        </WeatherInfoWrapper>
      )}
      {(!isLoaded && !isError) && <Spinner />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #FAFAFA;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate3d(${props => props.active ? '0, 0, 0' : '0, 100%, 0' });
  transition: 0.25s ease all;
  margin: 0;
  padding: 2rem;
  overflow: auto;
`;

const Header = styled.div`
  margin: 6rem 0 2rem;
  padding: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content; center;
`;

const Close = styled.button`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5;
  color: #333;
  margin: 0 0.25rem 0 0;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Capital = styled.h1`
  flex: 1;
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 700;
  overflow: hidden;
  white-space: none;
  text-overflow: ellipsis;
`;

const WeatherInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
`;

const WeatherInfo = styled.div`
  width: ${props => props.full ? '100%' : 'calc(50% - 0.5rem)'};
  margin: 0 0 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  span {
    width: 100%;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.5;
    margin: 0;
    color: #999;
    overflow: hidden;
    white-space: none;
    text-overflow: ellipsis;
  }

  h1 {
    width: 100%;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.5;
    margin: 0;
    color: #333;
    overflow: hidden;
    white-space: none;
    text-overflow: ellipsis;
  }
`;
