import { Point } from './models/point';
import { SHIFT_DIRECTION } from './enums/shift-direction';
import { Scale } from './models/scale';
import { SCALE_DIRECTION } from './enums/scale-direction';
import { Drawable } from './models/drawable';

export class Utils {

    getMousePosition(context: CanvasRenderingContext2D, evt: MouseEvent): Point {
        // relationship bitmap vs. element for X
        // relationship bitmap vs. element for Y
        let rect = context.canvas.getBoundingClientRect(),
            scaleX = context.canvas.width / rect.width,
            scaleY = context.canvas.height / rect.height;

        // scale mouse coordinates after they have
        // been adjusted to be relative to the canvas
        let mx = (evt.clientX - rect.left) * scaleX;
        let my = (evt.clientY - rect.top) * scaleY;

        return new Point(Math.floor(mx), Math.floor(my));
    }

    getDistanceBetweenPoints(p1: Point, p2: Point): number {
        let xPow = Math.pow((p2.x - p1.x), 2);
        let yPow = Math.pow((p2.y - p1.y), 2);
        let distance = Math.sqrt(xPow + yPow);

        return distance;
    }

    precisionRound(number: number, precision: number) {
        let factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    getDistanceBetweenNumbers(n1: number, n2: number): number {
        return Math.abs(Math.max(n1, n2) - Math.min(n1, n2));
    }

    degreesToRadians(degrees: number) {
        return degrees * Math.PI / 180;
    }

    findHalf(x: number, y: number) {
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

    drawPointWithText(context: CanvasRenderingContext2D, x: number, y: number, size = 1, textEdge = 45) {
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

    shiftDrawableItem(array: Drawable[], item: Drawable, direction: SHIFT_DIRECTION) {
        if (array.includes(item)) {
            let shapeIndex = array.indexOf(item);

            switch (direction) {
                case SHIFT_DIRECTION.PUSH:
                    this.shiftArrayItem(array, shapeIndex, shapeIndex - 1 < 0 ? 0 : shapeIndex - 1);
                    break;
                case SHIFT_DIRECTION.PULL:
                    this.shiftArrayItem(array, shapeIndex, shapeIndex + 1 > array.length - 1 ? array.length - 1 : shapeIndex + 1);
                    break;
                case SHIFT_DIRECTION.TOP:
                    this.shiftArrayItem(array, shapeIndex, array.length - 1);
                    break;
                case SHIFT_DIRECTION.BOTTOM:
                    this.shiftArrayItem(array, shapeIndex, 0);
                    break;
            }
        }
    }

    shiftArrayItem(arr: Array<any>, fromIndex: number, toIndex: number) {
        let item = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, item);
    }

    applyScale(point: Point, step: number, direction: SCALE_DIRECTION): Scale {
        let scaleChange = new Scale(step / 100, step / 100);

        switch (direction) {
            case SCALE_DIRECTION.UP:
                return new Scale(point.x + scaleChange.x, point.y + scaleChange.y);
            case SCALE_DIRECTION.DOWN:
                return new Scale(point.x - scaleChange.x, point.y - scaleChange.y);
        }
    }
}
