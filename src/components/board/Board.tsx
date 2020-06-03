import React, { FC, Fragment, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { ReactSVG } from 'react-svg';

import Bomb from '../../assets/icons/bomb.svg';
import { LevelProps } from '../game/Game';
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
  onSuccessClick(): void;
  onRestartClick(): void;
}

const Board: FC<BoardProps> = (props) => {
  const [board, updateBoard] = useState<GameBoard>(getInitialData(props));

  const {
    exitPosition,
    trapShowingTime,
    onSuccessClick,
    onRestartClick,
  } = props;
  const { gameMap, hasWon, hasLost, levelName, trapsPositions } = board;
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
            <span>You win !</span>
            <Button onClick={onSuccessClick}>Next level</Button>
          </BoardStop>
        )}
        {hasLost && (
          <BoardStop>
            <span>Oh no !</span>
            <Button onClick={onRestartClick}>Retry</Button>
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
                >
                  {cell.isTrap && <ReactSVG src={Bomb} />}
                </Cell>
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
