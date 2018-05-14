import { Drawable } from '../models/drawable';
import { iDrawable } from '../interfaces/iDrawable';
import { Point } from '../models/point';
import { Size } from '../models/size';

export class Datapoint extends Drawable implements iDrawable {
    context: CanvasRenderingContext2D;
    point: Point;
    size: Size;

    constructor(context: CanvasRenderingContext2D, point: Point, size: Size) {
        super();

        this.context = context;
        this.point = point;
        this.size = size;
    }

    draw() {

    }

    pointWithinBounds(point: Point) {
        let withinBounds: boolean = false;



        return withinBounds;
    }

}
