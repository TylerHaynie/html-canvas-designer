import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';

export class Circle implements iDrawable {
    point: Point;
    radius: number;
    size: Size;
    color: string | CanvasGradient | CanvasPattern;
    outlineColor: string | CanvasGradient | CanvasPattern;

    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, point: Point, radius: number, size: Size,
        color: string | CanvasGradient | CanvasPattern = '#876539', outlineColor: string | CanvasGradient | CanvasPattern = '#469383') {
        this.context = context;
        this.point = point;
        this.radius = radius;
        this.size = size;
        this.color = color;
        this.outlineColor = color;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI);
        this.context.strokeStyle = this.outlineColor;
        this.context.fillStyle = this.color;
        this.context.stroke();
    }

    rotate(degrees: number) {

    }

    pointWithinBounds(p: Point) {

        return false;
    }
}
