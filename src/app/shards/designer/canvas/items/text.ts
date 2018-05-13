import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Drawable } from '../models/drawable';
import { Size } from '../models/size';

export class Text extends Drawable implements iDrawable {

    context: CanvasRenderingContext2D;
    point: Point;
    size: Size;

    text: string;
    fontStyle: string = '25px Arial';
    alignment: string = 'start';
    baseLine: string = 'hanging';

    constructor(context: CanvasRenderingContext2D, point: Point, text: string, size?: Size) {
        super();

        this.context = context;
        this.text = text;
        this.point = point;
        this.size = size;
    }

    draw() {
        this.context.font = this.fontStyle;
        this.context.textAlign = this.alignment;
        this.context.textBaseline = this.baseLine;
        this.context.strokeStyle = this.outlineColor;
        this.context.fillStyle = this.color;
        this.context.lineWidth = this.lineWidth;

        if (this.color) {
            this.context.fillText(this.text, this.point.x, this.point.y, this.size ? this.size.width : undefined);
        }
        if (this.outlineColor) {
            this.context.strokeText(this.text, this.point.x, this.point.y, this.size ? this.size.width : undefined);
        }
    }

    pointWithinBounds(point: Point) {
        let withinBounds: boolean = false;

        

        return withinBounds;
    }
}
