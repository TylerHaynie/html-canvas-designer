import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';

export class Text {
    private context: CanvasRenderingContext2D;
    text: string;
    point: Point;
    fillColor: string | CanvasGradient | CanvasPattern;
    outlineColor: string | CanvasGradient | CanvasPattern;
    lineWidth: number;
    fontStyle: string;
    alignment: string;
    baseLine: string;
    maxWidth?: number;

    constructor(context: CanvasRenderingContext2D, text: string, point: Point, fillColor?: string | CanvasGradient | CanvasPattern,
        outlineColor?: string | CanvasGradient | CanvasPattern, lineWidth: number = 1, fontStyle: string = '25px Arial',
        alignment: string = 'start', baseLine: string = 'hanging', maxWidth: number = undefined) {

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

        if (this.fillColor) {
            this.context.fillText(this.text, this.point.x, this.point.y, this.maxWidth);
        }
        if (this.outlineColor) {
            this.context.strokeText(this.text, this.point.x, this.point.y, this.maxWidth);
        }
    }
}
