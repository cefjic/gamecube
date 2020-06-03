import React, { Fragment, useEffect, useState } from 'react';

import Board from '../board/Board';
import { Difficulty, generateTraps, PositionProps } from '../board/Board.utils';
import {
  EASY_LEVEL,
  HARD_LEVEL,
  MEDIUM_LEVEL,
  NB_EASY_LEVELS,
  NB_LIFES,
  NB_MEDIUM_LEVELS
} from './Game.config';
import { BackgroundWrapper, GlobalStyle, Wrapper } from './Game.styles';

export interface LevelConfigProps {
  difficulty: Difficulty;
  startPosition: PositionProps;
  exitPosition: PositionProps;
  boardWidth: number;
  boardHeight: number;
  trapShowingTime: number;
  trapsCount: number;
}

export interface LevelProps extends LevelConfigProps {
  trapsPositions: PositionProps[];
  name: string;
}

const buildLevel = (level: LevelConfigProps, levelNumber: number) => {
  const {
    boardHeight,
    boardWidth,
    startPosition,
    exitPosition,
    trapsCount,
  } = level;

  return {
    ...level,
    name: `Level ${levelNumber + 1}`,
    trapsPositions: generateTraps(
      trapsCount,
      boardWidth,
      boardHeight,
      startPosition,
      exitPosition
    ),
  };
};

const getLevelConfig = (level: number) =>
  level <= NB_EASY_LEVELS
    ? EASY_LEVEL
    : level <= NB_MEDIUM_LEVELS
    ? MEDIUM_LEVEL
    : HARD_LEVEL;

const Game = () => {
  const [levelNumber, setLevelNumber] = useState<number>(0);
  const [lifes, setLifes] = useState<number>(NB_LIFES);

  const [loading, setLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<LevelProps>(
    buildLevel(EASY_LEVEL, levelNumber)
  );

  const nextLevel = () => {
    setLoading(true);
    setTimeout(() => {
      setLevelNumber(levelNumber + 1);
      setLoading(false);
    }, 500);
  };

  const restartLevel = () => {
    setLoading(true);
    if (lifes > 1) {
      setLifes(lifes - 1);
    } else {
      setLifes(NB_LIFES);
      setLevelNumber(0);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setLevel(buildLevel(getLevelConfig(levelNumber), levelNumber));
  }, [levelNumber]);

  return (
    <Fragment>
      <BackgroundWrapper />
      <Wrapper>
        <GlobalStyle />
        {loading ? (
          <div>loading...</div>
        ) : (
          <Fragment>
            <Board
              {...level}
              nbLifes={lifes}
              id={levelNumber}
              onSuccessClick={nextLevel}
              onRestartClick={restartLevel}
            />
          </Fragment>
        )}
      </Wrapper>
    </Fragment>
  );
};

export default Game;
