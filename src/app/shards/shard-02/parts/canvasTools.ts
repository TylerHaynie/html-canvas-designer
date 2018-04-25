import { Point, Size } from './models';

export class CanvasTools {
    canvasContext: CanvasRenderingContext2D;

    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;
    }

    getDistance(n1: number, n2: number): number {
        return Math.abs(Math.max(n1, n2) - Math.min(n1, n2));
    }

    findMidPoint(p1: Point, p2: Point): Point {
        return <Point>{
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
        };
    }

    findHalf(x, y) {
        return ((x + y) / 2);
    }

    //#region Shapes
    drawRectangle(p1: Point, p2: Point, color: string | CanvasGradient | CanvasPattern = this.getRandomColor()): void {
        let size = <Size>{
            height: this.getDistance(p1.y, p2.y),
            width: this.getDistance(p1.x, p2.x),
        };

        let midPoint = this.findMidPoint(p1, p2);

        this.drawRectangleWithSize(midPoint, size, color);
    }

    drawRectangleWithSize(point: Point, size: Size, color: string | CanvasGradient | CanvasPattern = this.getRandomColor()): void {
        this.canvasContext.beginPath();

        this.canvasContext.rect(point.x, point.y, size.width, size.height);
        this.canvasContext.strokeStyle = color;
        this.canvasContext.fillStyle = color;
        this.canvasContext.fill();
        this.canvasContext.stroke();
    }

    drawPoint(point: Point, size: number = 1, color: string | CanvasGradient | CanvasPattern = this.getRandomColor()): void {
        this.drawRectangleWithSize(point, { height: size, width: size }, color);
    }
    //#endregion

    makeGrid(cellSize = 10, color = '#888', drawArrows = true, makeSubGrid = true) {
        // verticle lines
        // start at 0.5 so the lines take up 1 whole pixel and not 2 halves
        for (let x = 0.5; x < this.canvasContext.canvas.width; x += cellSize) {
            this.canvasContext.moveTo(x, 0);
            this.canvasContext.lineTo(x, this.canvasContext.canvas.width);
        }

        // horizontal
        // start at 0.5 so the lines take up 1 whole pixel and not 2 half pixels
        for (let y = 0.5; y < this.canvasContext.canvas.height; y += cellSize) {
            this.canvasContext.moveTo(0, y);
            this.canvasContext.lineTo(this.canvasContext.canvas.height, y);
        }

        this.canvasContext.strokeStyle = color;
        this.canvasContext.stroke();

        if (drawArrows) {
            let h = this.canvasContext.canvas.height / cellSize;
            this.gridArrows(60, 40, this.canvasContext.canvas.width, this.canvasContext.canvas.height, 15);
        }

        // drawing random point
        let px = Math.floor(Math.random() * this.canvasContext.canvas.width) | 0;
        let py = Math.floor(Math.random() * this.canvasContext.canvas.height) | 0;
        this.drawPointWithText(px, py, 3);
    }

    gridArrows(x, y, width, height, gapSize, linecolor = '#cee1ff', xText = 'x', yText = 'y') {
        this.canvasContext.strokeStyle = linecolor;

        // horizontal line
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(0, y);
        this.canvasContext.lineTo(width / 2 - gapSize, y);
        this.canvasContext.moveTo(width / 2 + gapSize, y);
        this.canvasContext.lineTo(width, y);

        // right arrow
        this.canvasContext.moveTo(width - 5, y - 5);
        this.canvasContext.lineTo(width, y);
        this.canvasContext.lineTo(width - 5, y + 5);

        // verticle arrow
        this.canvasContext.moveTo(x, 0);
        this.canvasContext.lineTo(x, height / 2 - gapSize);
        this.canvasContext.moveTo(x, height / 2 + gapSize);
        this.canvasContext.lineTo(x, height);

        // down arrow
        this.canvasContext.moveTo(x + 5, height - 5);
        this.canvasContext.lineTo(x, height);
        this.canvasContext.lineTo(x - 5, height - 5);

        this.canvasContext.stroke();

        // writing 'x' and 'y' in the gaps
        this.canvasContext.fillText(xText, width / 2 - 2.5, y + 2.5);
        this.canvasContext.fillText(yText, x - 2.5, height / 2 + 2.5);
    }

    drawPointWithText(x, y, size = 1, textEdge = 45) {
        // drawing maximim point
        this.canvasContext.fillRect(x, y, size, size);
        this.canvasContext.textAlign = 'right';
        this.canvasContext.textBaseline = 'bottom';

        let tx = x - 3;
        let ty = y - 3;

        if (x - textEdge <= 0) {
            tx += textEdge + size;
        }

        if (y + textEdge < 0) {
            ty += textEdge;
        }

        this.canvasContext.fillText(`(${x}, ${y})`, tx, ty);
    }

    //#region Random
    getRandomColor(): string {
        let r = 255 * Math.random() | 0,
            g = 255 * Math.random() | 0,
            b = 255 * Math.random() | 0;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    getRandomShadeOfGray(): string {
        let val = 50 * Math.random() | 0;
        return 'rgb(' + val + ',' + val + ',' + val + ')';
    }

    drawRandomPoint() {
        let point = <Point>{
            x: Math.floor((Math.random() * this.canvasContext.canvas.width) + 1),
            y: Math.floor((Math.random() * this.canvasContext.canvas.width) + 1)
        };

        this.drawPoint(point);
    }

    //#endregion
}

