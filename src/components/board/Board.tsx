import React, { FC, Fragment, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { ReactSVG } from 'react-svg';

import Heart from '../../assets/icons/heart.svg';
import DifficultyBar from '../difficultyBar/DifficultyBar';
import Lifes from '../lifes/Lifes';
import VirtualKeys from '../virtualKeys/VirtualKeys';
import { GameBoard, LevelProps } from './Board.interfaces';
import {
  BoardStop,
  BoardWrapper,
  Button,
  Cell,
  HeartCell,
  Line,
  MapGame,
  Top
} from './Board.styles';
import {
  getCurrentPosition,
  getInitialData,
  isInPositions,
  isSamePosition,
  moveToDown,
  moveToLeft,
  moveToRight,
  moveToUp,
  removeHeartCell
} from './Board.utils';

export interface BoardProps extends LevelProps {
  id: number;
  nbLifes: number;
  onSuccessClick(): void;
  onRestartClick(): void;
  onHeartStep(): void;
}

interface StatsProps {
  hasMove: boolean;
  isHealed: boolean;
}

const Board: FC<BoardProps> = (props) => {
  const [board, updateBoard] = useState<GameBoard>(getInitialData(props));
  const [stats, updateStats] = useState<StatsProps>({
    isHealed: false,
    hasMove: false,
  });

  const {
    exitPosition,
    startPosition,
    nbLifes,
    trapShowingTime,
    heartPosition,
    onSuccessClick,
    onRestartClick,
    onHeartStep,
  } = props;
  const { hasMove, isHealed } = stats;
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
      updateStats({ ...stats, hasMove: true });
    }
  }, [hasMove, startPosition, position, stats]);

  useEffect(() => {
    if (!isHealed && heartPosition && isSamePosition(heartPosition, position)) {
      onHeartStep();
      updateStats({ ...stats, isHealed: true });
      const newMap = removeHeartCell(gameMap);
      if (newMap) {
        updateBoard({ ...board, gameMap: newMap });
      }
    }
  }, [heartPosition, position, onHeartStep, gameMap, board, isHealed, stats]);

  return (
    <Fragment>
      <BoardWrapper>
        <Top>
          <span>{levelName}</span>
          <DifficultyBar difficulty={difficulty} />
        </Top>
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
                >
                  {cell.isHeart && (
                    <Fragment>
                      <HeartCell>
                        <ReactSVG src={Heart} />
                      </HeartCell>
                    </Fragment>
                  )}
                </Cell>
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
