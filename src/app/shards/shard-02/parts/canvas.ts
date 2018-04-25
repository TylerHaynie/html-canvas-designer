import { CanvasTools } from './canvasTools';
import { Point, Size } from './models';

export class Canvas {
    context: CanvasRenderingContext2D | undefined;
    canvas: HTMLCanvasElement;
    tools: CanvasTools;
    // target: HTMLElement;

    constructor(canvas: HTMLCanvasElement) {
        // this.target = target;
        this.canvas = canvas;
    }

    start() {
        console.log('Building Canvas');
        // console.log(this.target);
        console.log(document);

        this.canvas = <HTMLCanvasElement>document.createElement('canvas');
        console.log(this.canvas);
        this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        if (this.canvas !== undefined) {
            if (this.context !== undefined) {

                this.tools = new CanvasTools(this.context);

                // this.target.appendChild(this.canvas);
                // window.addEventListener('resize', () => this.tools.canvasFillParent(this.canvas));

                // this.tools.canvasFillParent(this.canvas);
                // this.draw();
            }
        }

        this.draw();
    }

    draw() {
        for (let x = 0; x < 1; x++) {
            this.tools.drawRectangleWithSize(<Point>{x: 10, y: 10}, <Size>{width: 3, height: 3});
        }
    }
}
