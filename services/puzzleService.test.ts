import { BoardData } from "../models/models";
import { boardDataToString, createPuzzleBoard, PuzzleData } from "./puzzleService";

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