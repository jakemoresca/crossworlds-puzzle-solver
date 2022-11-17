import { BoardData, PuzzleType } from "../models/models";
import { getNextShape } from "./puzzleCalculator";
import { boardDataToString, createPuzzleBoard, getAllPuzzles, PuzzleData } from "./puzzleService";

test('Should return proper board data string with a shape', () => {
  const boardData: BoardData = {
    coordinates: { column: 0, row: 1 }, shape: { type: 0, linkedPuzzles: [] }, placeable: true
  }

  expect(boardDataToString(boardData)).toBe(`{x:0,y:1,s:0}`);
});

test('Should return proper board data string with a shape', () => {
  const boardData: BoardData = {
    coordinates: { column: 0, row: 1 }, placeable: true
  }

  expect(boardDataToString(boardData)).toBe(`{x:0,y:1,s:-}`);
});

test('Should return proper board data string from a puzzle data', () => {

  const puzzleData: PuzzleData = {
    name: "test",
    width: 4,
    height: 2,
    puzzleData: "1111\n1111"
  };

  const board = createPuzzleBoard(puzzleData);
  const boardString = board.toString(board);

  expect(board.height).toBe(2);
  expect(board.width).toBe(4);
  expect(boardString).toBe(`{x:0,y:0,s:-}{x:1,y:0,s:-}{x:2,y:0,s:-}{x:3,y:0,s:-}{x:0,y:1,s:-}{x:1,y:1,s:-}{x:2,y:1,s:-}{x:3,y:1,s:-}`)
});

test('Should get and return puzzle.json', async () => {
  const puzzles = await import("../puzzles/puzzles.json");
  
  expect(await getAllPuzzles()).toBe(puzzles.default);
})

test('Should get next shape in default order', () => {
  const shape1 = getNextShape(0, []);
  const shape2 = getNextShape(1, []);
  const shape3 = getNextShape(2, []);
  const shape4 = getNextShape(3, []);
  const shape5 = getNextShape(4, []);
  const shape6 = getNextShape(5, []);
  const shape7 = getNextShape(6, []);

  expect(shape1).toBe(PuzzleType.OShape);
  expect(shape2).toBe(PuzzleType.TShape);
  expect(shape3).toBe(PuzzleType.LShape);
  expect(shape4).toBe(PuzzleType.JShape);
  expect(shape5).toBe(PuzzleType.IShape);
  expect(shape6).toBe(PuzzleType.SShape);
  expect(shape7).toBe(PuzzleType.ZShape);
})
