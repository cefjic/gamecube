import styled, { css, keyframes } from 'styled-components';

import colors from '../../utils/colors';
import { CellProps } from './Board.utils';

const moveTo = keyframes`
  from {

    transform: scale(0.8);
    background: ${colors.lightGrey};
  }
  to {
    transform: scale(1);
    background: ${colors.grey};
  }
`;

const trapBegin = keyframes`
  0% {
    background: ${colors.red};
  }
  50% {
    background: ${colors.red};
  }
  100% {
    background: ${colors.grey};
  }
`;

const exitAnimation = keyframes`
  0% {
    border-radius: 10%;
  }
  50% {
    border-radius: 50%;
  }
  100% {
    border-radius: 10%;
  }
`;

interface CellDivProps extends CellProps {
  isFinish: boolean;
  trapShowingTime: number;
}

export const Cell = styled.div<CellDivProps>`
  width: 30px;
  height: 30px;
  background: ${colors.grey};
  margin: 2px;
  transition: transform 0.2s;
  border-radius: 10%;

  ${({ isWentHere }) =>
    isWentHere &&
    css`
      animation: ${moveTo} 2s linear normal forwards;
    `}

  ${({ isWentHere, isFinish }) =>
    isWentHere &&
    isFinish &&
    css`
      background: ${colors.darkGrey};
      animation: unset;
    `}

  ${({ isTrap, trapShowingTime }) =>
    isTrap &&
    css`
      background: ${colors.red};
      animation: ${trapBegin} ${trapShowingTime}s linear normal forwards;
    `}


  ${({ isTrap, isFinish }) =>
    isTrap &&
    isFinish &&
    css`
      background: ${colors.red};
      animation: unset;
    `}

  ${({ isUser }) =>
    isUser &&
    css`
      background: ${colors.lightGrey};
      animation: unset;
    `}

  ${({ isExit }) =>
    isExit &&
    css`
      background: ${colors.lightGrey};
      animation: ${exitAnimation} 5s linear infinite;
    `}

  ${({ isTrap, isUser }) =>
    isTrap &&
    isUser &&
    css`
      background: ${colors.purple};
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
  border: 4px solid ${colors.lightGrey};
  border-radius: 10px;
  padding: 1px;
`;

export const BoardStop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-indx: 2;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LevelName = styled.p`
  font-size: 24px;
  color: ${colors.darkGrey};
  margin: 0 0 24px;
`;
