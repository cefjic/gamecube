import React, { FC } from 'react';
import { ReactSVG } from 'react-svg';

import Skull from '../../assets/icons/skull.svg';
import { Difficulty } from '../board/Board.utils';
import { SkullWrapper, Wrapper } from './DifficultyBar.styles';

interface OwnProps {
  difficulty: Difficulty;
}

const getNbSkulls = (difficulty: Difficulty) => {
  if (difficulty === Difficulty.EASY) {
    return 1;
  } else if (difficulty === Difficulty.MEDIUM) {
    return 2;
  } else if (difficulty === Difficulty.HARD) {
    return 3;
  }
  return 4;
};

const DifficultyBar: FC<OwnProps> = ({ difficulty }) => {
  const nbSkull = getNbSkulls(difficulty);

  return (
    <Wrapper>
      {Array.from({ length: 4 }, (_, k) => k + 1).map((index) => (
        <SkullWrapper isColored={nbSkull < index}>
          <ReactSVG src={Skull} />
        </SkullWrapper>
      ))}
    </Wrapper>
  );
};

export default DifficultyBar;
