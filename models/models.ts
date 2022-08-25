export interface PuzzleBoard {
    width: number;
    height: number;
    boardDatas: BoardData[][];

    finished?: boolean;
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
    OShape = 0,
    TShape = 1,
    LShape = 2,
    JShape = 3,
    IShape = 4,    
    SShape = 5,
    ZShape = 6
}

export interface PuzzleCoordinates {
    row: number;
    column: number;
}