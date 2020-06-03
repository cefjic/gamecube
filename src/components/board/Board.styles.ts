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

const moveFrom = keyframes`
  from {
    transform: scale(1.05);
    background: ${colors.grey};
  }
  to {
    transform: scale(1);
    background: ${colors.lightGrey};
  }
`;

const trapBegin = keyframes`
  0% {
    background-color: ${colors.red};
  }
  50% {
    background-color: ${colors.red};
  }
  100% {
    background-color: ${colors.grey};
  }
`;

const bombBegin = keyframes`
  0% {
      opacity: 1;
  }
  50% {
      opacity: 1;
  }
  100% {
      opacity: 0;
  }
`;

const exitAnimation = keyframes`
  0% {
    border-radius: 10%;
    transform: rotate(0deg);
    opacity: 1;
  }
  50% {
    border-radius: 50%;
    transform: rotate(45deg);
    opacity: 0.8;
  }
  100% {
    border-radius: 10%;
    transform: rotate(90deg);
    opacity: 1;
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

      > div {
        opacity: 0;
        animation: ${bombBegin} ${trapShowingTime}s linear normal forwards;
      }

      svg {
        width: 20px;
        height: 20px;
        padding: 5px;
      }
    `}


  ${({ isTrap, isFinish }) =>
    isTrap &&
    isFinish &&
    css`
      background: ${colors.red};
      animation: unset;

      > div {
        animation: unset;
      }
    `}

  ${({ isUser }) =>
    isUser &&
    css`
      animation: ${moveFrom} 0.1s linear normal forwards;
      background: ${colors.lightGrey};
    `}

  ${({ isExit }) =>
    isExit &&
    css`
      background: ${colors.lightGrey};
      animation: ${exitAnimation} 4s linear infinite;
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
  overflow: hidden;
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
  margin: 0 0 8px;
  background: #f4f5f6;
  box-shadow: 0px 0px 40px #f4f5f6;
  padding: 4px;
`;

export const Button = styled.button`
  padding: 12px 24px;
  background: white;
  border: 2px solid #cfd8dc;
  font-size: 16px;
  border-radius: 10px;
  margin-top: 24px;
  cursor: pointer;
  position: relative;
  z-index: 99;

  :hover {
    background: #f9f9f9;
  }

  :hover,
  :active,
  :focus {
    outline: none;
  }
`;
