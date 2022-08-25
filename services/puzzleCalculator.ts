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
    let boardString = "\n";
    
    for(let y = 0; y < board.height; y++) {
        for(let x = 0; x < board.width; x++) {
            const boardData = board.boardDatas[y][x];
            boardString += `| ${boardData.placeable == false ? 'x' : boardData.shape?.type ?? '-'} |`;
        }

        boardString += "\n";
    }

    boardString += "\n";

    return boardString;
}

export function testCalculate(): PuzzleBoard {
    
    let boardDatas: BoardData[][] = [];

    for(let y = 0; y < 4; y++) {
        for(let x = 0; x < 5; x++) {
            const boardData: BoardData = { placeable: true, coordinates: { row: y, column: x }, toString: boardDataToString };
            
            if(!boardDatas[y])
                boardDatas[y] = [];

            boardDatas[y][x] = boardData;
        }
    }

    boardDatas[0][3].placeable = false;
    boardDatas[1][3].placeable = false;
    boardDatas[3][3].placeable = false;
    boardDatas[3][4].placeable = false;
    
    const board: PuzzleBoard = {
        width: 5,
        height: 4,
        boardDatas: boardDatas,
        toString: boardToString
    };
    
    console.log(printBoard(board));

    const currentCoordinates = board.boardDatas[0][0].coordinates;
    const calculatedBoard = calculatePuzzle(currentCoordinates, board);

    return calculatedBoard;

    //return printBoard(calculatedBoard);
}

export function calculatePuzzle(currentCoordinates: PuzzleCoordinates, board: PuzzleBoard): PuzzleBoard {
    var newBoard = {...board};

    const boardData = board.boardDatas[currentCoordinates.row][currentCoordinates.column];
    if(currentCoordinates.column == 0 && currentCoordinates.row == 0 && !boardData.placeable) {
        const nearestNeighbor = checkNearestNeighbor(currentCoordinates, newBoard);
        newBoard = calculatePuzzle(nearestNeighbor, newBoard);

        return newBoard;
    }

    for(let shapeCounter = 0; shapeCounter <= 6; shapeCounter++)
    {
        const currentShape = getNextShape(shapeCounter);
        const puzzleShapeService = puzzleShapeServiceFactory.getShapeService(currentShape);

        const placeableCoordinates = puzzleShapeService.getPlaceableCoordinates(currentCoordinates, newBoard);

        for(let x = 0; x < placeableCoordinates.length; x++)
        {
            var coordinates = [placeableCoordinates[x].coordinates].concat(placeableCoordinates[x].shape?.linkedPuzzles ?? []);

            if(coordinates.some(x => !checkIfPlaceable(x, newBoard))) {
                continue;
            }
            else {
                newBoard = placeShape(coordinates, currentShape, newBoard);

                console.log(`after placing:`)
                console.log(printBoard(newBoard));

                const nearestNeighbor = checkNearestNeighbor(placeableCoordinates[0].coordinates, newBoard);

                console.log(`nearest neighbor is: x: ${nearestNeighbor.column}, y: ${nearestNeighbor.row}`)

                if(nearestNeighbor.column == -1 && nearestNeighbor.row == -1) {
                    console.log(`returning... no changes needed.`);
                    newBoard.finished = true;
                    return newBoard;
                }

                const updatedBoard = calculatePuzzle(nearestNeighbor, newBoard);

                if(updatedBoard.toString(updatedBoard) == newBoard.toString(newBoard) && !updatedBoard.finished) {
                    console.log(`board was not changed.`)

                    console.log(`before:`)
                    console.log(printBoard(newBoard));

                    console.log(`after:`)
                    console.log(printBoard(updatedBoard));

                    newBoard = removeShape(coordinates, updatedBoard);
                }
                else {
                    console.log(`board was changed.`)
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
            
            if(checkIfPlaceable(currentCoordinates, board)) {
                return currentCoordinates;
            }
        }
    }

    return {row: -1, column: -1};
}

function checkIfPlaceable(coordinates: PuzzleCoordinates, board: PuzzleBoard): boolean {
    //console.log(`checking if placeable x: ${coordinates.column}, y: ${coordinates.row}`)

    if(coordinates.column < 0 || coordinates.column >= board.width || coordinates.row < 0 || coordinates.row >= board.height)
        return false;

    const boardData = board.boardDatas[coordinates.row][coordinates.column];
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
        const puzzleShape: PuzzleShape = { type: puzzleType, linkedPuzzles: coordinates }; //coordinates.filter(y => y.column != x.column && y.row != x.row) };
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