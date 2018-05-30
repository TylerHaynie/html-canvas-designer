import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';
import { Utils } from '../utils';
import { Scale } from '../models/scale';
import { Flip } from '../models/flip';
import { Drawable } from '../models/drawable';

export class Rectangle extends Drawable implements iDrawable {
    context: CanvasRenderingContext2D;
    point: Point;
    size: Size;

    private utils = new Utils();

    constructor(context: CanvasRenderingContext2D, point: Point, size: Size) {
        super();
        this.context = context;
        this.point = point;
        this.size = size;
    }

    public get getTopLeftPoint(): Point {
        let lw = this.lineWidth / 2;

        // scale offset
        let offsetX = ((this.scale.x * this.size.width) - this.size.width) / 2;
        let offsetY = ((this.scale.y * this.size.height) - this.size.height) / 2;

        // added linewidth and scale
        return new Point(this.point.x - lw - offsetX, this.point.y - lw - offsetY);
    }

    public get getBottomRight() {
        let lw = this.lineWidth / 2;

        // true bottom right point
        let br = new Point(this.point.x + this.size.width, this.point.y + this.size.height);

        // scale offset
        let offsetX = ((this.scale.x * this.size.width) - this.size.width) / 2;
        let offsetY = ((this.scale.y * this.size.height) - this.size.height) / 2;

        // added linewidth and scale
        return new Point(br.x + lw + offsetX, br.y + lw + offsetY);
    }

    draw(): void {
        this.context.save();
        let center = this.centerPoint;
        this.preDraw(center.x, center.y);
        this.drawRect(-center.x, -center.y);

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

    private drawRect(offsetX: number, offsetY: number) {

        // testing flip
        // horizontal gradient
        // let grd = this.context.createLinearGradient(0, 0, 0, 200);
        // let grd = this.context.createLinearGradient(0, 0, 200, 0);
        // grd.addColorStop(0, 'black');
        // grd.addColorStop(1, 'white');
        // this.context.fillStyle = grd;

        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.outlineColor;
        this.context.lineWidth = this.lineWidth;

        if (this.isSolid) {
            this.context.globalAlpha = this.fillAlpha;
            this.context.fillRect(offsetX, offsetY, this.size.width, this.size.height);
            this.context.globalAlpha = 1.0;
        }

        if (this.drawOutline) {
            this.context.globalAlpha = this.borderAlpha;
            this.context.strokeRect(-(this.size.width / 2), -(this.size.height / 2), this.size.width, this.size.height);
            this.context.globalAlpha = 1.0;
        }
    }

    pointWithinBounds(checkPoint: Point): boolean {

        // TODO: come back to this and use matrices

        // does not account for rotation
        let topLeft = this.getTopLeftPoint;
        let bottomRight = this.getBottomRight;

        if (checkPoint.x >= topLeft.x && checkPoint.x <= bottomRight.x) {
            if (checkPoint.y >= topLeft.y && checkPoint.y <= bottomRight.y) {
                return true;
            }
        }

        return false;
    }

}
