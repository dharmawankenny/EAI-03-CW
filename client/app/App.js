import React from 'react';

import styled from 'styled-components';

import CountryList from './containers/CountryList';

export default function App() {
  return (
    <Wrapper>
      <Title>Cuaca</Title>
      <SubTitle>Dapatkan informasi cuaca dari ibu kota negara apapun di dunia ini.</SubTitle>
      <CountryList />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content; flex-start;
`;

const Title = styled.h1`
  width: 100%;
  margin: 6rem 0 1rem;
  color: #333;
  text-align: left;
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.1rem;
`;

const SubTitle = styled.span`
  width: 100%;
  margin: 0 0 2rem;
  color: #999;
  text-align: left;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.25;
`;
