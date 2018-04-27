import { Rectangle } from './shapes/rectangle';
import { Point } from './models/point';
import { Size } from './models/size';


export class Draw {
    canvasContext: CanvasRenderingContext2D;

    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;
    }

    drawPointWithText(x, y, size = 1, textEdge = 45) {
        this.canvasContext.textAlign = 'right';
        this.canvasContext.textBaseline = 'bottom';

        let tx = x - 3;
        let ty = y - 3;

        if (x - textEdge <= 0) {
            tx += textEdge + size;
        }

        if (y + textEdge < 0) {
            ty += textEdge;
        }

        this.canvasContext.fillText(`(${x}, ${y})`, tx, ty);
    }

}
