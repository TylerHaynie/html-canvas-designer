import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Drawable } from '../models/drawable';
import { Size } from '../models/size';
import { Utils } from '../utils';
import { IMAGE_FRAME } from '../enums/image-frame';
import { SCALE_DIRECTION } from '../enums/scale-direction';
import { Scale } from '../models/scale';

export class CanvasImage extends Drawable implements iDrawable {

    context: CanvasRenderingContext2D;
    point: Point;
    image: HTMLImageElement = new Image;
    frame: IMAGE_FRAME = IMAGE_FRAME.FULL;
    scaleStep: number = 10;

    private utils: Utils = new Utils();

    constructor(context: CanvasRenderingContext2D, point: Point, imageSource: string) {
        super();

        this.context = context;
        this.point = point;
        this.image.src = imageSource;
    }

    public get getTopLeftPoint(): Point {
        let lw = this.lineWidth / 2;

        // scale offset
        let offsetX = ((this.scale.x * this.image.width) - this.image.width) / 2;
        let offsetY = ((this.scale.y * this.image.height) - this.image.height) / 2;

        // added linewidth and scale
        return new Point(this.point.x - lw - offsetX, this.point.y - lw - offsetY);
    }

    public get getBottomRight() {
        let lw = this.lineWidth / 2;

        // true bottom right point
        let br = new Point(this.point.x + this.image.width, this.point.y + this.image.height);

        // scale offset
        let offsetX = ((this.scale.x * this.image.width) - this.image.width) / 2;
        let offsetY = ((this.scale.y * this.image.height) - this.image.height) / 2;

        // added linewidth and scale
        return new Point(br.x + lw + offsetX, br.y + lw + offsetY);
    }

    public get zoomPercentage() {
        return Math.floor(this.scale.x * (this.scaleStep / 100) * 1000);
    }

    draw(): void {
        this.context.save();

        let center = this.centerPoint;
        this.preDraw(center.x, center.y);
        this.drawImage(-center.x, -center.y);

        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.restore();
    }

    preDraw(offsetX: number, offsetY: number) {
        // centering on the image
        this.context.translate(this.point.x + offsetX, this.point.y + offsetY);

        // applying rotation
        this.context.rotate(this.utils.degreesToRadians(this.rotationDegrees));

        // applying scale
        this.context.scale(this.scale.x, this.scale.y);

        // applying flips
        this.context.scale(this.flip.flipX ? -1 : 1, this.flip.flipY ? -1 : 1);
    }

    private drawImage(offsetX: number, offsetY: number) {
        this.context.globalAlpha = this.fillAlpha;

        switch (this.frame) {
            case IMAGE_FRAME.FIT_CENTER:
                this.drawImageScaledToCanvas();
                break;
            case IMAGE_FRAME.FULL:
                this.drawFullImage();
                break;
        }
    }

    private drawFullImage() {
        // this.context.drawImage(this.image, 0, 0);
        this.context.drawImage(this.image, 0, 0);
    }

    private drawImageScaledToCanvas() {
        let canvas = this.context.canvas;

        let hRatio = canvas.width / this.image.width;
        let vRatio = canvas.height / this.image.height;
        let ratio = Math.min(hRatio, vRatio);

        let centerShift_x = (canvas.width - this.image.width * ratio) / 2;
        let centerShift_y = (canvas.height - this.image.height * ratio) / 2;

        this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height,
            centerShift_x, centerShift_y, this.image.width * ratio, this.image.height * ratio);
    }

    zoom(scaleDirection: SCALE_DIRECTION) {
        this.scale = this.utils.applyScale(this.scale, this.scaleStep, scaleDirection);
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
