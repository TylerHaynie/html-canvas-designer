import { Size, Point } from './models';

export class CanvasTools {
    canvasContext: CanvasRenderingContext2D;

    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;
    }

    //#region layout
    makeGridLines(cellSize = 10, color = '#333') {
        // verticle lines
        // start at 0.5 so the lines take up 1 whole pixel and not 2 halves
        for (let x = 0.5; x < this.canvasContext.canvas.width; x += cellSize) {
            this.canvasContext.moveTo(x, 0);
            this.canvasContext.lineTo(x, this.canvasContext.canvas.width);
        }

        // horizontal
        // start at 0.5 so the lines take up 1 whole pixel and not 2 halves
        for (let y = 0.5; y < this.canvasContext.canvas.height; y += cellSize) {
            this.canvasContext.moveTo(0, y);
            this.canvasContext.lineTo(this.canvasContext.canvas.height, y);
        }

        this.canvasContext.strokeStyle = color;
        this.canvasContext.stroke();
    }
    //#endregion

    getDistance(n1: number, n2: number): number {
        return Math.abs(Math.max(n1, n2) - Math.min(n1, n2));
    }

    findHalf(x, y) {
        return ((x + y) / 2);
    }

    //#region Shapes
    drawRectangleWithSize(point: Point, size: Size, solid: boolean = false, color: string | CanvasGradient | CanvasPattern = this.getRandomColor()): void {
        this.drawRectangle(point, <Point>{ x: point.x + size.width, y: point.y + size.height }, solid, color);
    }

    drawPoint(point: Point, size: number = 1, color: string | CanvasGradient | CanvasPattern = this.getRandomColor()): void {
        this.drawRectangleWithSize(point, { height: size, width: size }, true, color);
    }

    drawRectangle(p1: Point, p2: Point, solid: boolean = true, color: string | CanvasGradient | CanvasPattern = this.getRandomColor()): void {

        this.canvasContext.moveTo(p1.x, p1.y);
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(p2.x, p2.y);
        if (solid) {
            this.canvasContext.fillStyle = color;
            this.canvasContext.fillRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
        }
        else {
            this.canvasContext.strokeRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
        }

        this.canvasContext.stroke();
    }

    drawLines(points: Point[]) {
        if (points.length % 2 !== 0) {
            console.log('I need an even number of points to draw.');
        }

        for (let i = 0; i < points.length; i++) {
            this.canvasContext.moveTo(points[i].x, points[i].y);
            this.canvasContext.lineTo(points[i + 1].x, points[i + 1].y);
            i++;
        }

        this.canvasContext.stroke();
    }

    //#endregion

    drawGrid(cellSize = 10, color = '#252525', drawArrows = true, makeSubGrid = true) {
        // verticle lines
        // start at 0.5 so the lines take up 1 whole pixel and not 2 halves
        let lines: Point[] = [];
        for (let x = 0.5; x < this.canvasContext.canvas.width; x += cellSize) {
            lines.push(<Point>{ x: x, y: 0 });
            lines.push(<Point>{ x: x, y: this.canvasContext.canvas.width });
        }

        // horizontal
        // start at 0.5 so the lines take up 1 whole pixel and not 2 half pixels
        for (let y = 0.5; y < this.canvasContext.canvas.height; y += cellSize) {
            lines.push(<Point>{ x: 0, y: y });
            lines.push(<Point>{ x: this.canvasContext.canvas.height, y: y });
        }

        this.canvasContext.strokeStyle = color;
        this.drawLines(lines);

        if (drawArrows) {
            let h = this.canvasContext.canvas.height / cellSize;
            this.gridArrows(60, 40, this.canvasContext.canvas.width, this.canvasContext.canvas.height, 15);
        }
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
        this.drawPoint({ x, y }, size);
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

