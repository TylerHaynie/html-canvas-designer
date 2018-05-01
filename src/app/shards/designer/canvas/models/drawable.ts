import { Scale } from './scale';
import { Flip } from './flip';
import { Utils } from '../utils';

export class Drawable {
    scale: Scale = new Scale(1, 1);
    flip: Flip = new Flip(false, false);
    outlineColor: string | CanvasGradient | CanvasPattern = new Utils().getRandomHexColor();
    color: string | CanvasGradient | CanvasPattern = new Utils().getRandomHexColor();
    solid: boolean = true;
    lineWidth: number = 1;
    fillAlpha: number = 1;
    borderAlpha: number = 1;
    drawOutline: boolean = true;
    rotationDegrees: number = 0;
}
