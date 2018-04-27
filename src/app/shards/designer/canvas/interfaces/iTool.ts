import { iDrawable } from './iDrawable';
import { Point } from '../models/point';

export interface iTool {
    name: string;
    id: string;
    parent?: iTool;
    shapes: iDrawable[];
    useTool(context: CanvasRenderingContext2D, point: Point);
}
