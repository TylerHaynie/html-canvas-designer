import { Point } from '../models/point';
import { iDrawable } from './iDrawable';

export interface iTool {
    name: string;
    id: string;
    parent?: iTool;
    shapes: iDrawable[];
    useTool(context: CanvasRenderingContext2D, point: Point);
    deleteShape(shape: iDrawable);
    pullForward(shape: iDrawable);
    pullToTop(shape: iDrawable);
    pushBack(shape: iDrawable);
    pushToBack(shape: iDrawable);
}
