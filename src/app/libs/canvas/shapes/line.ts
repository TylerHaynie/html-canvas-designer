import { Point } from '../models/point';
import { iDrawable } from '../interfaces/iDrawable';
import { Size } from '../models/size';
import { Drawable } from '../models/drawable';
import { LineSegment } from '../models/line-segment';

export class Line extends Drawable implements iDrawable {
    context: CanvasRenderingContext2D;
    point: Point;

    segments: LineSegment[] = [];

    constructor(context: CanvasRenderingContext2D) {
        super();

        this.context = context;
    }

    addSegment(segment: LineSegment) {
        this.segments.push(segment);
    }

    draw() {
        this.context.beginPath();

        this.segments.forEach(segment => {
            this.context.moveTo(segment.startPoint.x, segment.startPoint.y);
            segment.points.forEach(point => {
                this.context.lineTo(point.x, point.y);
            });
        });


        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.color;
        this.context.stroke();
    }

    pointWithinBounds(point: Point) {
        let withinBounds: boolean = false;

        return withinBounds;
    }
}
