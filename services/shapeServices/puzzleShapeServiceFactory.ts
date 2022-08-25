import { BoardData, PuzzleBoard, PuzzleCoordinates, PuzzleType } from "../../models/models";

export class PuzzleShapeServiceFactory {
    private shapeFactories: { [key: number]: IPuzzleShapeService } = {};

    getShapeService(puzzleType: PuzzleType)
    {
        const puzzleShapeService = this.shapeFactories[puzzleType];

        if(puzzleShapeService)
            return puzzleShapeService;

        throw `No puzzle service registered for ${puzzleType}`;
    }
}

export interface IPuzzleShapeService 
{
    getPlaceableCoordinates: (coordinates: PuzzleCoordinates, board: PuzzleBoard) => BoardData[]
}