import styled, { css } from 'styled-components';

import colors from '../../utils/colors';

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 3px;
`;

export const SkullWrapper = styled.div<{ isColored: boolean; color: string }>`
  & + & {
    margin-left: 8px;
  }

  svg,
  div {
    width: 20px;
    height: 20px;
  }

  div {
    display: flex;
  }

  path {
    ${({ isColored, color }) =>
      isColored
        ? css`
            fill: ${color};
          `
        : css`
            fill: ${colors.lightGrey};
          `}
  }
`;
