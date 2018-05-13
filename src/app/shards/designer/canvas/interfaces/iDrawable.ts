import { Point } from '../models/point';
import { Size } from '../models/size';

export interface iDrawable {
    context: CanvasRenderingContext2D;

    point: Point;
    size: Size;
    color: string | CanvasGradient | CanvasPattern;
    outlineColor: string | CanvasGradient | CanvasPattern;

    draw(): void;
    pointWithinBounds(point: Point): boolean;
}
