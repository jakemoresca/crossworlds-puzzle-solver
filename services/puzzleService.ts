import { BoardData, PuzzleBoard } from "../models/models";

export async function getAllPuzzles() {
    const puzzles = await import("../puzzles/puzzles.json");
    return puzzles.default as PuzzleData[];
}

export function createPuzzleBoard(puzzleData: PuzzleData): PuzzleBoard {
    let boardDatas: BoardData[][] = [];

    const puzzleDataRows = puzzleData.puzzleData.split('\n')

    for(let y = 0; y < puzzleData.height; y++) {
        const currentPuzzleData = puzzleDataRows[y];

        for(let x = 0; x < puzzleData.width; x++) {
            const currentPuzzleDataCell = currentPuzzleData[x];
            const boardData: BoardData = { placeable: currentPuzzleDataCell == "1", coordinates: { row: y, column: x }, toString: boardDataToString };
            
            if(!boardDatas[y])
                boardDatas[y] = [];

            boardDatas[y][x] = boardData;
        }
    }

    const board: PuzzleBoard = {
        width: puzzleData.width,
        height: puzzleData.height,
        boardDatas: boardDatas,
        toString: boardToString
    };

    return board;
}

function boardToString(board: PuzzleBoard): string {
    let boardString = "";
    
    for(let y = 0; y < board.height; y++) {
        for(let x = 0; x < board.width; x++) {
            const boardData = board.boardDatas[y][x];
            boardString += boardData.toString(boardData);
        }
    }

    return boardString;
}

function boardDataToString(boardData: BoardData): string {
    return `{x:${boardData.coordinates.column},y:${boardData.coordinates.row},s:${boardData.shape ?? '-'}}`;
}

export interface PuzzleData {
    name: string;
    width: number;
    height: number;
    puzzleData: string;
}