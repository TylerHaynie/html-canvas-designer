import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';
import { Drawable } from '../models/drawable';
import { Utils } from '../utils';
import { Scale } from '../models/scale';

export class Circle extends Drawable implements iDrawable {

    context: CanvasRenderingContext2D;
    point: Point;

    radius: number;
    private utils: Utils = new Utils();

    constructor(context: CanvasRenderingContext2D, point: Point, radius: number) {
        super();

        this.context = context;
        this.point = point;
        this.radius = radius;
    }

    draw(): void {
        this.context.save();

        let center = this.centerPoint;
        this.preDraw(center.x, center.y);
        this.drawCircle(-center.x, -center.y);

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

    private drawCircle(offsetX: number, offsetY: number) {

        this.context.beginPath();
        this.context.arc(offsetX, offsetY, this.radius, 0, 2 * Math.PI);

        if (this.isSolid) {
            this.context.fillStyle = this.color;
            this.context.globalAlpha = this.fillAlpha;
            this.context.fill();
            this.context.globalAlpha = 1.0;
        }

        if (this.drawOutline) {
            this.context.lineWidth = this.lineWidth;
            this.context.strokeStyle = this.outlineColor;
            this.context.globalAlpha = this.borderAlpha;
            this.context.stroke();
            this.context.globalAlpha = 1.0;
        }
    }

    pointWithinBounds(point: Point) {
        let withinBounds: boolean = false;

        let circle1 = { radius: 1, x: point.x, y: point.y };
        let circle2 = { radius: this.radius, x: this.point.x, y: this.point.y };

        let dx = circle1.x - circle2.x;
        let dy = circle1.y - circle2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circle1.radius + circle2.radius) {
            withinBounds = true;
        }

        return withinBounds;
    }
}
