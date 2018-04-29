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

    private context: CanvasRenderingContext2D;
    private utils = new Utils();

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
        this.context.lineWidth = this.lineWidth;

        // // finding center
        // let cx = this.point.x + this.size.width / 2;
        // let cy = this.point.y - this.size.height / 2;

        // this.context.translate(cx, cy);
        // this.context.rotate((Math.PI / 180) * 25);  // rotate 25 degrees.


        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.outlineColor;

        if (this.solid) {
            this.context.globalAlpha = this.fillAlpha;
            this.context.fillRect(this.point.x, this.point.y, this.size.width, this.size.height);
            this.context.globalAlpha = 1.0;
        }

        if (this.drawOutline) {
            this.context.globalAlpha = this.borderAlpha;
            this.context.strokeRect(this.point.x, this.point.y, this.size.width, this.size.height);
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
