import { BoardData, PuzzleBoard, PuzzleCoordinates, PuzzleShape, PuzzleType } from "../models/models";
import { PuzzleShapeServiceFactory } from "./shapeServices/puzzleShapeServiceFactory";

const puzzleShapeServiceFactory = new PuzzleShapeServiceFactory();

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

function printBoard(board: PuzzleBoard): string {
    let boardString = "";
    
    for(let y = 0; y < board.height; y++) {
        for(let x = 0; x < board.width; x++) {
            const boardData = board.boardDatas[y][x];
            boardString += `| ${boardData.shape ?? '-'} |`;
        }

        boardString += "\n";
    }

    return boardString;
}

export function testCalculate() {
    
    let boardDatas: BoardData[][] = [];

    for(let w = 0; w < 2; w++) {
        for(let h = 0; h < 2; h++) {
            const boardData: BoardData = { placeable: true, coordinates: { row: w, column: h }, toString: boardDataToString };
            boardDatas[w][h] = boardData;
        }
    }
    
    const board: PuzzleBoard = {
        width: 2,
        height: 2,
        boardDatas: boardDatas,
        toString: boardToString
    };

    const currentCoordinates = board.boardDatas[0][0].coordinates;
    const calculatedBoard = calculatePuzzle(currentCoordinates, board);

    console.log(printBoard(calculatedBoard));
}

export function calculatePuzzle(currentCoordinates: PuzzleCoordinates, board: PuzzleBoard): PuzzleBoard {
    var newBoard = {...board};

    for(let shapeCounter = 0; shapeCounter <= 6; shapeCounter++)
    {
        const currentShape = getNextShape(shapeCounter);
        const puzzleShapeService = puzzleShapeServiceFactory.getShapeService(currentShape);

        const placeableCoordinates = puzzleShapeService.getPlaceableCoordinates(currentCoordinates, newBoard);

        for(let x = 0; x <= placeableCoordinates.length; x++)
        {
            var coordinates = [placeableCoordinates[0].coordinates].concat(placeableCoordinates[0].shape?.linkedPuzzles ?? []);

            if(coordinates.some(x => !checkIfPlaceable(x, newBoard))) {
                continue;
            }
            else {
                newBoard = placeShape(coordinates, currentShape, newBoard);

                const nearestNeighbor = checkNearestNeighbor(placeableCoordinates[0].coordinates, newBoard);

                if(nearestNeighbor.column == -1 && nearestNeighbor.row == -1) {
                    return newBoard;
                }

                const updatedBoard = calculatePuzzle(nearestNeighbor, newBoard);

                if(updatedBoard.toString(updatedBoard) == newBoard.toString(newBoard)) {
                    newBoard = removeShape(coordinates, updatedBoard);
                }
                else {
                    return updatedBoard;
                }
            }
        }
    }

    return newBoard;
}

function checkNearestNeighbor(currentCoordinates: PuzzleCoordinates, board: PuzzleBoard): PuzzleCoordinates {
    for (let y = currentCoordinates.row; y < board.height; y++) {
        const startingColumn = y == currentCoordinates.row ? currentCoordinates.column : 0;

        for (let x = startingColumn; x < board.width; x++) {
            const currentCoordinates: PuzzleCoordinates = {row: y, column: x};
            
            if(checkIfPlaceable(currentCoordinates, board))
                return currentCoordinates;
        }
    }

    return {row: -1, column: -1};
}

function checkIfPlaceable(coordinates: PuzzleCoordinates, board: PuzzleBoard): boolean {
    if(coordinates.column < 0 || coordinates.column >= board.width || coordinates.row < 0 || coordinates.row >= board.height)
        return false;

    const boardData = board.boardDatas[coordinates.column][coordinates.row];
    return boardData.placeable && !boardData.shape;
}

function getNextShape(counter: number)
{
    const shapeCounters: { [key: number]: PuzzleType } = {
        0: PuzzleType.OShape, 1: PuzzleType.TShape, 
        2: PuzzleType.LShape, 3: PuzzleType.JShape, 
        4: PuzzleType.IShape, 5: PuzzleType.SShape, 
        6: PuzzleType.ZShape
    };

    return shapeCounters[counter];
}

function placeShape(coordinates: PuzzleCoordinates[], puzzleType: PuzzleType, board: PuzzleBoard) {
    const newBoard = {...board};

    coordinates.forEach(x => {
        const puzzleShape: PuzzleShape = { type: puzzleType, linkedPuzzles: coordinates.filter(y => y.column != x.column && y.row != x.row) };
        newBoard.boardDatas[x.row][x.column].shape = puzzleShape;
    });

    return newBoard;
}

function removeShape(coordinates: PuzzleCoordinates[], board: PuzzleBoard) {
    const newBoard = {...board};

    coordinates.forEach(x => {
        newBoard.boardDatas[x.row][x.column].shape = undefined
    });

    return newBoard;
}