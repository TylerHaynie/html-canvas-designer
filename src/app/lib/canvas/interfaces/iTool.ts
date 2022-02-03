import { Point } from '../models/point';
import { SHIFT_DIRECTION } from '../enums/shift-direction';
import { Drawable } from '../models/drawable';

export interface iTool {
    name: string;
    id: string;
    parent?: iTool;
    shapes: Drawable[];
    useTool(context: CanvasRenderingContext2D, point: Point): void;
    deleteShape(shape: Drawable): void;
    // pullForward(shape: iDrawable);
    // pullToTop(shape: iDrawable);
    // pushBack(shape: iDrawable);
    // pushToBack(shape: iDrawable);
    shiftItem(selectedShape: Drawable, direction: SHIFT_DIRECTION): void;
}
