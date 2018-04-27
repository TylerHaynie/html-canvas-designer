import { LineSegment, Line } from '../shapes/line-segment';
import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';

export class Grid implements iDrawable {
    context: CanvasRenderingContext2D;
    spacing: number = 10;
    color: string | CanvasGradient | CanvasPattern;
    lineWidth: number;

    constructor(context: CanvasRenderingContext2D, spacing: number, color: string | CanvasGradient | CanvasPattern = '#252525', lineWidth: number = 1) {
        this.context = context;
        this.spacing = spacing;
        this.color = color;
    }

    draw() {
        let line = new Line(this.context, this.color, this.lineWidth);

        // verticle lines
        // start at 0.5 so the lines take up 1 whole pixel and not 2 halves
        for (let x = 0.5; x < this.context.canvas.width; x += this.spacing) {
            let segment = new LineSegment(new Point(x, 0));
            segment.addPoint(new Point(x, this.context.canvas.width));
            line.addSegment(segment);
        }

        // horizontal
        // start at 0.5 so the lines take up 1 whole pixel and not 2 half pixels
        for (let y = 0.5; y < this.context.canvas.height; y += this.spacing) {
            let segment = new LineSegment(new Point(0, y));
            segment.addPoint(new Point(this.context.canvas.height, y));
            line.addSegment(segment);
        }

        line.draw();
    }
}
