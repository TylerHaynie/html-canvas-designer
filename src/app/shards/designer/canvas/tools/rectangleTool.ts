import { Tool, Point } from '../models';
import { Draw } from '../draw';

export class RectangleTool implements Tool {
    name = 'Rectangle';
    id = 'rectangle';

    currentPoints: Point[];

    constructor(private draw: Draw) {

    }

    useTool(point: Point) {
        console.log('using rectangle tool');
        if (this.currentPoints == null) {
            this.currentPoints = [];
        }

        this.currentPoints.push(point);
        this.draw.drawPoint(point, 3);

        console.log(this.currentPoints);
        if (this.currentPoints.length > 1) {

            let p1 = <Point>{ x: this.currentPoints[0].x, y: this.currentPoints[0].y };
            let p2 = <Point>{ x: this.currentPoints[1].x, y: this.currentPoints[1].y, };

            this.draw.drawRectangle(p2, p1, true);

            this.currentPoints = null;
        }
    }
}
