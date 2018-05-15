import { Scale } from './scale';
import { Flip } from './flip';
import { Utils } from '../utils';
import { Size } from './size';
import { Point } from '../../../shards/image-marker/models/point';

export class Drawable {
    point: Point = new Point(0, 0);
    scale: Scale = new Scale(1, 1);
    flip: Flip = new Flip(false, false);
    outlineColor: string | CanvasGradient | CanvasPattern = new Utils().getRandomHexColor();
    color: string | CanvasGradient | CanvasPattern = new Utils().getRandomHexColor();
    isSolid: boolean = true;
    lineWidth: number = 1;
    fillAlpha: number = 1;
    borderAlpha: number = 1;
    drawOutline: boolean = true;
    rotationDegrees: number = 0;
    size: Size = new Size(10, 10);

    public get centerPoint() {
        let offsetX = this.size.width / 2;
        let offsetY = this.size.height / 2;

        return new Point(offsetX, offsetY);
    }

}
