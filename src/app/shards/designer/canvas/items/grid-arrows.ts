import { LineSegment, Line } from '../shapes/line-segment';
import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';

export class GridArrows implements iDrawable {
    context: CanvasRenderingContext2D;
    intersection: Point;
    color: string | CanvasGradient | CanvasPattern;
    width: number;
    height: number;
    lineGap: number;
    lineWidth: number;
    xText: string;
    yText: string;
    drawArrows: boolean;

    constructor(context: CanvasRenderingContext2D, intersection: Point, width: number, height: number, lineWidth: number = 1, drawArrows: boolean = false,
        lineGap: number = 0, xText: string = '', yText: string = '',
        color: string | CanvasGradient | CanvasPattern = '#bfd7ff') {

        this.context = context;
        this.intersection = intersection;
        this.color = color;
        this.width = width;
        this.height = height;
        this.lineGap = lineGap;
        this.lineWidth = lineWidth;
        this.xText = xText;
        this.yText = yText;
        this.drawArrows = drawArrows;
    }

    draw() {
        // this.canvasContext.strokeStyle = linecolor;

        let line = new Line(this.context, this.color, this.lineWidth);

        // horizontal line
        let x1 = new LineSegment(new Point(0, this.intersection.y));
        x1.addPoint(new Point(this.width / 2 - this.lineGap, this.intersection.y));
        line.addSegment(x1);
        // creating a gap
        let x2 = new LineSegment(new Point(this.width / 2 + this.lineGap, this.intersection.y));
        x2.addPoint(new Point(this.width, this.intersection.y));
        line.addSegment(x2);

        if (this.drawArrows) {
            // right arrow
            let ra = new LineSegment(new Point(this.width - 5, this.intersection.y - 5));
            ra.addPoint(new Point(this.width, this.intersection.y));
            ra.addPoint(new Point(this.width - 5, this.intersection.y + 5));
            line.addSegment(ra);
        }


        // verticle Line
        let y1 = new LineSegment(new Point(this.intersection.x, 0));
        y1.addPoint(new Point(this.intersection.x, this.height / 2 - this.lineGap));
        line.addSegment(y1);
        // creating a gap
        let y2 = new LineSegment(new Point(this.intersection.x, this.height / 2 + this.lineGap));
        y2.addPoint(new Point(this.intersection.x, this.height));
        line.addSegment(y2);

        if (this.drawArrows) {
            // down arrow
            let da = new LineSegment(new Point(this.intersection.x + 5, this.height - 5));
            da.addPoint(new Point(this.intersection.x, this.height));
            da.addPoint(new Point(this.intersection.x - 5, this.height - 5));
            line.addSegment(da);
        }

        // writing 'x' and 'y' in the gaps
        this.context.fillText(this.xText, this.width / 2 - 2.5, this.intersection.y + 2.5);
        this.context.fillText(this.yText, this.intersection.x - 2.5, this.height / 2 + 2.5);

        line.draw();
    }
}
