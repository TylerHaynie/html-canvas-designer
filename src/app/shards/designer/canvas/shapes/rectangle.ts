import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';
import { Utils } from '../utils';
import { Scale } from '../models/scale';
import { Flip } from '../models/flip';
import { Drawable } from '../models/drawable';

export class Rectangle extends Drawable implements iDrawable {
    point: Point;
    size: Size;

    private context: CanvasRenderingContext2D;
    private utils = new Utils();

    constructor(context: CanvasRenderingContext2D, point: Point, size: Size) {
        super();
        this.context = context;
        this.point = point;
        this.size = size;
    }

    draw(): void {
        this.context.save();
        let offsetX = this.size.width / 2;
        let offsetY = this.size.height / 2;

        // centering on the rectangle
        this.context.translate(this.point.x + offsetX, this.point.y + offsetY);

        // applying any rotation
        this.context.rotate(this.utils.degreesToRadians(this.rotationDegrees));

        // applying scale
        this.context.scale(this.scale.x, this.scale.y);

        // applying any flips
        this.context.scale(this.flip.flipX ? -1 : 1, this.flip.flipY ? -1 : 1);
        this.drawRect(-offsetX, -offsetY);

        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.restore();
    }

    drawRect(offsetX: number, offsetY: number) {

        // testing flip
        // horizontal grad
        // let grd = this.context.createLinearGradient(0, 0, 0, 200);
        // let grd = this.context.createLinearGradient(0, 0, 200, 0);
        // grd.addColorStop(0, 'black');
        // grd.addColorStop(1, 'white');
        // this.context.fillStyle = grd;

        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.outlineColor;
        this.context.lineWidth = this.lineWidth;
        if (this.solid) {
            this.context.globalAlpha = this.fillAlpha;
            // top left
            this.context.fillRect(offsetX, offsetY, this.size.width, this.size.height);
            this.context.globalAlpha = 1.0;
        }

        if (this.drawOutline) {
            this.context.globalAlpha = this.borderAlpha;
            // top left
            this.context.strokeRect(-(this.size.width / 2), -(this.size.height / 2), this.size.width, this.size.height);
            this.context.globalAlpha = 1.0;
        }
    }

    pointWithinBounds(checkPoint: Point): boolean {

        // TODO: come back to this and use matrices

        // does not account for rotation
        let topLeft = this.getTopLeftPoint(this.point);
        let bottomRight = this.getBottomRight(this.point);

        if (checkPoint.x >= topLeft.x && checkPoint.x <= bottomRight.x) {
            if (checkPoint.y >= topLeft.y && checkPoint.y <= bottomRight.y) {
                return true;
            }
        }

        return false;
    }

    getTopLeftPoint(point: Point): Point {
        let lw = this.lineWidth / 2;

        // scale offset
        let offsetX = ((this.scale.x * this.size.width) - this.size.width) / 2;
        let offsetY = ((this.scale.y * this.size.height) - this.size.height) / 2;

        // added linewidth and scale
        return new Point(point.x - lw - offsetX, point.y - lw - offsetY);
    }

    getBottomRight(point: Point) {
        let lw = this.lineWidth / 2;

        // true bottom right point
        let br = new Point(point.x + this.size.width, point.y + this.size.height);

        // scale offset
        let offsetX = ((this.scale.x * this.size.width) - this.size.width) / 2;
        let offsetY = ((this.scale.y * this.size.height) - this.size.height) / 2;

        // added linewidth and scale
        return new Point(br.x + lw + offsetX, br.y + lw + offsetY);
    }
}
