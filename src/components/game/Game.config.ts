import { Difficulty } from '../board/Board.utils';
import { LevelConfigProps } from './Game';

export const EASY_LEVEL: LevelConfigProps = {
  difficulty: Difficulty.EASY,
  startPosition: { width: 0, height: 4 },
  exitPosition: { width: 8, height: 4 },
  boardWidth: 9,
  boardHeight: 9,
  trapShowingTime: 2,
  trapsCount: 20,
};

export const MEDIUM_LEVEL: LevelConfigProps = {
  difficulty: Difficulty.MEDIUM,
  startPosition: { width: 0, height: 5 },
  exitPosition: { width: 10, height: 5 },
  boardWidth: 11,
  boardHeight: 11,
  trapShowingTime: 3,
  trapsCount: 35,
};

export const HARD_LEVEL: LevelConfigProps = {
  difficulty: Difficulty.HARD,
  startPosition: { width: 0, height: 7 },
  exitPosition: { width: 14, height: 7 },
  boardWidth: 15,
  boardHeight: 15,
  trapShowingTime: 4,
  trapsCount: 70,
};

export const EXTREME_LEVEL: LevelConfigProps = {
  difficulty: Difficulty.EXTREME,
  startPosition: { width: 0, height: 6 },
  exitPosition: { width: 20, height: 6 },
  boardWidth: 21,
  boardHeight: 13,
  trapShowingTime: 3.5,
  trapsCount: 90,
};

export const NB_EASY_LEVELS = 10;
export const NB_MEDIUM_LEVELS = 20;
export const NB_HARD_LEVELS = 30;
export const NB_LIFES = 10;
