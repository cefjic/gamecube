import { transparentize } from 'polished';
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
  border-radius: 10px;

  svg {
    cursor: pointer;
    ${({ rotate }) =>
      rotate &&
      css`
        transform: rotate(${rotate}deg);
      `}
  }

  path {
    fill: ${colors.grey};
  }

  :active {
    path {
      fill: ${transparentize(0.2, colors.grey)};
    }
  }
`;
