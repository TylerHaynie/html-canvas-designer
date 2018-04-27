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
        // been adjusted to be relative to element
        let mx = (evt.clientX - rect.left) * scaleX;
        let my = (evt.clientY - rect.top) * scaleY;

        return new Point(mx, my);
    }

    getDistance(n1: number, n2: number): number {
        return Math.abs(Math.max(n1, n2) - Math.min(n1, n2));
    }

    findHalf(x, y) {
        return ((x + y) / 2);
    }

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

    getRandomPointOnCanvas(context: CanvasRenderingContext2D) {
        let rx = Math.floor((Math.random() * context.canvas.width) + 1);
        let ry = Math.floor((Math.random() * context.canvas.width) + 1);
        return new Point(rx, ry);
    }
}