import { PuzzleBoard, PuzzleCoordinates } from "../models/models";

export function drawPuzzleBoard(board: PuzzleBoard, ctx: CanvasRenderingContext2D) {
    for (let y = 0; y < board.height; y++) {
        for (let x = 0; x < board.width; x++) {
            const boardData = board.boardDatas[y][x];

            if (boardData.drawn)
                continue;

            const linkedCoordinates = [boardData.coordinates].concat(boardData.shape?.linkedPuzzles ?? []);

            board = drawBlock(linkedCoordinates, ctx, board);
        }
    }
}

function drawBlock(linkedCoordinates: PuzzleCoordinates[], ctx: CanvasRenderingContext2D, board: PuzzleBoard) {
    const [sat, lightness] = [.6, .8];
    const hue = Math.random();

    const linkedColor = hslToRgb(hue, sat, lightness);

    if (linkedCoordinates.length == 1) {
        ctx.fillStyle = '#808080';
        ctx.fillRect(linkedCoordinates[0].column * 50, linkedCoordinates[0].row * 50, 50, 50);
        board.boardDatas[linkedCoordinates[0].row][linkedCoordinates[0].column].drawn = true;
    }
    else {
        linkedCoordinates.forEach(coordinates => {
            ctx.fillStyle = linkedColor;
            ctx.fillRect(coordinates.column * 50, coordinates.row * 50, 50, 50);

            board.boardDatas[coordinates.row][coordinates.column].drawn = true;
        });
    }

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