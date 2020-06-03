import React, { Fragment, useEffect, useState } from 'react';

import Board from '../board/Board';
import { generateTraps, PositionProps } from '../board/Board.utils';
import gameConfig from './Game.config';
import { BackgroundWrapper, GlobalStyle, Wrapper } from './Game.styles';

export interface LevelConfigProps {
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

const Game = () => {
  const [levelNumber, setLevelNumber] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<LevelProps>(
    buildLevel(gameConfig[levelNumber], levelNumber)
  );

  const nextLevel = () => {
    if (gameConfig.length - 1 > levelNumber) {
      setLoading(true);
      setTimeout(() => {
        setLevelNumber(levelNumber + 1);
        setLoading(false);
      }, 500);
    }
  };

  const restartLevel = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setLevel(buildLevel(gameConfig[levelNumber], levelNumber));
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
