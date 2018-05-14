import { Point } from '../models/point';
import { Size } from '../models/size';

export interface iDrawable {
    context: CanvasRenderingContext2D;
    point: Point;

    draw(): void;
    pointWithinBounds(point: Point): boolean;
}
