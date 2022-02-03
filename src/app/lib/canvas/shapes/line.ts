import { Point } from '../models/point';
import { Size } from '../models/size';
import { Drawable } from '../models/drawable';
import { LineSegment } from '../models/line-segment';
import { Utils } from '../utils';

export class Line extends Drawable {
    segments: LineSegment[] = [];

    private utils = new Utils();

    constructor(context: CanvasRenderingContext2D) {
        super();

        this.context = context;
    }

    addSegment(segment: LineSegment) {
        this.segments.push(segment);
    }

    draw(): void {
        this.context.save();
        let center = this.centerPoint;
        this.preDraw(center.x, center.y);
        this.drawLine(-center.x, -center.y);

        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.restore();
    }

    private preDraw(offsetX: number, offsetY: number) {
        // centering on the marker
        this.context.translate(this.point.x + offsetX, this.point.y + offsetY);

        // applying rotation
        this.context.rotate(this.utils.degreesToRadians(this.rotationDegrees));

        // applying scale
        this.context.scale(this.scale.x, this.scale.y);

        // applying flips
        this.context.scale(this.flip.flipX ? -1 : 1, this.flip.flipY ? -1 : 1);
    }

    private drawLine(offsetX: number, offsetY: number) {

        this.context.beginPath();

        this.segments.forEach(segment => {
            this.context.moveTo(segment.startPoint.x, segment.startPoint.y);
            segment.points.forEach(point => {
                this.context.lineTo(point.x, point.y);
            });
        });

        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.color;
        this.context.globalAlpha = this.fillAlpha;
        this.context.stroke();
    }

    pointWithinBounds(point: Point) {
        let withinBounds: boolean = false;

        return withinBounds;
    }
}
