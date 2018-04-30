import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';
import { Utils } from '../utils';
import { Scale } from '../models/scale';
import { Flip } from '../models/flip';

export class Rectangle implements iDrawable {
    point: Point;
    size: Size;
    scale: Scale;
    flip: Flip;
    outlineColor: string | CanvasGradient | CanvasPattern;
    color: string | CanvasGradient | CanvasPattern;
    solid: boolean;
    lineWidth: number;
    fillAlpha: number;
    borderAlpha: number;
    drawOutline: boolean;
    rotationDegrees: number = 0;

    private context: CanvasRenderingContext2D;
    private utils = new Utils();
    private centerPoint: Point;

    constructor(context: CanvasRenderingContext2D, point: Point, size: Size,
        color?: string | CanvasGradient | CanvasPattern, outlineColor?: string | CanvasGradient | CanvasPattern,
        solid?: boolean, fillAlpha?: number, lineWidth?: number, drawOutline?: boolean, borderAlpha?: number) {
        this.context = context;
        this.point = point;
        this.size = size;
        this.flip = new Flip(false, false);

        this.outlineColor = outlineColor || this.utils.getRandomHexColor();
        this.color = color || this.utils.getRandomHexColor();
        this.solid = solid || true;
        this.lineWidth = lineWidth || 1;
        this.fillAlpha = fillAlpha || 1;
        this.borderAlpha = borderAlpha || 1;
        this.drawOutline = drawOutline || true;
        this.scale = new Scale(1, 1);
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
        // let cx = (this.getTopLeftPoint(this.point).x + this.getBottomRight(this.point).x) / 2; // center of square coordinates
        // let cy = (this.getTopLeftPoint(this.point).y + this.getBottomRight(this.point).y) / 2; // center of square coordinates
        // let x = this.getTopLeftPoint(this.point).x; // coordinates of a corner point of the square
        // let y = this.getTopLeftPoint(this.point).y; // coordinates of a corner point of the square
        // let theta = this.rotationDegrees; // is the angle of rotation

        // // translate point to origin
        // let tempX = x - cx;
        // let tempY = y - cy;

        // // now apply rotation
        // let rotatedX = tempX * Math.cos(theta) - tempY * Math.sin(theta);
        // let rotatedY = tempX * Math.sin(theta) + tempY * Math.cos(theta);

        // // translate back
        // x = rotatedX + cx;
        // y = rotatedY + cy;

        // does not account for rotation
        let topLeft = this.getTopLeftPoint(this.point);
        let bottomRight = this.getBottomRight(this.point);

        if (checkPoint.x >= topLeft.x &&
            checkPoint.x <= bottomRight.x) {

            if (checkPoint.y >= topLeft.y &&
                checkPoint.y <= bottomRight.y) {

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
        return new Point(point.x - lw - offsetX, point.y + lw + offsetY);
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
