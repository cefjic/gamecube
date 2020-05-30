import { BoardProps } from './Board';

export interface PositionProps {
  width: number;
  height: number;
}

export interface CellProps {
  isTrap: boolean;
  isWentHere: boolean;
  isUser: boolean;
  isExit: boolean;
}

export interface LineProps {
  cells: CellProps[];
}

export interface GameMap {
  lines: LineProps[];
}

export interface GameBoard {
  levelName: string;
  gameMap: GameMap;
  hasWon: boolean;
  hasLost: boolean;
  width: number;
  height: number;
}

export const isInPositions = (position: PositionProps, list: PositionProps[]) =>
  list.filter((pos) => isSamePosition(pos, position)).length > 0;

export const isSamePosition = (pos1: PositionProps, pos2: PositionProps) =>
  pos1.width === pos2.width && pos1.height === pos2.height;

export const initMap = (
  width: number,
  height: number,
  startPosition: PositionProps,
  exitPosition: PositionProps,
  trapsPositions: PositionProps[]
): GameMap => {
  const cell: CellProps = {
    isTrap: false,
    isWentHere: false,
    isUser: false,
    isExit: false,
  };

  return {
    lines: Array.from({ length: width }, (_, k) => k + 1).map((lineIndex) => ({
      cells: Array.from({ length: height }, (_, k) => k + 1).map(
        (cellIndex) => {
          const currentPosition: PositionProps = {
            width: lineIndex - 1,
            height: cellIndex - 1,
          };
          if (isSamePosition(currentPosition, startPosition)) {
            return { ...cell, isUser: true };
          }

          if (isSamePosition(currentPosition, exitPosition)) {
            return { ...cell, isExit: true };
          }

          if (isInPositions(currentPosition, trapsPositions)) {
            return { ...cell, isTrap: true };
          }

          return cell;
        }
      ),
    })),
  };
};

export const canMove = (
  board: GameBoard,
  { width, height }: PositionProps
): boolean => {
  const { hasWon, hasLost, width: boardWidth, height: boardHeight } = board;
  if (
    width >= 0 &&
    width < boardWidth &&
    height >= 0 &&
    height < boardHeight &&
    !hasLost &&
    !hasWon
  ) {
    return true;
  }
  return false;
};

export const getCurrentPosition = (gameMap: GameMap): PositionProps => {
  let position = { width: -1, height: -1 };

  gameMap.lines.forEach((line, width) => {
    line.cells.forEach((cell, height) => {
      if (cell.isUser) {
        position = { width, height };
      }
    });
  });

  return position;
};

export const updateCell = (
  gameMap: GameMap,
  { width, height }: PositionProps,
  cell: CellProps
) => {
  gameMap.lines[width].cells[height] = cell;
  return gameMap;
};

export const getCell = (gameMap: GameMap, { width, height }: PositionProps) =>
  gameMap.lines[width].cells[height];

export const moveToPosition = (
  board: GameBoard,
  oldPosition: PositionProps,
  newPosition: PositionProps
) => {
  let { gameMap } = board;
  if (canMove(board, newPosition)) {
    const oldCell = getCell(gameMap, oldPosition);
    const newCell = getCell(gameMap, newPosition);

    gameMap = updateCell(gameMap, oldPosition, {
      ...oldCell,
      isUser: false,
      isWentHere: true,
    });

    gameMap = updateCell(gameMap, newPosition, {
      ...newCell,
      isUser: true,
      isWentHere: false,
    });
  }

  return gameMap;
};

export const moveToRight = (board: GameBoard): GameMap => {
  const { gameMap } = board;
  const oldPosition = getCurrentPosition(gameMap);
  const newPosition = {
    width: oldPosition.width + 1,
    height: oldPosition.height,
  };

  return moveToPosition(board, oldPosition, newPosition);
};

export const moveToLeft = (board: GameBoard): GameMap => {
  const { gameMap } = board;
  const oldPosition = getCurrentPosition(gameMap);
  const newPosition = {
    width: oldPosition.width - 1,
    height: oldPosition.height,
  };

  return moveToPosition(board, oldPosition, newPosition);
};

export const moveToUp = (board: GameBoard): GameMap => {
  const { gameMap } = board;
  const oldPosition = getCurrentPosition(gameMap);
  const newPosition = {
    width: oldPosition.width,
    height: oldPosition.height - 1,
  };

  return moveToPosition(board, oldPosition, newPosition);
};

export const moveToDown = (board: GameBoard): GameMap => {
  const { gameMap } = board;
  const oldPosition = getCurrentPosition(gameMap);
  const newPosition = {
    width: oldPosition.width,
    height: oldPosition.height + 1,
  };

  return moveToPosition(board, oldPosition, newPosition);
};

export const getInitialData = ({
  boardHeight,
  boardWidth,
  exitPosition,
  startPosition,
  trapsPositions,
  name,
}: BoardProps) => ({
  levelName: name,
  gameMap: initMap(
    boardWidth,
    boardHeight,
    startPosition,
    exitPosition,
    trapsPositions
  ),
  hasWon: false,
  hasLost: false,
  width: boardWidth,
  height: boardHeight,
});
