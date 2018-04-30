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

        this.drawRect(-offsetX, -offsetY);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.restore();
    }

    drawRect(offsetX: number, offsetY: number) {
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
        let topLeft = this.getTopLeftPoint();
        let bottomRight = this.getBottomRight();


        // let scaledTL = // TODO: scale top left point
        // let scaledBR = // TODO: scale bottom right point

        if (checkPoint.x >= topLeft.x &&
            checkPoint.x <= bottomRight.x) {

            if (checkPoint.y >= topLeft.y &&
                checkPoint.y <= bottomRight.y) {

                return true;
            }
        }

        return false;
    }

    getTopLeftPoint(): Point {
        let lw = this.lineWidth / 2;

        // scale offset
        let offsetX = ((this.scale.x * this.size.width) - this.size.width) / 2;
        let offsetY = ((this.scale.y * this.size.height) - this.size.height) / 2;

        // added linewidth and scale
        return new Point(this.point.x - lw - offsetX, this.point.y + lw + offsetY);
    }

    getBottomRight() {
        let lw = this.lineWidth / 2;

        // true bottom right point
        let br = new Point(this.point.x + this.size.width, this.point.y + this.size.height);

        // scale offset
        let offsetX = ((this.scale.x * this.size.width) - this.size.width) / 2;
        let offsetY = ((this.scale.y * this.size.height) - this.size.height) / 2;

        // added linewidth and scale
        return new Point(br.x + lw + offsetX, br.y + lw + offsetY);
    }
}
