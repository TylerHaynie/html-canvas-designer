import { Point } from '../models/point';

export interface iDrawable {
    context: CanvasRenderingContext2D;
    point: Point;

    draw(): void;
    pointWithinBounds(point: Point): boolean;
}
