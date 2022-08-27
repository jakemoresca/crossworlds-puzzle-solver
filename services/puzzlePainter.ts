import { PuzzleBoard, PuzzleCoordinates } from "../models/models";

export function drawPuzzleBoard(board: PuzzleBoard, ctx: CanvasRenderingContext2D) {
    for (let y = 0; y < board.height; y++) {
        for (let x = 0; x < board.width; x++) {
            const boardData = board.boardDatas[y][x];

            if (boardData.drawn)
                continue;

            const linkedCoordinates = [boardData.coordinates].concat(boardData.shape?.linkedPuzzles ?? []);

            if (!boardData.shape && boardData.placeable) {
                board = drawBlock(linkedCoordinates, ctx, board, '#ffffff');
                drawCellGrid(boardData.coordinates, ctx, board);
            }
            else if (!boardData.placeable) {
                board = drawBlock(linkedCoordinates, ctx, board, 'rgb(81, 139, 143)');
                drawCellGrid(boardData.coordinates, ctx, board);
            }
            else {
                board = drawBlock(linkedCoordinates, ctx, board);
            }
        }
    }
}

export function clearBoard(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 500, 500);
}

function drawBlock(linkedCoordinates: PuzzleCoordinates[], ctx: CanvasRenderingContext2D, board: PuzzleBoard, color?: string) {
    const [sat, lightness] = [.6, .8];
    const hue = Math.random();

    const linkedColor = color ?? hslToRgb(hue, sat, lightness);

    linkedCoordinates.forEach(coordinates => {
        ctx.fillStyle = linkedColor;
        ctx.fillRect(coordinates.column * 50, coordinates.row * 50, 50, 50);

        drawCellBorder(coordinates, linkedCoordinates, ctx);

        board.boardDatas[coordinates.row][coordinates.column].drawn = true;
    });

    return board;
}

function drawCellBorder(coordinates: PuzzleCoordinates, linkedCoordinates: PuzzleCoordinates[],  ctx: CanvasRenderingContext2D) {
    //left
    if(!linkedCoordinates.some(x => x.row == coordinates.row && x.column == coordinates.column - 1)) {
        ctx.beginPath();
        ctx.moveTo(coordinates.column * 50, coordinates.row * 50);
        ctx.lineTo(coordinates.column * 50, (coordinates.row + 1) * 50);
        ctx.stroke();
    }

    //top
    if(!linkedCoordinates.some(x => x.row == coordinates.row - 1 && x.column == coordinates.column)) { 
        ctx.beginPath();
        ctx.moveTo(coordinates.column * 50, coordinates.row * 50);
        ctx.lineTo((coordinates.column + 1) * 50, coordinates.row * 50);
        ctx.stroke();
    }

    //right
    if(!linkedCoordinates.some(x => x.row == coordinates.row && x.column == coordinates.column + 1)) {
        ctx.beginPath();
        ctx.moveTo((coordinates.column + 1) * 50, coordinates.row * 50);
        ctx.lineTo((coordinates.column + 1) * 50, (coordinates.row + 1) * 50);
        ctx.stroke();
    }

    //down
    if(!linkedCoordinates.some(x => x.row == coordinates.row + 1 && x.column == coordinates.column)) {
        ctx.beginPath();
        ctx.moveTo(coordinates.column * 50, (coordinates.row + 1) * 50);
        ctx.lineTo((coordinates.column + 1) * 50, (coordinates.row + 1) * 50);
        ctx.stroke();
    }
}

function drawCellGrid(coordinates: PuzzleCoordinates, ctx: CanvasRenderingContext2D, board: PuzzleBoard) {
    const linkedColor = '#000000';

    ctx.fillStyle = linkedColor;
    ctx.strokeRect(coordinates.column * 50, coordinates.row * 50, 50, 50);

    return board;
}

function hslToRgb(h: number, s: number, l: number) {
    let r, g, b;
    if (s == 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return "#" + [r * 255, g * 255, b * 255].map(c => Math.floor(c).toString(16)).join('');
};