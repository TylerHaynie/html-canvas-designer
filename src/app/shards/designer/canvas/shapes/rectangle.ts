import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';

export class Rectangle implements iDrawable {
    point: Point;
    size: Size;
    borderColor: string | CanvasGradient | CanvasPattern;
    fillColor: string | CanvasGradient | CanvasPattern;
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, point: Point, size: Size,
        borderColor: string | CanvasGradient | CanvasPattern = '#67e5b9', fillColor: string | CanvasGradient | CanvasPattern = '#52bf99') {
        this.context = context;
        this.point = point;
        this.size = size;
    }

    draw(): void {
        this.context.strokeStyle = this.borderColor;
        this.context.fillStyle = this.fillColor;
        this.context.fillRect(this.point.x, this.point.y, this.size.width, this.size.height);
    }
}
