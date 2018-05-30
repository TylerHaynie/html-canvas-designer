import { Point } from './point';
export class LineSegment {
    startPoint: Point;
    points: Point[];

    constructor(startPoint: Point) {
        this.startPoint = startPoint;
        this.points = [];
    }

    addPoint(point: Point) {
        this.points.push(point);
    }
}
