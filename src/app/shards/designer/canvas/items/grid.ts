import { LineSegment, Line } from '../items/line-segment';
import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';

export class Grid implements iDrawable {
    context: CanvasRenderingContext2D;
    spacing: number = 10;
    color: string | CanvasGradient | CanvasPattern;
    lineWidth: number;
    point: Point;
    size: Size;

    constructor(context: CanvasRenderingContext2D, point: Point, size: Size, spacing: number, color: string | CanvasGradient | CanvasPattern = '#252525', lineWidth: number = 1) {
        this.context = context;
        this.spacing = spacing;
        this.color = color;
        this.point = point;
        this.size = size;
    }

    draw() {
        let line = new Line(this.context, this.color, this.lineWidth);

        // verticle lines
        // start at 0.5 so the lines take up 1 whole pixel and not 2 halves
        for (let x = this.point.x + 0.5; x < this.size.width; x += this.spacing) {
            let segment = new LineSegment(new Point(x, 0));
            segment.addPoint(new Point(x, this.size.width));
            line.addSegment(segment);
        }

        // horizontal
        // start at 0.5 so the lines take up 1 whole pixel and not 2 half pixels
        for (let y = this.point.y + 0.5; y < this.size.height; y += this.spacing) {
            let segment = new LineSegment(new Point(0, y));
            segment.addPoint(new Point(this.size.height, y));
            line.addSegment(segment);
        }

        line.draw();
    }

    pointWithinBounds(p: Point) {

        return false;
    }
}
