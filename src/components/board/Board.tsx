import React, { FC, Fragment, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { BoardStop, BoardWrapper, Cell, Line, MapGame } from './Board.styles';
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

  useHotkeys(
    "left",
    () => {
      updateBoard({ ...board, gameMap: moveToLeft(board) });
    },
    { filter: () => !isBoardFinised },
    [board]
  );

  useHotkeys(
    "right",
    () => {
      updateBoard({ ...board, gameMap: moveToRight(board) });
    },
    [board]
  );

  useHotkeys(
    "up",
    () => {
      updateBoard({ ...board, gameMap: moveToUp(board) });
    },
    [board]
  );

  useHotkeys(
    "down",
    () => {
      updateBoard({ ...board, gameMap: moveToDown(board) });
    },
    [board]
  );

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
      <p>{levelName}</p>
      <BoardWrapper>
        {hasWon && <BoardStop>You won !</BoardStop>}
        {hasLost && <BoardStop>You lost !</BoardStop>}
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
      {hasWon && <button onClick={onSuccessClick}>Niveau suivant</button>}
      {hasLost && <button onClick={onRestartClick}>Réessayer</button>}
    </Fragment>
  );
};

export default Board;
