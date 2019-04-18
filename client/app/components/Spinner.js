import React from 'react';

import styled from 'styled-components';

// Simple spinner inspired by Spin-Kit
export default function Spinner() {
  return <SpinnerWrapper><div /><div /><div /></SpinnerWrapper>;
}

const SpinnerWrapper = styled.div`
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
