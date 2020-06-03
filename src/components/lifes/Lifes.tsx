import React, { FC } from 'react';
import { ReactSVG } from 'react-svg';

import EmptyHeart from '../../assets/icons/empty_heart.svg';
import Heart from '../../assets/icons/heart.svg';
import { NB_LIFES } from '../game/Game.config';
import { LifesContainer, LifeWrapper } from './Lifes.styles';

interface OwnProps {
  nbLifes: number;
}

const Lifes: FC<OwnProps> = ({ nbLifes }) => {
  const activeIntensity = nbLifes <= NB_LIFES / 3;
  return (
    <LifesContainer>
      {Array.from({ length: NB_LIFES }, (_, k) => k + 1).map((index) =>
        index <= nbLifes ? (
          <LifeWrapper key={index} index={index} intensity={activeIntensity}>
            <ReactSVG src={Heart} />
          </LifeWrapper>
        ) : (
          <LifeWrapper key={index} empty={true} intensity={false} index={index}>
            <ReactSVG src={EmptyHeart} />
          </LifeWrapper>
        )
      )}
    </LifesContainer>
  );
};

export default Lifes;
