import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';
import { Drawable } from '../models/drawable';

export class Circle extends Drawable implements iDrawable {

    context: CanvasRenderingContext2D;
    point: Point;
    size: Size;

    radius: number;

    constructor(context: CanvasRenderingContext2D, point: Point, size: Size, radius: number) {
        super();

        this.context = context;
        this.point = point;
        this.size = size;
        this.radius = radius;
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

    pointWithinBounds(point: Point) {
        let withinBounds: boolean = false;

        

        return withinBounds;
    }
}
