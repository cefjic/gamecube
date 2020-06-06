import React, { FC, Fragment, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import DifficultyBar from '../difficultyBar/DifficultyBar';
import { LevelProps } from '../game/Game';
import Lifes from '../lifes/Lifes';
import VirtualKeys from '../virtualKeys/VirtualKeys';
import {
  BoardStop,
  BoardWrapper,
  Button,
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
  moveToUp
} from './Board.utils';

export interface BoardProps extends LevelProps {
  id: number;
  nbLifes: number;
  onSuccessClick(): void;
  onRestartClick(): void;
}

const Board: FC<BoardProps> = (props) => {
  const [board, updateBoard] = useState<GameBoard>(getInitialData(props));
  const [hasMove, setHasMove] = useState<boolean>(false);

  const {
    exitPosition,
    startPosition,
    nbLifes,
    trapShowingTime,
    onSuccessClick,
    onRestartClick,
  } = props;
  const {
    gameMap,
    hasWon,
    hasLost,
    levelName,
    trapsPositions,
    difficulty,
    needRestart,
  } = board;
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
      updateBoard({ ...board, hasLost: true, needRestart: nbLifes === 1 });
    }
  }, [position, trapsPositions, hasLost, board, nbLifes]);

  useEffect(() => {
    if (!hasMove && !isSamePosition(startPosition, position)) {
      setHasMove(true);
    }
  }, [hasMove, startPosition, position]);

  return (
    <Fragment>
      <BoardWrapper>
        <LevelName>
          <span>{levelName}</span>
          <DifficultyBar difficulty={difficulty} />
        </LevelName>
        {hasWon && (
          <BoardStop>
            <span>You win !</span>
            <Button onClick={onSuccessClick}>Next level</Button>
          </BoardStop>
        )}
        {hasLost && !needRestart && (
          <BoardStop>
            <span>You can do it !</span>
            <Button onClick={onRestartClick}>Retry</Button>
          </BoardStop>
        )}
        {hasLost && needRestart && (
          <BoardStop>
            <span>You will do better next time</span>
            <Button onClick={onRestartClick}>Retry from scratch</Button>
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
                  isStartCell={
                    !hasMove &&
                    isSamePosition(
                      { width: lineIndex, height: cellIndex },
                      startPosition
                    )
                  }
                />
              ))}
            </Line>
          ))}
        </MapGame>
      </BoardWrapper>
      <Lifes nbLifes={hasLost && needRestart ? nbLifes - 1 : nbLifes} />
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
