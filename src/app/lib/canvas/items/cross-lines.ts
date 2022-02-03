import { Line } from '../shapes/line';
import { Point } from '../models/point';
import { Size } from '../models/size';
import { Drawable } from '../models/drawable';
import { LineSegment } from '../models/line-segment';

export class CrossLines extends Drawable{
    lineGap: number = 0;
    xText: string = '';
    yText: string = '';
    drawArrows: boolean;

    constructor(context: CanvasRenderingContext2D, point: Point, size: Size, drawArrows: boolean = false) {
        super();

        this.context = context;
        this.point = point;
        this.size = size;
        this.drawArrows = drawArrows;
    }

    draw() {
        let line = new Line(this.context);
        line.color = this.color;

        // horizontal line
        let x1 = new LineSegment(new Point(0, this.point.y));
        x1.addPoint(new Point(this.size.width / 2 - this.lineGap, this.point.y));
        line.addSegment(x1);

        // creating a gap
        let x2 = new LineSegment(new Point(this.size.width / 2 + this.lineGap, this.point.y));
        x2.addPoint(new Point(this.size.width, this.point.y));
        line.addSegment(x2);

        if (this.drawArrows) {
            // right arrow
            let ra = new LineSegment(new Point(this.size.width - 5, this.point.y - 5));
            ra.addPoint(new Point(this.size.width, this.point.y));
            ra.addPoint(new Point(this.size.width - 5, this.point.y + 5));
            line.addSegment(ra);
        }

        // verticle Line
        let y1 = new LineSegment(new Point(this.point.x, 0));
        y1.addPoint(new Point(this.point.x, this.size.height / 2 - this.lineGap));
        line.addSegment(y1);

        // creating a gap
        let y2 = new LineSegment(new Point(this.point.x, this.size.height / 2 + this.lineGap));
        y2.addPoint(new Point(this.point.x, this.size.height));
        line.addSegment(y2);

        if (this.drawArrows) {
            // down arrow
            let da = new LineSegment(new Point(this.point.x + 5, this.size.height - 5));
            da.addPoint(new Point(this.point.x, this.size.height));
            da.addPoint(new Point(this.point.x - 5, this.size.height - 5));
            line.addSegment(da);
        }

        // writing 'x' and 'y' in the gaps
        this.context.fillText(this.xText, this.size.width / 2 - 2.5, this.point.y + 2.5);
        this.context.fillText(this.yText, this.point.x - 2.5, this.size.height / 2 + 2.5);

        line.draw();
    }

    pointWithinBounds(point: Point) {
        let withinBounds: boolean = false;

        return withinBounds;
    }
}
