import { CHANCE_HEART_APPEAR } from '../game/Game.config';
import { BoardProps } from './Board';
import {
  CellProps,
  GameBoard,
  GameMap,
  PositionProps
} from './Board.interfaces';

export const isInPositions = (position: PositionProps, list: PositionProps[]) =>
  list.filter((pos) => isSamePosition(pos, position)).length > 0;

export const isSamePosition = (pos1: PositionProps, pos2: PositionProps) =>
  pos1.width === pos2.width && pos1.height === pos2.height;

export const generatePositionCell = (max: number) =>
  Math.round(Math.random() * max);

export const generateNewPosition = (
  maxWidth: number,
  maxHeight: number,
  othersPositions: PositionProps[]
): PositionProps => {
  const newPosition: PositionProps = {
    width: generatePositionCell(maxWidth - 1),
    height: generatePositionCell(maxHeight - 1),
  };

  return !isInPositions(newPosition, othersPositions)
    ? newPosition
    : generateNewPosition(maxWidth, maxHeight, othersPositions);
};

export const isExitAccessible = (
  boardWidth: number,
  boardHeight: number,
  startPosition: PositionProps,
  exitPosition: PositionProps,
  trapsPositions: PositionProps[]
) => {
  let accessiblePositions: PositionProps[] = [];

  const positionIsClean = (position: PositionProps) =>
    canMove(false, false, boardWidth, boardHeight, position) &&
    !isInPositions(position, trapsPositions) &&
    !isInPositions(position, accessiblePositions);

  const findAsidePositions = (position: PositionProps) => {
    const { width, height } = position;

    const newPositions: PositionProps[] = [
      { width: width - 1, height },
      { width: width + 1, height },
      { width, height: height - 1 },
      { width, height: height + 1 },
    ].filter(positionIsClean);

    accessiblePositions = [...accessiblePositions, ...newPositions];

    newPositions.map((newPos) => findAsidePositions(newPos));
  };

  findAsidePositions(startPosition);

  return isInPositions(exitPosition, accessiblePositions);
};

export const generateTraps = (
  nbTraps: number,
  width: number,
  height: number,
  startPosition: PositionProps,
  exitPosition: PositionProps
): PositionProps[] => {
  const traps: PositionProps[] = [];

  Array.from({ length: nbTraps }, (_, k) => k + 1).forEach(() => {
    traps.push(
      generateNewPosition(width, height, [
        ...traps,
        startPosition,
        exitPosition,
      ])
    );
  });

  return isExitAccessible(width, height, startPosition, exitPosition, traps)
    ? traps
    : generateTraps(nbTraps, width, height, startPosition, exitPosition);
};

export const generateHeartPosition = (
  width: number,
  height: number,
  otherPositions: PositionProps[]
): PositionProps | undefined => {
  if (Math.random() <= CHANCE_HEART_APPEAR) {
    return generateNewPosition(width, height, otherPositions);
  }
};

export const initMap = (
  width: number,
  height: number,
  startPosition: PositionProps,
  exitPosition: PositionProps,
  trapsPositions: PositionProps[],
  heartPosition?: PositionProps
): GameMap => {
  const cell: CellProps = {
    isTrap: false,
    isWentHere: false,
    isUser: false,
    isExit: false,
    isHeart: false,
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

          if (heartPosition && isSamePosition(currentPosition, heartPosition)) {
            return { ...cell, isHeart: true };
          }

          return cell;
        }
      ),
    })),
  };
};

export const canMove = (
  hasWon: boolean,
  hasLost: boolean,
  boardWidth: number,
  boardHeight: number,
  { width, height }: PositionProps
): boolean => {
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

export const filterOnPosition = (
  gameMap: GameMap,
  filter: (cell: CellProps) => boolean
): PositionProps | undefined => {
  let position: PositionProps | undefined;

  gameMap.lines.forEach((line, width) => {
    line.cells.forEach((cell, height) => {
      if (filter(cell)) {
        position = { width, height };
      }
    });
  });

  return position;
};

export const getHeartPosition = (gameMap: GameMap): PositionProps | undefined =>
  filterOnPosition(gameMap, (cell) => cell.isHeart);

export const getCurrentPosition = (gameMap: GameMap): PositionProps =>
  filterOnPosition(gameMap, (cell) => cell.isUser) || { width: -1, height: -1 };

export const removeHeartCell = (gameMap: GameMap) => {
  const heartPosition = getHeartPosition(gameMap);
  if (heartPosition) {
    const heartCell = getCell(gameMap, heartPosition);

    return updateCell(gameMap, heartPosition, { ...heartCell, isHeart: false });
  }
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
  let { gameMap, hasWon, hasLost, width, height } = board;
  if (canMove(hasWon, hasLost, width, height, newPosition)) {
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
      isHeart: false,
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
  heartPosition,
  name,
  difficulty,
}: BoardProps) => ({
  levelName: name,
  gameMap: initMap(
    boardWidth,
    boardHeight,
    startPosition,
    exitPosition,
    trapsPositions,
    heartPosition
  ),
  hasWon: false,
  hasLost: false,
  needRestart: false,
  width: boardWidth,
  height: boardHeight,
  trapsPositions,
  difficulty,
});
