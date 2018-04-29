import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';
import { Utils } from '../utils';

export class Rectangle implements iDrawable {
    point: Point;
    size: Size;
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

        this.outlineColor = outlineColor || this.utils.getRandomHexColor();
        this.color = color || this.utils.getRandomHexColor();
        this.solid = solid || true;
        this.lineWidth = lineWidth || 1;
        this.fillAlpha = fillAlpha || 1;
        this.borderAlpha = borderAlpha || 1;
        this.drawOutline = drawOutline || true;
    }

    draw(): void {

        let offsetx = this.size.width / 2;
        let offsetY = this.size.height / 2;

        this.rotate(offsetx, offsetY);
    }

    rotate(offsetX, offsetY){
        this.context.save();

        // centering on the rectangle
        this.context.translate(this.point.x + offsetX, this.point.y + offsetY);
        this.context.rotate(this.utils.degreesToRadians(this.rotationDegrees));

        this.drawRect(-offsetX, -offsetY);

        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.restore();
    }

    drawRect(offsetX, offsetY) {
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
        let topLeft = this.point;
        let bottomRight = new Point(this.point.x + this.size.width, this.point.y + this.size.height);

        if ((checkPoint.x >= topLeft.x) && (checkPoint.x <= bottomRight.x)) {
            if (checkPoint.y >= topLeft.y && checkPoint.y <= bottomRight.y) {
                return true;
            }
        }

        return false;
    }
}
