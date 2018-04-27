import { iDrawable } from './iDrawable';
import { Point } from '../models/point';

export interface Tool {
    name: string;
    id: string;
    parent?: Tool;
    shapes: iDrawable[];
    useTool(context: CanvasRenderingContext2D, point: Point);
}
