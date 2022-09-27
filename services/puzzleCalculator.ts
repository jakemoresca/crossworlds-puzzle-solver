import { BoardData, PuzzleBoard, PuzzleCoordinates, PuzzleLimit, PuzzleShape, PuzzleType } from "../models/models";
import { PuzzleShapeServiceFactory } from "./shapeServices/puzzleShapeServiceFactory";
import { SolutionService } from "./solutionsService";

const puzzleShapeServiceFactory = new PuzzleShapeServiceFactory();
const solutionsService = new SolutionService();

function printBoard(board: PuzzleBoard): string {
    let boardString = "\n";

    for (let y = 0; y < board.height; y++) {
        for (let x = 0; x < board.width; x++) {
            const boardData = board.boardDatas[y][x];
            boardString += `| ${boardData.placeable == false ? 'x' : boardData.shape?.type ?? '-'} |`;
        }

        boardString += "\n";
    }

    boardString += "\n";

    return boardString;
}

export function calculatePuzzle(currentCoordinates: PuzzleCoordinates, board: PuzzleBoard, puzzleLimit?: PuzzleLimit): PuzzleBoard {
    let newBoard = { ...board };
    let newPuzzleLimit: PuzzleLimit = { ...puzzleLimit, limits: { ...puzzleLimit?.limits }, order: [...puzzleLimit?.order ?? []] }

    const boardData = board.boardDatas[currentCoordinates.row][currentCoordinates.column];
    if (currentCoordinates.column == 0 && currentCoordinates.row == 0 && !boardData.placeable) {
        const nearestNeighbor = checkNearestNeighbor(currentCoordinates, newBoard);
        newBoard = calculatePuzzle(nearestNeighbor, newBoard, newPuzzleLimit);

        return newBoard;
    }

    for (let shapeCounter = 0; shapeCounter <= 6; shapeCounter++) {
        const currentShape = getNextShape(shapeCounter, newPuzzleLimit.order);
        const limit = newPuzzleLimit ? getLimit(newPuzzleLimit, currentShape) : 100;

        console.log(`limit for ${currentShape} is: ${limit}`)

        if (limit == 0) {
            continue;
        }

        const puzzleShapeService = puzzleShapeServiceFactory.getShapeService(currentShape);
        const placeableCoordinates = puzzleShapeService.getPlaceableCoordinates(currentCoordinates, newBoard);

        newBoard = calculatePlaceableCoordinates(placeableCoordinates, newBoard, currentShape, newPuzzleLimit);

        if (newBoard.finished)
            break;
    }

    return newBoard;
}

function calculatePlaceableCoordinates(placeableCoordinates: BoardData[], board: PuzzleBoard, currentShape: PuzzleType, puzzleLimit: PuzzleLimit) {
    let newBoard = { ...board };

    for (let currentPlaceableCoordinates of placeableCoordinates) {
        const coordinates = [currentPlaceableCoordinates.coordinates].concat(currentPlaceableCoordinates.shape?.linkedPuzzles ?? []);

        if (coordinates.some(x => !checkIfPlaceable(x, newBoard))) {
            continue;
        }
        else {
            newBoard = placeShape(coordinates, currentShape, newBoard);
            setLimit(currentShape, -1, puzzleLimit);

            console.log(`after placing:`)
            console.log(printBoard(newBoard));

            const nearestNeighbor = checkNearestNeighbor(placeableCoordinates[0].coordinates, newBoard);

            console.log(`nearest neighbor is: x: ${nearestNeighbor.column}, y: ${nearestNeighbor.row}`)

            if (nearestNeighbor.column == -1 && nearestNeighbor.row == -1) {
                console.log(`returning... no changes needed.`);
                newBoard.finished = true;
                return newBoard;
            }

            const updatedBoard = calculatePuzzle(nearestNeighbor, newBoard, puzzleLimit);

            if (updatedBoard.toString(updatedBoard) == newBoard.toString(newBoard) && !updatedBoard.finished) {
                console.log(`board was not changed.`)

                console.log(`before:`)
                console.log(printBoard(newBoard));

                console.log(`after:`)
                console.log(printBoard(updatedBoard));

                newBoard = removeShape(coordinates, updatedBoard);
                setLimit(currentShape, 1, puzzleLimit);
            }
            else {
                console.log(`board was changed.`)
                return updatedBoard;
            }
        }
    }

    return newBoard;
}

function checkNearestNeighbor(currentCoordinates: PuzzleCoordinates, board: PuzzleBoard): PuzzleCoordinates {
    for (let y = currentCoordinates.row; y < board.height; y++) {
        const startingColumn = y == currentCoordinates.row ? currentCoordinates.column : 0;

        for (let x = startingColumn; x < board.width; x++) {
            const currentCoordinates: PuzzleCoordinates = { row: y, column: x };

            if (checkIfPlaceable(currentCoordinates, board)) {
                return currentCoordinates;
            }
        }
    }

    return { row: -1, column: -1 };
}

function checkIfPlaceable(coordinates: PuzzleCoordinates, board: PuzzleBoard): boolean {
    if (coordinates.column < 0 || coordinates.column >= board.width || coordinates.row < 0 || coordinates.row >= board.height)
        return false;

    const boardData = board.boardDatas[coordinates.row][coordinates.column];
    return boardData.placeable && !boardData.shape;
}

function getNextShape(counter: number, order: string[]) {
    const shapeCounters: { [key: number]: PuzzleType } = {
        0: PuzzleType.OShape, //atk
        1: PuzzleType.TShape, //hp
        2: PuzzleType.LShape, //eva
        3: PuzzleType.JShape, //acc
        4: PuzzleType.IShape, //def
        5: PuzzleType.SShape, //res
        6: PuzzleType.ZShape  //crit
    };

    if (order.length > 0) {
        const puzzleString = order[counter];

        switch (puzzleString) {
            case "atk":
                return shapeCounters[0];
            case "hp":
                return shapeCounters[1];
            case "eva":
                return shapeCounters[2];
            case "acc":
                return shapeCounters[3];
            case "def":
                return shapeCounters[4];
            case "res":
                return shapeCounters[5];
            case "crit":
                return shapeCounters[6];
        }
    }

    return shapeCounters[counter];
}

function getLimit(puzzleLimit: PuzzleLimit, puzzleType: PuzzleType) {
    switch (puzzleType) {
        case PuzzleType.OShape: //atk
            return puzzleLimit.limits['atk'] ?? 100;
        case PuzzleType.TShape: //hp
            return puzzleLimit.limits['hp'] ?? 100;
        case PuzzleType.LShape: //eva
            return puzzleLimit.limits['eva'] ?? 100;
        case PuzzleType.JShape: //acc
            return puzzleLimit.limits['acc'] ?? 100;
        case PuzzleType.IShape: //def
            return puzzleLimit.limits['def'] ?? 100;
        case PuzzleType.SShape: //res
            return puzzleLimit.limits['res'] ?? 100;
        case PuzzleType.ZShape: //crit
            return puzzleLimit.limits['crit'] ?? 100;
    }
}

function setLimit(puzzleType: PuzzleType, amount: number, puzzleLimit?: PuzzleLimit): PuzzleLimit | undefined {
    if (!puzzleLimit)
        return puzzleLimit;

    let limitName = "";

    switch (puzzleType) {
        case PuzzleType.OShape: //atk
            limitName = "atk";
            break;
        case PuzzleType.TShape: //hp
            limitName = "hp";
            break;
        case PuzzleType.LShape: //eva
            limitName = "eva";
            break;
        case PuzzleType.JShape: //acc
            limitName = "acc";
            break;
        case PuzzleType.IShape: //def
            limitName = "def";
            break;
        case PuzzleType.SShape: //res
            limitName = "res";
            break;
        case PuzzleType.ZShape: //crit
            limitName = "crit";
            break;
    }

    puzzleLimit.limits[limitName] = puzzleLimit.limits[limitName] ? (puzzleLimit.limits[limitName] ?? 0) + amount : undefined;

    return puzzleLimit;
}

function placeShape(coordinates: PuzzleCoordinates[], puzzleType: PuzzleType, board: PuzzleBoard) {
    const newBoard = { ...board };

    coordinates.forEach(x => {
        const puzzleShape: PuzzleShape = { type: puzzleType, linkedPuzzles: coordinates };
        newBoard.boardDatas[x.row][x.column].shape = puzzleShape;
    });

    return newBoard;
}

function removeShape(coordinates: PuzzleCoordinates[], board: PuzzleBoard) {
    const newBoard = { ...board };

    coordinates.forEach(x => {
        newBoard.boardDatas[x.row][x.column].shape = undefined
    });

    return newBoard;
}