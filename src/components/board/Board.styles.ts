import styled, { css, keyframes } from 'styled-components';

import { CellProps } from './Board.utils';

const moveTo = keyframes`
  from {
    background: lightGrey;
  }
  to {
    background: grey;
  }
`;

const trapBegin = keyframes`
  0% {
    background: red;
  }
  50% {
    background: red;
  }
  100% {
    background: grey;
  }
`;

interface CellDivProps extends CellProps {
  isFinish: boolean;
  trapShowingTime: number;
}

export const Cell = styled.div<CellDivProps>`
  width: 20px;
  height: 20px;
  background: grey;
  margin: 2px;

  ${({ isWentHere }) =>
    isWentHere &&
    css`
      animation: ${moveTo} 2s linear normal forwards;
    `}

  ${({ isWentHere, isFinish }) =>
    isWentHere &&
    isFinish &&
    css`
      background: black;
      animation: unset;
    `}

  ${({ isTrap, trapShowingTime }) =>
    isTrap &&
    css`
      background: red;
      animation: ${trapBegin} ${trapShowingTime}s linear normal forwards;
    `}


  ${({ isTrap, isFinish }) =>
    isTrap &&
    isFinish &&
    css`
      background: red;
      animation: unset;
    `}

  ${({ isUser }) =>
    isUser &&
    css`
      background: orange;
      animation: unset;
    `}

  ${({ isExit: isOutside }) =>
    isOutside &&
    css`
      background: gold;
      animation: unset;
    `}

  ${({ isTrap, isUser }) =>
    isTrap &&
    isUser &&
    css`
      background: purple;
      animation: unset;
    `}
  
`;

export const Line = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MapGame = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BoardWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid grey;
`;

export const BoardStop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;
