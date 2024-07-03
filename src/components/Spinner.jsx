// Spinner.jsx
import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerContainer>
      <div className="loader"></div>
    </SpinnerContainer>
  );
};

export default Spinner;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;