import { LevelConfigProps } from './Game';

const EASY_LEVEL: LevelConfigProps = {
  startPosition: { width: 0, height: 4 },
  exitPosition: { width: 8, height: 4 },
  boardWidth: 9,
  boardHeight: 9,
  trapShowingTime: 2,
  trapsCount: 15,
};

const MEDIUM_LEVEL: LevelConfigProps = {
  startPosition: { width: 0, height: 5 },
  exitPosition: { width: 10, height: 5 },
  boardWidth: 11,
  boardHeight: 11,
  trapShowingTime: 3,
  trapsCount: 35,
};

const HARD_LEVEL: LevelConfigProps = {
  startPosition: { width: 0, height: 6 },
  exitPosition: { width: 20, height: 6 },
  boardWidth: 21,
  boardHeight: 13,
  trapShowingTime: 3.5,
  trapsCount: 90,
};

const nbEasy = 5;
const nbMedium = 30;
const nbHard = 30;

const config = () => {
  const easyLevels = Array.from({ length: nbEasy }, (_, k) => k + 1).map(
    () => EASY_LEVEL
  );
  const mediumLevels = Array.from({ length: nbMedium }, (_, k) => k + 1).map(
    () => MEDIUM_LEVEL
  );
  const hardLevels = Array.from({ length: nbHard }, (_, k) => k + 1).map(
    () => HARD_LEVEL
  );

  return [...easyLevels, ...mediumLevels, ...hardLevels];
};

export default config();
