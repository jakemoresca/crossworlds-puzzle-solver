export interface PuzzleBoard {
    width: number;
    height: number;
    boardDatas: BoardData[][];

    toString: (board: PuzzleBoard) => string;
}

export interface BoardData {
    shape?: PuzzleShape;
    placeable: boolean;
    coordinates: PuzzleCoordinates;
    
    drawn?: boolean;

    toString: (boardData: BoardData) => string;
}

export interface PuzzleShape {
    type: PuzzleType;
    linkedPuzzles: PuzzleCoordinates[];
}

export enum PuzzleType {
    TShape = 0,
    LShape = 1,
    JShape = 2,
    IShape = 3,
    OShape = 4,
    SShape = 5,
    ZShape = 6
}

export interface PuzzleCoordinates {
    row: number;
    column: number;
}