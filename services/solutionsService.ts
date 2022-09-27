import { PuzzleBoard } from "../models/models";

let solutions: PuzzleBoard[];
export class SolutionService {

    constructor() {
        solutions = [];
    }

    getAllSolutions() {
        return solutions;
    }

    addSolution(puzzleBoard: PuzzleBoard) {
        if (this.containsSolution(puzzleBoard))
            return;

        solutions = solutions.concat([puzzleBoard]);
    }

    deleteSolution(puzzleBoard: PuzzleBoard) {
        if (!this.containsSolution(puzzleBoard))
            return;

        solutions = solutions.filter(x => x.toString(x) != puzzleBoard.toString(puzzleBoard));
    }

    clearSolutions() {
        solutions = [];
    }

    containsSolution(puzzleBoard: PuzzleBoard): boolean {
        return solutions.some(x => x.toString(x) == puzzleBoard.toString(puzzleBoard));
    }
}