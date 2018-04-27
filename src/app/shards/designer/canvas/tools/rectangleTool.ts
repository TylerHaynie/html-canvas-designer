import { Draw } from '../draw';
import { Rectangle } from '../shapes/rectangle';
import { Utils } from '../utils';
import { iDrawable } from '../interfaces/iDrawable';
import { Tool } from '../interfaces/tool';
import { Point } from '../models/point';
import { Size } from '../models/size';

export class RectangleTool implements Tool {
    name = 'Rectangle';
    id = 'rectangle';
    currentPoints: Point[] = [];

    shapes: iDrawable[];

    private utils = new Utils();

    constructor() {
        this.shapes = [];
    }

    // if (rectangle == 0) {
    //     clx = event.clientX - c.offsetLeft;
    //     cly = event.clientY - c.offsetTop;
    //     ctx.moveTo(clx, cly);
    //     rectangle++;
    //   } else {
    //     ulx = event.clientX - c.offsetLeft;
    //     uly = event.clientY - c.offsetTop;
    //     ctx.beginPath();
    //     ctx.moveTo(ulx, uly);
    //     ctx.strokeRect(clx, cly, ulx - clx, uly - cly);
    //     ctx.stroke();
    //     rectangle = 0;
    //   }

    useTool(context: CanvasRenderingContext2D, point: Point) {

        // this.currentPoints.push(point);

        // if (this.currentPoints.length > 1) {
        //     let p1 = this.currentPoints[0];
        //     let p2 = this.currentPoints[1];

        //     let w = this.utils.getDistance(p1.x, p2.x);
        //     let h = this.utils.getDistance(p1.y, p2.y);
        //     let size = new Size(w, h);

        //     let mpx = this.utils.findHalf(p1.x, p2.x);
        //     let mpy = this.utils.findHalf(p1.y, p2.y);

        //     let rect: Rectangle;
        //     // if (p2.x < p1.x && p2.y < p1.y) {
        //     //     rect = new Rectangle(context, p2, new Size(w, h));
        //     // }
        //     // else if (p2.x > p1.x && p2.y < p1.y) {
        //     //     rect = new Rectangle(context, p2, new Size(w, h));
        //     // }
        //     // else if (p2.x < p1.x && p2.y > p1.y) {
        //     //     rect = new Rectangle(context, p1, new Size(w, h));
        //     // }
        //     // else if (p2.x > p1.x && p2.y > p2.y) {
        //     //     rect = new Rectangle(context, p1, new Size(w, h));
        //     // }
        //     // else {
        //     //     rect = new Rectangle(context, p1, new Size(w, h));
        //     // }

        //     this.shapes.push(rect);
        //     this.currentPoints = [];
        // }

        this.shapes.push(new Rectangle(context, point, new Size(50, 50)));


        console.log(this.currentPoints);
    }
}
