import React, { FC } from 'react';
import { ReactSVG } from 'react-svg';

import Skull from '../../assets/icons/skull.svg';
import colors from '../../utils/colors';
import { Difficulty } from '../board/Board.utils';
import { SkullWrapper, Wrapper } from './DifficultyBar.styles';

interface OwnProps {
  difficulty: Difficulty;
}

const getSkullConfig = (difficulty: Difficulty) => {
  if (difficulty === Difficulty.EASY) {
    return { nbSkull: 1, color: colors.green };
  } else if (difficulty === Difficulty.MEDIUM) {
    return { nbSkull: 2, color: colors.lime };
  } else if (difficulty === Difficulty.HARD) {
    return { nbSkull: 3, color: colors.orange };
  }
  return { nbSkull: 4, color: colors.deepRed };
};

const DifficultyBar: FC<OwnProps> = ({ difficulty }) => {
  const { nbSkull, color } = getSkullConfig(difficulty);

  return (
    <Wrapper>
      {Array.from({ length: 4 }, (_, k) => k + 1).map((index) => (
        <SkullWrapper isColored={nbSkull >= index} color={color}>
          <ReactSVG src={Skull} />
        </SkullWrapper>
      ))}
    </Wrapper>
  );
};

export default DifficultyBar;
