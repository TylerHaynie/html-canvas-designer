import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';

export class Rectangle implements iDrawable {
    point: Point;
    size: Size;
    outlineColor: string | CanvasGradient | CanvasPattern;
    color: string | CanvasGradient | CanvasPattern;
    solid: boolean;
    lineWidth: number;

    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, point: Point, size: Size,
        color: string | CanvasGradient | CanvasPattern = '#79abfc', solid: boolean = true, lineWidth: number = 1,
        outlineColor?: string | CanvasGradient | CanvasPattern) {
        this.context = context;
        this.point = point;
        this.outlineColor = outlineColor;
        this.color = color;
        this.size = size;
        this.solid = solid;
        this.lineWidth = lineWidth;
    }

    draw(): void {
        this.context.lineWidth = this.lineWidth;

        // // finding center
        let cx = this.point.x + this.size.width / 2;
        let cy = this.point.y - this.size.height / 2;

        // this.context.translate(cx, cy);
        // this.context.rotate((Math.PI / 180) * 25);  // rotate 25 degrees.


        if (this.solid) {
            this.context.fillStyle = this.color;
            this.context.strokeStyle = this.outlineColor;

            if (this.outlineColor) {
                this.context.fillRect(this.point.x, this.point.y, this.size.width, this.size.height);
                this.context.strokeRect(this.point.x, this.point.y, this.size.width, this.size.height);
            }
            else {
                this.context.fillRect(this.point.x, this.point.y, this.size.width, this.size.height);
            }
        }
        else {
            this.context.strokeStyle = this.color;
            this.context.strokeRect(this.point.x, this.point.y, this.size.width, this.size.height);
        }

        // this.context.translate(0, 0);
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
