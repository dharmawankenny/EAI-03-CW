import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Spinner from '../components/Spinner';
import api from '../services/api';

// This is the container containing logics and UI
// for fetching and displaying the countries data
// which includes search functionality and when a country
// is clicked, it will show its capital weather data.
export default function CountryList(props) {
  const { setSelectedCountry } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  // For fetching data from API
  useEffect(
    () => {
      const initialFetch = async () => {
        try {
          const countriesRes = await api.get('/getAllCountries');
    
          if (countriesRes.data && countriesRes.data.length > 0) {
            setCountries(countriesRes.data);
            setIsLoaded(true);
          } else {
            setIsError(true);
          }
        } catch (err) {
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
      {(isLoaded && !isError) && (
        <React.Fragment>
          {countries
            .filter(country => country.name.toLowerCase().includes(query.toLowerCase()) || country.subregion.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 10)
            .map(country => (<CountryElement onClick={() => setSelectedCountry(country.name)}>{country.name}{country.subregion && `, ${country.subregion}`}</CountryElement>))}
          <Notice><b>Tips:</b> Ketik nama negara di atas untuk mencari negara yang anda inginkan</Notice>
        </React.Fragment>
      )}
      {(!isLoaded && !isError) && <Spinner />}
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
