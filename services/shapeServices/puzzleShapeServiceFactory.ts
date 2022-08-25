import { BoardData, PuzzleBoard, PuzzleCoordinates, PuzzleShape, PuzzleType } from "../../models/models";

export class PuzzleShapeServiceFactory {
    private shapeFactories: IPuzzleShapeService[] = [new OShapeService(), new TShapeService(), new LShapeService(), new IShapeService(), 
        new JShapeService(), new SShapeService(), new ZShapeService()]

    getShapeService(puzzleType: PuzzleType) {
        const puzzleShapeService = this.shapeFactories.find(x => x.puzzleType() == puzzleType);

        if (puzzleShapeService)
            return puzzleShapeService;

        throw `No puzzle service registered for ${puzzleType}`;
    }
}

export interface IPuzzleShapeService {
    puzzleType: () => PuzzleType;
    getPlaceableCoordinates: (coordinates: PuzzleCoordinates, board: PuzzleBoard) => BoardData[]
}

export class OShapeService implements IPuzzleShapeService {
    puzzleType() {
        return PuzzleType.OShape;
    }

    getPlaceableCoordinates(coordinates: PuzzleCoordinates, board: PuzzleBoard) {
        const coordinates1: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 1 };
        const coordinates2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column }
        const coordinates3: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column + 1 }

        const placeableCoordinates: PuzzleCoordinates[] = [coordinates, coordinates1, coordinates2, coordinates3];
        const puzzleShape: PuzzleShape = { type: PuzzleType.OShape, linkedPuzzles: placeableCoordinates };

        const boardData: BoardData = { shape: puzzleShape, placeable: true, coordinates: coordinates };

        return [boardData];
    }
}

export class TShapeService implements IPuzzleShapeService {
    puzzleType() {
        return PuzzleType.TShape;
    }

    getPlaceableCoordinates(coordinates: PuzzleCoordinates, board: PuzzleBoard) {
        // -- - --
        //    |
        const coordinates1_1: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 1 };
        const coordinates1_2: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 2 }
        const coordinates1_3: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column + 1 }
        const placeableCoordinates1: PuzzleCoordinates[] = [coordinates, coordinates1_1, coordinates1_2, coordinates1_3];
        const puzzleShape1: PuzzleShape = { type: PuzzleType.TShape, linkedPuzzles: placeableCoordinates1 };
        const boardData1: BoardData = { shape: puzzleShape1, placeable: true, coordinates: coordinates };

        // |
        // | --
        // |
        const coordinates2_1: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column };
        const coordinates2_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column + 1 }
        const coordinates2_3: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column }
        const placeableCoordinates2: PuzzleCoordinates[] = [coordinates, coordinates2_1, coordinates2_2, coordinates2_3];
        const puzzleShape2: PuzzleShape = { type: PuzzleType.TShape, linkedPuzzles: placeableCoordinates2 };
        const boardData2: BoardData = { shape: puzzleShape2, placeable: true, coordinates: coordinates };

        //    |
        // -- | 
        //    |
        const coordinates3_1: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column - 1 };
        const coordinates3_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column }
        const coordinates3_3: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column }
        const placeableCoordinates3: PuzzleCoordinates[] = [coordinates, coordinates3_1, coordinates3_2, coordinates3_3];
        const puzzleShape3: PuzzleShape = { type: PuzzleType.TShape, linkedPuzzles: placeableCoordinates3 };
        const boardData3: BoardData = { shape: puzzleShape3, placeable: true, coordinates: coordinates };

        //    |
        // -- - --
        const coordinates4_1: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column -1 };
        const coordinates4_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column }
        const coordinates4_3: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column + 1 }
        const placeableCoordinates4: PuzzleCoordinates[] = [coordinates, coordinates4_1, coordinates4_2, coordinates4_3];
        const puzzleShape4: PuzzleShape = { type: PuzzleType.TShape, linkedPuzzles: placeableCoordinates4 };
        const boardData4: BoardData = { shape: puzzleShape4, placeable: true, coordinates: coordinates };

        return [boardData1, boardData2, boardData3, boardData4];
    }
}

export class LShapeService implements IPuzzleShapeService {
    puzzleType() {
        return PuzzleType.LShape;
    }

    getPlaceableCoordinates(coordinates: PuzzleCoordinates, board: PuzzleBoard) {
        // |
        // |
        // |__
        const coordinates1_1: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column };
        const coordinates1_2: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column }
        const coordinates1_3: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column + 1 }
        const placeableCoordinates1: PuzzleCoordinates[] = [coordinates, coordinates1_1, coordinates1_2, coordinates1_3];
        const puzzleShape1: PuzzleShape = { type: PuzzleType.LShape, linkedPuzzles: placeableCoordinates1 };
        const boardData1: BoardData = { shape: puzzleShape1, placeable: true, coordinates: coordinates };

        //        |
        // -- -- -- 
        const coordinates2_1: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column - 2 };
        const coordinates2_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column - 1 }
        const coordinates2_3: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column }
        const placeableCoordinates2: PuzzleCoordinates[] = [coordinates, coordinates2_1, coordinates2_2, coordinates2_3];
        const puzzleShape2: PuzzleShape = { type: PuzzleType.LShape, linkedPuzzles: placeableCoordinates2 };
        const boardData2: BoardData = { shape: puzzleShape2, placeable: true, coordinates: coordinates };

        // -- |
        //    | 
        //    |
        const coordinates3_1: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 1 };
        const coordinates3_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column + 1 }
        const coordinates3_3: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column + 1 }
        const placeableCoordinates3: PuzzleCoordinates[] = [coordinates, coordinates3_1, coordinates3_2, coordinates3_3];
        const puzzleShape3: PuzzleShape = { type: PuzzleType.LShape, linkedPuzzles: placeableCoordinates3 };
        const boardData3: BoardData = { shape: puzzleShape3, placeable: true, coordinates: coordinates };

        //  | -- --
        //  |
        const coordinates4_1: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 1 };
        const coordinates4_2: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 2}
        const coordinates4_3: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column }
        const placeableCoordinates4: PuzzleCoordinates[] = [coordinates, coordinates4_1, coordinates4_2, coordinates4_3];
        const puzzleShape4: PuzzleShape = { type: PuzzleType.LShape, linkedPuzzles: placeableCoordinates4 };
        const boardData4: BoardData = { shape: puzzleShape4, placeable: true, coordinates: coordinates };

        return [boardData1, boardData2, boardData3, boardData4];
    }
}

export class JShapeService implements IPuzzleShapeService {
    puzzleType() {
        return PuzzleType.JShape;
    }

    getPlaceableCoordinates(coordinates: PuzzleCoordinates, board: PuzzleBoard) {
        //   |
        //   |
        // __|
        const coordinates1_1: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column };
        const coordinates1_2: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column }
        const coordinates1_3: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column - 1 }
        const placeableCoordinates1: PuzzleCoordinates[] = [coordinates, coordinates1_1, coordinates1_2, coordinates1_3];
        const puzzleShape1: PuzzleShape = { type: PuzzleType.JShape, linkedPuzzles: placeableCoordinates1 };
        const boardData1: BoardData = { shape: puzzleShape1, placeable: true, coordinates: coordinates };

        // |
        // -- -- -- 
        const coordinates2_1: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column };
        const coordinates2_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column + 1 }
        const coordinates2_3: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column + 2 }
        const placeableCoordinates2: PuzzleCoordinates[] = [coordinates, coordinates2_1, coordinates2_2, coordinates2_3];
        const puzzleShape2: PuzzleShape = { type: PuzzleType.JShape, linkedPuzzles: placeableCoordinates2 };
        const boardData2: BoardData = { shape: puzzleShape2, placeable: true, coordinates: coordinates };

        // |--
        // | 
        // |
        const coordinates3_1: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 1 };
        const coordinates3_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column }
        const coordinates3_3: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column }
        const placeableCoordinates3: PuzzleCoordinates[] = [coordinates, coordinates3_1, coordinates3_2, coordinates3_3];
        const puzzleShape3: PuzzleShape = { type: PuzzleType.JShape, linkedPuzzles: placeableCoordinates3 };
        const boardData3: BoardData = { shape: puzzleShape3, placeable: true, coordinates: coordinates };

        //  -- -- |
        //        |
        const coordinates4_1: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 1 };
        const coordinates4_2: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 2}
        const coordinates4_3: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column + 2 }
        const placeableCoordinates4: PuzzleCoordinates[] = [coordinates, coordinates4_1, coordinates4_2, coordinates4_3];
        const puzzleShape4: PuzzleShape = { type: PuzzleType.JShape, linkedPuzzles: placeableCoordinates4 };
        const boardData4: BoardData = { shape: puzzleShape4, placeable: true, coordinates: coordinates };

        return [boardData1, boardData2, boardData3, boardData4];
    }
}

export class IShapeService implements IPuzzleShapeService {
    puzzleType() {
        return PuzzleType.IShape;
    }

    getPlaceableCoordinates(coordinates: PuzzleCoordinates, board: PuzzleBoard) {
        // |
        const coordinates1_1: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column };
        const coordinates1_2: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column }
        const coordinates1_3: PuzzleCoordinates = { row: coordinates.row + 3, column: coordinates.column }
        const placeableCoordinates1: PuzzleCoordinates[] = [coordinates, coordinates1_1, coordinates1_2, coordinates1_3];
        const puzzleShape1: PuzzleShape = { type: PuzzleType.IShape, linkedPuzzles: placeableCoordinates1 };
        const boardData1: BoardData = { shape: puzzleShape1, placeable: true, coordinates: coordinates };

        // --
        const coordinates2_1: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 1 };
        const coordinates2_2: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 2 }
        const coordinates2_3: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 3 }
        const placeableCoordinates2: PuzzleCoordinates[] = [coordinates, coordinates2_1, coordinates2_2, coordinates2_3];
        const puzzleShape2: PuzzleShape = { type: PuzzleType.IShape, linkedPuzzles: placeableCoordinates2 };
        const boardData2: BoardData = { shape: puzzleShape2, placeable: true, coordinates: coordinates };

        return [boardData1, boardData2];
    }
}

export class SShapeService implements IPuzzleShapeService {
    puzzleType() {
        return PuzzleType.SShape;
    }

    getPlaceableCoordinates(coordinates: PuzzleCoordinates, board: PuzzleBoard) {
        //     | --
        //  __ |
        const coordinates1_1: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 1 };
        const coordinates1_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column - 1 }
        const coordinates1_3: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column }
        const placeableCoordinates1: PuzzleCoordinates[] = [coordinates, coordinates1_1, coordinates1_2, coordinates1_3];
        const puzzleShape1: PuzzleShape = { type: PuzzleType.SShape, linkedPuzzles: placeableCoordinates1 };
        const boardData1: BoardData = { shape: puzzleShape1, placeable: true, coordinates: coordinates };

        // |
        // -- |
        //    |
        const coordinates2_1: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column };
        const coordinates2_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column + 1 }
        const coordinates2_3: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column + 1 }
        const placeableCoordinates2: PuzzleCoordinates[] = [coordinates, coordinates2_1, coordinates2_2, coordinates2_3];
        const puzzleShape2: PuzzleShape = { type: PuzzleType.SShape, linkedPuzzles: placeableCoordinates2 };
        const boardData2: BoardData = { shape: puzzleShape2, placeable: true, coordinates: coordinates };

        return [boardData1, boardData2];
    }
}

export class ZShapeService implements IPuzzleShapeService {
    puzzleType() {
        return PuzzleType.ZShape;
    }

    getPlaceableCoordinates(coordinates: PuzzleCoordinates, board: PuzzleBoard) {
        //  -- | 
        //     | __
        const coordinates1_1: PuzzleCoordinates = { row: coordinates.row, column: coordinates.column + 1 };
        const coordinates1_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column - 1 }
        const coordinates1_3: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column }
        const placeableCoordinates1: PuzzleCoordinates[] = [coordinates, coordinates1_1, coordinates1_2, coordinates1_3];
        const puzzleShape1: PuzzleShape = { type: PuzzleType.ZShape, linkedPuzzles: placeableCoordinates1 };
        const boardData1: BoardData = { shape: puzzleShape1, placeable: true, coordinates: coordinates };

        //     |
        //   --
        //  | 
        const coordinates2_1: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column - 1 };
        const coordinates2_2: PuzzleCoordinates = { row: coordinates.row + 1, column: coordinates.column }
        const coordinates2_3: PuzzleCoordinates = { row: coordinates.row + 2, column: coordinates.column - 1 }
        const placeableCoordinates2: PuzzleCoordinates[] = [coordinates, coordinates2_1, coordinates2_2, coordinates2_3];
        const puzzleShape2: PuzzleShape = { type: PuzzleType.ZShape, linkedPuzzles: placeableCoordinates2 };
        const boardData2: BoardData = { shape: puzzleShape2, placeable: true, coordinates: coordinates };

        return [boardData1, boardData2];
    }
}