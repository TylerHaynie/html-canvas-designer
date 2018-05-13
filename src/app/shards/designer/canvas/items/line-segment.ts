import { Point } from '../models/point';
import { iDrawable } from '../interfaces/iDrawable';
import { Size } from '../models/size';

export class LineSegment {
    startPoint: Point;
    points: Point[];

    private context: CanvasRenderingContext2D;

    constructor(startPoint: Point) {
        this.startPoint = startPoint;
        this.points = [];
    }

    addPoint(point: Point) {
        this.points.push(point);
    }
}

export class Line {

    context: CanvasRenderingContext2D;
    segments: LineSegment[] = [];
    color: string | CanvasGradient | CanvasPattern;
    lineWidth: number = 1;

    constructor(context: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern) {
        this.context = context;
        this.color = color;
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
}
