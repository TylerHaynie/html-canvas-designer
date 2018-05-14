import { Line } from '../shapes/line';
import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';
import { Drawable } from '../models/drawable';
import { LineSegment } from '../models/line-segment';

export class Grid extends Drawable implements iDrawable {

    context: CanvasRenderingContext2D;
    point: Point;
    size: Size;

    spacing: number = 10;

    constructor(context: CanvasRenderingContext2D, point: Point, size: Size, spacing: number) {
        super();

        this.context = context;
        this.spacing = spacing;
        this.point = point;
        this.size = size;
    }

    draw() {
        let line = new Line(this.context);
        line.color = this.color;

        // verticle lines
        // start at 0.5 so the lines take up 1 whole pixel and not 2 halves
        for (let x = this.point.x + 0.5; x < this.size.width; x += this.spacing) {
            let segment = new LineSegment(new Point(x, 0));
            segment.addPoint(new Point(x, this.size.height));
            line.addSegment(segment);
        }

        // horizontal
        // start at 0.5 so the lines take up 1 whole pixel and not 2 half pixels
        for (let y = this.point.y + 0.5; y < this.size.height; y += this.spacing) {
            let segment = new LineSegment(new Point(0, y));
            segment.addPoint(new Point(this.size.width, y));
            line.addSegment(segment);
        }

        line.draw();
    }

    pointWithinBounds(point: Point) {
        let withinBounds: boolean = false;



        return withinBounds;
    }
}
