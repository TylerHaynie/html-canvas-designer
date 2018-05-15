import { Rectangle } from '../shapes/rectangle';
import { Utils } from '../utils';
import { iTool } from '../interfaces/iTool';
import { Point } from '../models/point';
import { Size } from '../models/size';
import { iDrawable } from '../interfaces/iDrawable';
import { SHIFT_DIRECTION } from '../enums/shift-direction';
import { Line } from '../shapes/line';
import { LineSegment } from '../models/line-segment';
import { Drawable } from '../models/drawable';

export class RectangleTool implements iTool {
    name = 'Rectangle';
    id = 'rectangle';

    shapes: iDrawable[];
    private tempShapes: iDrawable[] = [];

    private utils = new Utils();
    private currentPoints: Point[] = [];
    private indicatorLength: number = 8;

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

            // Remove click indicator
            let s1 = this.tempShapes[0];
            let s1Index = this.shapes.indexOf(s1);
            this.shapes.splice(s1Index, 1);

            // clear temp arrays
            this.currentPoints = [];
            this.tempShapes = [];

            let rect = new Rectangle(context, topLeft, size);
            this.shapes.push(rect);

            console.log('fill Color: ');
            console.log(rect.color);
        }
        else {
            let line = new Line(context);
            line.color = '#96f9ff';

            let downLine = new LineSegment(point);
            downLine.addPoint(new Point(point.x, point.y + this.indicatorLength));
            line.addSegment(downLine);

            let rightLine = new LineSegment(point);
            rightLine.addPoint(new Point(point.x + this.indicatorLength, point.y));
            line.addSegment(rightLine);

            // adding clickpoint to tempshapes so I can draw a little rectangle
            this.tempShapes.push(line);
            // adding to shapes collection so main draw call will draw the temp shapes
            this.shapes.push(line);
        }
    }

    deleteShape(shape: iDrawable) {
        if (this.shapes.includes(shape)) {
            let shapeIndex = this.shapes.indexOf(shape);

            if (shapeIndex >= 0) {
                if (this.shapes.length === 1) {
                    this.shapes = [];
                }
                else {
                    this.shapes.splice(shapeIndex, 1);
                }
            }
        }
    }

    shiftItem(selectedShape: iDrawable, direction: SHIFT_DIRECTION) {
        this.utils.shiftDrawableItem(this.shapes, selectedShape, direction);
    }
}
