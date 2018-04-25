import { Point } from './models';

export class Utils {
    getMousePosition(context, evt): Point {
        let rect = context.canvas.getBoundingClientRect(), // abs. size of element
            scaleX = context.canvas.width / rect.width,    // relationship bitmap vs. element for X
            scaleY = context.canvas.height / rect.height;  // relationship bitmap vs. element for Y

        return <Point>{
            x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
            y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        };
    }

    getDistance(n1: number, n2: number): number {
        return Math.abs(Math.max(n1, n2) - Math.min(n1, n2));
    }

    findHalf(x, y) {
        return ((x + y) / 2);
    }

    //#region Random
    getRandomColor(): string {
        let r = 255 * Math.random() | 0,
            g = 255 * Math.random() | 0,
            b = 255 * Math.random() | 0;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    getRandomShadeOfGray(): string {
        let val = 50 * Math.random() | 0;
        return 'rgb(' + val + ',' + val + ',' + val + ')';
    }

    //#endregion
}
