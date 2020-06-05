import styled, { createGlobalStyle, keyframes } from 'styled-components';

import Background from '../../assets/images/interlaced.png';
import colors from '../../utils/colors';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Varela Round", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    max-width: 100%;
    min-height: 100%;
    overflow: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    overflow: hidden;
  }

  button {
    font-family: "Varela Round", sans-serif;
  }
`;

const BackgroundAnimation = keyframes`
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(400px);
  }
`;

export const BackgroundWrapper = styled.div`
  background: url(${Background});
  position: absolute;
  top: 0;
  left: -400px;
  bottom: 0;
  right: 0;
  animation: ${BackgroundAnimation} 20s linear infinite;
`;

export const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 960px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    background: ${colors.teal};
  }
  50% {
    background: ${colors.red};
  }
  100%{
    background: ${colors.teal};
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  animation: ${LoadingAnimation} 2s linear infinite;
`;
