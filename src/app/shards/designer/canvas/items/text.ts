import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';

export class Text implements iDrawable {
    private context: CanvasRenderingContext2D;
    private text: string;
    private point: Point;
    private fillColor: string | CanvasGradient | CanvasPattern;
    private outlineColor: string | CanvasGradient | CanvasPattern;
    private lineWidth: number;
    private fontStyle: string;
    private alignment: string;
    private baseLine: string;
    private maxWidth?: number;

    constructor(context: CanvasRenderingContext2D, text: string, point: Point, outlineColor: string | CanvasGradient | CanvasPattern,
        fillColor: string | CanvasGradient | CanvasPattern, lineWidth: number, fontStyle: string = '150px Arial', maxWidth: number = null,
        alignment: string = 'left', baseLine: string = 'hanging') {

        this.context = context;
        this.text = text;
        this.point = point;
        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.lineWidth = lineWidth;
        this.fontStyle = fontStyle;
        this.alignment = alignment;
        this.baseLine = baseLine;
        this.maxWidth = maxWidth;
    }

    draw() {

        this.context.font = this.fontStyle;
        this.context.textAlign = this.alignment;
        this.context.textBaseline = this.baseLine;

        this.context.strokeStyle = this.outlineColor;
        this.context.fillStyle = this.fillColor;
        this.context.lineWidth = this.lineWidth;

        if (this.maxWidth) {
            this.context.fillText(this.text, this.point.x, this.point.y, this.maxWidth);
            this.context.strokeText(this.text, this.point.x, this.point.y, this.maxWidth);
        }
        else {
            this.context.strokeText(this.text, this.point.x, this.point.y);
            this.context.fillText(this.text, this.point.x, this.point.y);
        }
    }

}
