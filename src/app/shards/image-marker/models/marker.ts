import { Point } from './point';
import { Circle } from '../../../libs/canvas/shapes/circle';
import { Scale } from '../../../libs/canvas/models/scale';
import { Drawable } from '../../../libs/canvas/models/drawable';
import { MarkerBase } from './marker-base';
import { Text } from '../../../libs/canvas/items/text';

export class Marker {
    point: Point;
    features: string[];
    text: string;
    circle: Circle;

    private id: number;
    private context: CanvasRenderingContext2D;

    private radius: number = 15;

    private highlightFillColor: string | CanvasGradient | CanvasPattern = '#ff0ac1';
    private highlightOutlineColor: string | CanvasGradient | CanvasPattern = '#00ff00';

    private fillColor: string | CanvasGradient | CanvasPattern = '#fff';
    private outlineColor: string | CanvasGradient | CanvasPattern = '#ff0000';

    private textobject: Text;
    private padding: number = 6;

    public get Id() {
        return this.id;
    }

    constructor(context: CanvasRenderingContext2D, id: number, features: string[], point: Point, text: string) {

        this.context = context;
        this.id = id;
        this.features = features;
        this.point = point;
        this.text = text;

        this.textobject = new Text(this.context, new Point(this.point.x / 2, this.point.y / 2), this.text);
        this.circle = new Circle(this.context, this.point, this.radius);
    }

    draw() {
        // update text
        this.textobject.point = this.point;
        this.textobject.color = '#000';
        this.textobject.outlineColor = '#000';
        this.textobject.fontSize = 25;

        // update circle
        this.circle.point = this.point;
        this.circle.radius = this.textobject.textWidth + this.padding;

        this.circle.draw();
        this.textobject.draw();
    }

    checkHover(point: Point) {
        if (this.circle.pointWithinBounds(point)) {
            this.highlight();
        }
        else {
            this.leave();
        }
    }

    highlight() {
        // TODO: Draw features list on hover
        this.circle.outlineColor = this.highlightOutlineColor;
        this.circle.color = this.highlightFillColor;
    }

    leave() {
        this.circle.outlineColor = this.outlineColor;
        this.circle.color = this.fillColor;
    }
}
