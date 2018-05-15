import { Scale } from '../../../libs/canvas/models/scale';

export class MarkerBase{
    protected color: string = '#727272';
    protected outlineColor: string = '#e8e8e8';
    protected lineWidth: number = 1;
    protected alpha: number = 1;
    protected radius: number = 10;
    protected scale: Scale = new Scale(1, 1);
}
