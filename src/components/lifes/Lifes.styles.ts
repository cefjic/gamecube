import styled, { css, keyframes } from 'styled-components';

import colors from '../../utils/colors';

export const LifesContainer = styled.div`
  display: flex;
  margin-top: 24px;
`;

export const heartAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(2px);
  }
  75% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const LifeWrapper = styled.div<{
  empty?: boolean;
  intensity?: boolean;
  index: number;
}>`
  ${({ intensity, index }) =>
    intensity &&
    css`
      animation: ${heartAnimation} 0.2s linear infinite;
      animation-delay: ${index * 0.1}s;
    `}

  svg {
    ${({ empty }) =>
      empty
        ? css`
            fill: ${colors.darkGrey};
          `
        : css`
            fill: ${colors.red};
          `}
  }
`;
