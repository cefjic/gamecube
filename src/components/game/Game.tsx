import React, { Fragment, useEffect, useState } from 'react';

import Board from '../board/Board';
import { LevelConfigProps, LevelProps } from '../board/Board.interfaces';
import { generateHeartPosition, generateTraps } from '../board/Board.utils';
import {
  EASY_LEVEL,
  EXTREME_LEVEL,
  HARD_LEVEL,
  MEDIUM_LEVEL,
  NB_EASY_LEVELS,
  NB_HARD_LEVELS,
  NB_LIFES,
  NB_MEDIUM_LEVELS
} from './Game.config';
import {
  BackgroundWrapper,
  GlobalStyle,
  Loading,
  Wrapper
} from './Game.styles';

const buildLevel = (level: LevelConfigProps, levelNumber: number) => {
  const {
    boardHeight,
    boardWidth,
    startPosition,
    exitPosition,
    trapsCount,
  } = level;

  const trapsPositions = generateTraps(
    trapsCount,
    boardWidth,
    boardHeight,
    startPosition,
    exitPosition
  );

  return {
    ...level,
    name: `Level ${levelNumber}`,
    trapsPositions,
    heartPosition: generateHeartPosition(boardWidth, boardHeight, [
      startPosition,
      exitPosition,
      ...trapsPositions,
    ]),
  };
};

const getLevelConfig = (level: number) => {
  if (level <= NB_EASY_LEVELS) {
    return EASY_LEVEL;
  } else if (level <= NB_EASY_LEVELS + NB_MEDIUM_LEVELS) {
    return MEDIUM_LEVEL;
  } else if (level <= NB_EASY_LEVELS + NB_MEDIUM_LEVELS + NB_HARD_LEVELS) {
    return HARD_LEVEL;
  }
  return EXTREME_LEVEL;
};

const Game = () => {
  const [levelNumber, setLevelNumber] = useState<number>(1);
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

  const incrementLife = () => {
    if (lifes < NB_LIFES) {
      setLifes(lifes + 1);
      setLevel({ ...level, heartPosition: undefined });
    }
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
          <Loading />
        ) : (
          <Fragment>
            <Board
              {...level}
              nbLifes={lifes}
              id={levelNumber}
              onSuccessClick={nextLevel}
              onRestartClick={restartLevel}
              onHeartStep={incrementLife}
            />
          </Fragment>
        )}
      </Wrapper>
    </Fragment>
  );
};

export default Game;
