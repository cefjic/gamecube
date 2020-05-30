import React, { Fragment, useState } from 'react';

import Board from '../board/Board';
import gameConfig from './Game.config';
import { BackgroundWrapper, GlobalStyle, Wrapper } from './Game.styles';

const Game = () => {
  const [levelNumber, setLevelNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const level = gameConfig[levelNumber];

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
              onSuccessClick={nextLevel}
              onRestartClick={restartLevel}
              id={levelNumber}
            />
          </Fragment>
        )}
      </Wrapper>
    </Fragment>
  );
};

export default Game;
