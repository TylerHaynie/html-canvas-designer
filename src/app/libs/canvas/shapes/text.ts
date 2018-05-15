import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Drawable } from '../models/drawable';
import { Size } from '../models/size';
import { Utils } from '../utils';

export class Text extends Drawable implements iDrawable {

    context: CanvasRenderingContext2D;
    point: Point;
    bounds: Size;

    text: string;
    fontSize: number = 16;
    fontFamily: string = 'Arial';
    alignment: string = 'center';
    baseLine: string = 'middle';

    private utils: Utils = new Utils();

    constructor(context: CanvasRenderingContext2D, point: Point, text: string) {
        super();

        this.context = context;
        this.text = text;
        this.point = point;
    }

    public get getTopLeftPoint(): Point {
        let lw = this.lineWidth / 2;

        // scale offset
        let offsetX = ((this.scale.x * this.textWidth) - this.textWidth) / 2;
        let offsetY = ((this.scale.y * this.textHeight) - this.textHeight) / 2;

        // added linewidth and scale
        return new Point(this.point.x - lw - offsetX, this.point.y - lw - offsetY);
    }

    public get getBottomRight() {
        let lw = this.lineWidth / 2;

        // true bottom right point
        let br = new Point(this.point.x + this.textWidth, this.point.y + this.textHeight);

        // scale offset
        let offsetX = ((this.scale.x * this.textWidth) - this.textWidth) / 2;
        let offsetY = ((this.scale.y * this.textHeight) - this.textHeight) / 2;

        // added linewidth and scale
        return new Point(br.x + lw + offsetX, br.y + lw + offsetY);
    }

    public get textHeight(): number {
        // magic number... pretty close
        return this.fontSize * 1.286;
    }

    public get textWidth(): number {
        return this.context.measureText(this.text).width;
    }

    draw(): void {
        this.context.save();

        let center = this.centerPoint;
        this.preDraw(center.x, center.y);
        this.drawText(-center.x, -center.y);

        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.restore();
    }

    preDraw(offsetX: number, offsetY: number) {
        // centering on the marker
        this.context.translate(this.point.x + offsetX, this.point.y + offsetY);

        // applying rotation
        this.context.rotate(this.utils.degreesToRadians(this.rotationDegrees));

        // applying scale
        this.context.scale(this.scale.x, this.scale.y);

        // applying flips
        this.context.scale(this.flip.flipX ? -1 : 1, this.flip.flipY ? -1 : 1);
    }

    drawText(offsetX: number, offsetY: number) {
        this.context.font = `${this.fontSize}px ${this.fontFamily}`;
        this.size.height = this.textHeight;
        this.size.width = this.textWidth;

        this.context.textAlign = this.alignment;
        this.context.textBaseline = this.baseLine;

        if (this.isSolid) {
            this.context.globalAlpha = this.fillAlpha;
            this.context.fillStyle = this.color;
            this.context.fillText(this.text, offsetX, offsetY, this.size ? this.size.width : undefined);
            this.context.globalAlpha = 1.0;
        }
        if (this.drawOutline) {
            this.context.globalAlpha = this.borderAlpha;
            this.context.strokeStyle = this.outlineColor;
            this.context.lineWidth = this.lineWidth;
            this.context.strokeText(this.text, offsetX, offsetY, this.size ? this.size.width : undefined);
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
