import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';

export class Circle implements iDrawable {
    point: Point;
    radius: number;
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, point: Point, radius: number) {
        this.context = context;
        this.point = point;
        this.radius = radius;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
    }
}
