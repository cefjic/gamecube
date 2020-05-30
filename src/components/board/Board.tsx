import React, { FC, Fragment, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import VirtualKeys from '../virtualKeys/VirtualKeys';
import {
  BoardStop,
  BoardWrapper,
  Cell,
  LevelName,
  Line,
  MapGame
} from './Board.styles';
import {
  GameBoard,
  getCurrentPosition,
  getInitialData,
  isInPositions,
  isSamePosition,
  moveToDown,
  moveToLeft,
  moveToRight,
  moveToUp,
  PositionProps
} from './Board.utils';

export interface BoardProps {
  id: number;
  name: string;
  startPosition: PositionProps;
  exitPosition: PositionProps;
  trapsPositions: PositionProps[];
  boardWidth: number;
  boardHeight: number;
  trapShowingTime: number;
  onSuccessClick(): void;
  onRestartClick(): void;
}

const Board: FC<BoardProps> = (props) => {
  const [board, updateBoard] = useState<GameBoard>(getInitialData(props));

  const {
    exitPosition,
    trapShowingTime,
    trapsPositions,
    onSuccessClick,
    onRestartClick,
  } = props;
  const { gameMap, hasWon, hasLost, levelName } = board;
  const isBoardFinised = hasLost || hasWon;
  const position = getCurrentPosition(gameMap);

  const goToLeft = () => {
    updateBoard({ ...board, gameMap: moveToLeft(board) });
  };

  const goToRight = () => {
    updateBoard({ ...board, gameMap: moveToRight(board) });
  };

  const goToUp = () => {
    updateBoard({ ...board, gameMap: moveToUp(board) });
  };

  const goToDown = () => {
    updateBoard({ ...board, gameMap: moveToDown(board) });
  };

  useHotkeys("left", goToLeft, [board]);

  useHotkeys("right", goToRight, [board]);

  useHotkeys("up", goToUp, [board]);

  useHotkeys("down", goToDown, [board]);

  useEffect(() => {
    const isOnExit = isSamePosition(position, exitPosition);
    if (isOnExit && !hasWon) {
      updateBoard({ ...board, hasWon: true });
    }
  }, [position, exitPosition, hasWon, board]);

  useEffect(() => {
    const isOnTrap = isInPositions(position, trapsPositions);
    if (isOnTrap && !hasLost) {
      updateBoard({ ...board, hasLost: true });
    }
  }, [position, trapsPositions, hasLost, board]);

  return (
    <Fragment>
      <LevelName>{levelName}</LevelName>
      <BoardWrapper>
        {hasWon && (
          <BoardStop>
            <span>You won !</span>
            <button onClick={onSuccessClick}>Next level ></button>
          </BoardStop>
        )}
        {hasLost && (
          <BoardStop>
            <span>You lost !</span>
            <button onClick={onRestartClick}>Retry</button>
          </BoardStop>
        )}
        <MapGame>
          {gameMap.lines.map((line, lineIndex) => (
            <Line key={lineIndex}>
              {line.cells.map((cell, cellIndex) => (
                <Cell
                  {...cell}
                  key={cellIndex}
                  isFinish={isBoardFinised}
                  trapShowingTime={trapShowingTime}
                />
              ))}
            </Line>
          ))}
        </MapGame>
      </BoardWrapper>
      <VirtualKeys
        goToDown={goToDown}
        goToLeft={goToLeft}
        goToRight={goToRight}
        goToUp={goToUp}
      />
    </Fragment>
  );
};

export default Board;
