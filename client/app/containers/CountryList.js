import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import api from '../services/api';
import { EDEADLK } from 'constants';

export default function CountryList(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(
    () => {
      const initialFetch = async () => {
        const countriesRes = await api.get('/getAllCountries');
  
        if (countriesRes.data && countriesRes.data.length > 0) {
          setCountries(countriesRes.data);
          setIsLoaded(true);
        } else {
          setIsError(true);
        }
      };

      initialFetch();
    },
    []
  );

  return (
    <Wrapper>
      <SearchBox placeholder="Ketik nama negara atau area negara" value={query} onChange={evt => setQuery(evt.target.value)} />
      {isLoaded && (
        <React.Fragment>
          {countries
            .filter(country => country.name.toLowerCase().includes(query.toLowerCase()) || country.subregion.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 10)
            .map(country => (<CountryElement>{country.name}, {country.subregion}</CountryElement>))}
          <Notice><b>Tips:</b> Ketik nama negara di atas untuk mencari negara yang anda inginkan</Notice>
        </React.Fragment>
      )}
      {(!isLoaded && !isError) && (
        <Spinner><div /><div /><div /></Spinner>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const SearchBox = styled.input`
  width: 100%;
  padding: 1rem 0 0.9rem;
  margin: 0 0 1rem;
  color: #333;
  background: none;
  border: none;
  border-bottom: 0.1rem solid #333;
  outline: none;
  font-size: 1rem;
  line-height: 1;
  text-align: left;
`;

const CountryElement = styled.button`
  width: 100%;
  padding: 1rem 0 0.9rem;
  margin: 0 0 0.5rem;
  color: #333;
  background: none;
  border: none;
  border-bottom: 0.1rem solid #CCC;
  outline: none;
  font-size: 1rem;
  line-height: 1;
  text-align: left;
  cursor: pointer;
  transition: 0.25s ease all;

  &:hover {
    opacity: 0.5;
    transition: 0.25s ease all;
  }
`;

const Notice = styled.span`
  width: 100%;
  margin: 1rem 0 0;
  font-size: 0.75rem;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: #CCC;
`;

const Spinner = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  & > div {
    width: 0.75rem;
    height: 0.75rem;
    background: #999;
    border-radius: 100%;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    margin: 0 0 0 0.25rem;
  }

  & > div:nth-of-type(1) {
    animation-delay: -0.32s;
    margin: 0;
  }

  & > div:nth-of-type(2) {
    animation-delay: -0.16s;
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% { 
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    40% { 
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
`;

