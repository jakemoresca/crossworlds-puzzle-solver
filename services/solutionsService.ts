import { PuzzleBoard } from "../models/models";

let solutions: PuzzleBoard[] = [];

export function getAllSolutions() {
    return solutions;
}

export function addSolution(puzzleBoard: PuzzleBoard) {

    if(containsSolution(puzzleBoard))
        return;

    solutions = solutions.concat([puzzleBoard]);
}

export function deleteSolution(puzzleBoard: PuzzleBoard) {
    if(!containsSolution(puzzleBoard))
        return;

    solutions = solutions.filter(x => x.toString(x) != puzzleBoard.toString(puzzleBoard));
}

export function clearSolutions() {
    solutions = [];
}

export function containsSolution(puzzleBoard: PuzzleBoard): boolean {
    return solutions.some(x => x.toString(x) == puzzleBoard.toString(puzzleBoard));
}