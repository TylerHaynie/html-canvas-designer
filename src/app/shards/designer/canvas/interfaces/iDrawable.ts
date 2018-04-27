import { Point } from '../models/point';
export interface iDrawable {
    point: Point;
    draw(): void;
    pointWithinBounds(point: Point): boolean;
}
