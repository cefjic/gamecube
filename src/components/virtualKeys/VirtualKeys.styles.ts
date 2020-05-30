import styled, { css } from 'styled-components';

import colors from '../../utils/colors';

export const KeysInstructions = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 150px;
  margin-top: 32px;
`;

export const Key = styled.div<{ rotate?: number }>`
  width: 50px;
  height: 50px;

  ${({ rotate }) =>
    rotate &&
    css`
      transform: rotate(${rotate}deg);
    `}

  svg, path {
    fill: ${colors.grey};
  }
`;
