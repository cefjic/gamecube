import styled, { css, keyframes } from 'styled-components';

import colors from '../../utils/colors';
import { CellProps } from './Board.interfaces';

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
    background: #7986cb;
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

const exitAnimation = keyframes`
  0% {
    border-radius: 10%;
    transform: rotate(0deg);
    opacity: 1;
  }
  45% {
    border-radius: 50%;
  }
  50% {
    transform: rotate(45deg);
    opacity: 0.8;
  }
  55%{
    border-radius: 50%;
  }
  100% {
    border-radius: 10%;
    transform: rotate(90deg);
    opacity: 1;
  }
`;

const moveStart = keyframes`
  0%{
    border-radius: 50%;
    transform: scale(4);
    opacity: 0;
  }
  100% {
    border-radius: 10%;
    transform: scale(1);
    opacity: 1;
  }
`;

interface CellDivProps extends CellProps {
  isFinish: boolean;
  trapShowingTime: number;
  isStartCell: boolean;
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
    
  ${({ isHeart }) =>
    isHeart &&
    css`
      animation: unset;
      background: ${colors.grey};
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      div {
        display: flex;
      }

      svg {
        width: 20px;
        height: 20px;
        fill: white;
      }
    `}

  ${({ isUser }) =>
    isUser &&
    css`
      animation: ${moveFrom} 0.1s linear normal forwards;
      background: ${colors.purple};
    `}

  ${({ isUser, isStartCell }) =>
    isUser &&
    isStartCell &&
    css`
      animation: ${moveStart} 0.4s ease-in normal forwards;
      background: ${colors.purple};
      z-index: 2;
    `}

  ${({ isExit }) =>
    isExit &&
    css`
      background: ${colors.teal};
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

export const HeartAnimation = keyframes`
  0%{
    transform: rotate(0deg);
  }
  25%{
    transform: rotate(-10deg);
  }
  75%{
    transform: rotate(10deg);
  }
  100%{
    transform: rotate(0deg);
  }
`;

export const HeartCell = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;

  svg {
    animation: ${HeartAnimation} 2s linear infinite;
    fill: ${colors.red};
  }
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
  margin-top: 40px;
`;

export const BoardStop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Top = styled.div`
  position: absolute;
  top: -40px;
  left: -4px;
  right: -4px;
  font-size: 24px;
  color: ${colors.darkGrey};
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    flex: 1;
  }
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
