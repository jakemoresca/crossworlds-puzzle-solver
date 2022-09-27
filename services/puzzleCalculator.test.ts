import { calculatePuzzle } from "./puzzleCalculator";
import { createPuzzleBoard, PuzzleData } from "./puzzleService";

test('Should return proper board data string from a puzzle data', () => {

    const puzzleData: PuzzleData = {
        name: "test",
        width: 4,
        height: 2,
        puzzleData: "1111\n1111"
    };

    const board = createPuzzleBoard(puzzleData);

    const puzzleCoordinates = board.boardDatas[0][0].coordinates;
    const limit = {
        limits: {
            atk: undefined,
            hp: undefined,
            eva: undefined,
            acc: undefined,
            def: undefined,
            res: undefined,
            crit: undefined
        },
        order: ["atk", "hp", "eva", "acc", "def", "res", "crit"]
    };

    const solvedBoard = calculatePuzzle(puzzleCoordinates, board, limit);
    const solvedBoardString = solvedBoard.toString(solvedBoard);

    expect(solvedBoardString).toBe(`{x:0,y:0,s:0}{x:1,y:0,s:0}{x:2,y:0,s:0}{x:3,y:0,s:0}{x:0,y:1,s:0}{x:1,y:1,s:0}{x:2,y:1,s:0}{x:3,y:1,s:0}`);
});

test('Should return proper board data string from a puzzle data with different priority', () => {

    const puzzleData: PuzzleData = {
        name: "test",
        width: 4,
        height: 2,
        puzzleData: "1111\n1111"
    };

    const board = createPuzzleBoard(puzzleData);

    const puzzleCoordinates = board.boardDatas[0][0].coordinates;
    const limit = {
        limits: {
            atk: undefined,
            hp: undefined,
            eva: undefined,
            acc: undefined,
            def: undefined,
            res: undefined,
            crit: undefined
        },
        order: ["def", "atk", "hp", "eva", "acc", "res", "crit"]
    };

    const solvedBoard = calculatePuzzle(puzzleCoordinates, board, limit);
    const solvedBoardString = solvedBoard.toString(solvedBoard);

    expect(solvedBoardString).toBe(`{x:0,y:0,s:4}{x:1,y:0,s:4}{x:2,y:0,s:4}{x:3,y:0,s:4}{x:0,y:1,s:4}{x:1,y:1,s:4}{x:2,y:1,s:4}{x:3,y:1,s:4}`);
});

test('Should return proper board data string from a puzzle data with unplaceable cell', () => {

    const puzzleData: PuzzleData = {
        name: "test",
        width: 4,
        height: 4,
        puzzleData: "0110\n1100\n0110\n1100"
    };

    const board = createPuzzleBoard(puzzleData);

    const puzzleCoordinates = board.boardDatas[0][0].coordinates;
    const limit = {
        limits: {
            atk: undefined,
            hp: undefined,
            eva: undefined,
            acc: undefined,
            def: undefined,
            res: undefined,
            crit: undefined
        },
        order: ["atk", "hp", "eva", "acc", "def", "res", "crit"]
    };

    const solvedBoard = calculatePuzzle(puzzleCoordinates, board, limit);
    const solvedBoardString = solvedBoard.toString(solvedBoard);

    expect(solvedBoardString).toBe(`{x:0,y:0,s:-}{x:1,y:0,s:5}{x:2,y:0,s:5}{x:3,y:0,s:-}{x:0,y:1,s:5}{x:1,y:1,s:5}{x:2,y:1,s:-}{x:3,y:1,s:-}{x:0,y:2,s:-}{x:1,y:2,s:5}{x:2,y:2,s:5}{x:3,y:2,s:-}{x:0,y:3,s:5}{x:1,y:3,s:5}{x:2,y:3,s:-}{x:3,y:3,s:-}`);
});