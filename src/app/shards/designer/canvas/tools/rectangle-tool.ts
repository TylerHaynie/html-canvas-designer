import { Draw } from '../draw';
import { Rectangle } from '../shapes/rectangle';
import { Utils } from '../utils';
import { iDrawable } from '../interfaces/iDrawable';
import { iTool } from '../interfaces/iTool';
import { Point } from '../models/point';
import { Size } from '../models/size';

export class RectangleTool implements iTool {
    name = 'Rectangle';
    id = 'rectangle';
    currentPoints: Point[] = [];

    shapes: iDrawable[];

    private utils = new Utils();

    constructor() {
        this.shapes = [];
    }

    useTool(context: CanvasRenderingContext2D, point: Point) {

        this.currentPoints.push(point);

        if (this.currentPoints.length > 1) {
            let p1 = this.currentPoints[0];
            let p2 = this.currentPoints[1];

            let w = this.utils.getDistance(p1.x, p2.x);
            let h = this.utils.getDistance(p1.y, p2.y);
            let size = new Size(w, h);

            let mpx = (p1.x + p2.x) / 2;
            let mpy = (p1.y + p2.y) / 2;

            let x = mpx - (w / 2);
            let y = mpy - (h / 2);
            let topLeft = new Point(x, y);

            let rect = new Rectangle(context, topLeft, size, this.utils.getRandomColor(), true, 2, this.utils.getRandomColor());

            this.shapes.push(rect);
            this.currentPoints = [];
        }
    }
}
