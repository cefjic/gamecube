export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  EXTREME = "extreme",
}

export interface PositionProps {
  width: number;
  height: number;
}

export interface LevelConfigProps {
  difficulty: Difficulty;
  startPosition: PositionProps;
  exitPosition: PositionProps;
  boardWidth: number;
  boardHeight: number;
  trapShowingTime: number;
  trapsCount: number;
}

export interface CellProps {
  isTrap: boolean;
  isWentHere: boolean;
  isUser: boolean;
  isExit: boolean;
  isHeart: boolean;
}

export interface LevelProps extends LevelConfigProps {
  trapsPositions: PositionProps[];
  heartPosition?: PositionProps;
  name: string;
}

export interface LineProps {
  cells: CellProps[];
}

export interface GameMap {
  lines: LineProps[];
}

export interface GameBoard {
  difficulty: Difficulty;
  levelName: string;
  gameMap: GameMap;
  hasWon: boolean;
  hasLost: boolean;
  needRestart: boolean;
  width: number;
  height: number;
  trapsPositions: PositionProps[];
}
