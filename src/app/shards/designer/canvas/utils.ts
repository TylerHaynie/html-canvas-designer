import { Point } from './models/point';

export class Utils {

    getMousePosition(context: CanvasRenderingContext2D, evt: MouseEvent): Point {
        // abs. size of element
        // relationship bitmap vs. element for X
        // relationship bitmap vs. element for Y
        let rect = context.canvas.getBoundingClientRect(),
            scaleX = context.canvas.width / rect.width,
            scaleY = context.canvas.height / rect.height;

        // scale mouse coordinates after they have
        // been adjusted to be relative to the canvas
        let mx = (evt.clientX - rect.left) * scaleX;
        let my = (evt.clientY - rect.top) * scaleY;

        return new Point(mx, my);
    }

    getDistance(n1: number, n2: number): number {
        return Math.abs(Math.max(n1, n2) - Math.min(n1, n2));
    }

    degreesToRadians(degrees: number) {
        return degrees * Math.PI / 180;
    }

    findHalf(x, y) {
        return ((x + y) / 2);
    }

    getRandomHexColor(): string {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getRandomPointOnCanvas(context: CanvasRenderingContext2D) {
        let rx = Math.floor((Math.random() * context.canvas.width) + 1);
        let ry = Math.floor((Math.random() * context.canvas.width) + 1);
        return new Point(rx, ry);
    }

    shiftArrayItem(arr: Array<any>, fromIndex: number, toIndex: number) {
        let item = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, item);
    }

    drawPointWithText(context, x, y, size = 1, textEdge = 45) {
        context.textAlign = 'right';
        context.textBaseline = 'bottom';

        let tx = x - 3;
        let ty = y - 3;

        if (x - textEdge <= 0) {
            tx += textEdge + size;
        }

        if (y + textEdge < 0) {
            ty += textEdge;
        }

        context.fillText(`(${x}, ${y})`, tx, ty);
    }
}
