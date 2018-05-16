import { Point } from './point';
import { Circle } from '../../../libs/canvas/shapes/circle';
import { Scale } from '../../../libs/canvas/models/scale';
import { Drawable } from '../../../libs/canvas/models/drawable';
import { MarkerBase } from './marker-base';
import { Text } from '../../../libs/canvas/shapes/text';
import { Utils } from '../../../libs/canvas/utils';
import { Rectangle } from '../../../libs/canvas/shapes/rectangle';
import { Size } from '../../../libs/canvas/models/size';

export class Marker {
    point: Point;
    features: string[];
    text: string;
    circle: Circle;

    parentScale: Scale = new Scale(1, 1);
    circleFontSize: number = 25;
    listFontSize: number = 25;

    // private radius: number = 25;

    private id: number;
    private context: CanvasRenderingContext2D;
    private origin: Point;

    private isHovering: boolean = false;
    private popupPaddingFromCircle: number = -20;
    private listItemPadding: number = 5;
    private listItemLineWidth: number = 2;
    private highlightFillColor: string | CanvasGradient | CanvasPattern = '#ff0ac1';
    private highlightOutlineColor: string | CanvasGradient | CanvasPattern = '#00ff00';

    private fillColor: string | CanvasGradient | CanvasPattern = '#fff';
    private outlineColor: string | CanvasGradient | CanvasPattern = '#ff0000';

    private textobject: Text;
    private circlePadding: number = 5;

    public get Id() {
        return this.id;
    }

    public get originPoint(): Point{
        return this.origin;
    }

    constructor(context: CanvasRenderingContext2D, id: number, features: string[], point: Point, text: string) {
        this.context = context;
        this.id = id;
        this.features = features;
        this.point = point;
        this.text = text;

        this.origin = point;

        this.textobject = new Text(this.context, new Point(this.point.x / 2, this.point.y / 2), this.text);
        this.circle = new Circle(this.context, this.point, 1);
    }

    draw() {
        // this.applyScaleOffset();

        this.textobject.point = this.point;
        this.textobject.color = '#000';
        this.textobject.outlineColor = '#000';
        this.textobject.fontSize = this.circleFontSize;

        // update circle
        this.circle.point = this.point;

        // this.circle.radius = this.radius;
        this.circle.radius = (this.textobject.textWidth / 2) + this.circlePadding;

        this.circle.draw();
        this.textobject.draw();
        this.drawFeatures();
    }

    checkHover(point: Point) {
        if (this.circle.pointWithinBounds(point)) {
            this.highlight();
        }
        else {
            this.leave();
        }
    }

    // applyScaleOffset() {
    //     this.offsetPoint = new Point(this.point.x * this.parentScale.x, this.point.y * this.parentScale.y);
    // }

    private highlight() {
        // TODO: Draw features list on hover
        this.circle.outlineColor = this.highlightOutlineColor;
        this.circle.color = this.highlightFillColor;

        this.isHovering = true;
    }

    private leave() {
        this.isHovering = false;

        this.circle.outlineColor = this.outlineColor;
        this.circle.color = this.fillColor;
    }

    private drawFeatures() {
        if (this.isHovering) {

            let startpoint = new Point(
                this.point.x,
                this.point.y
            );

            let currentPoint: Point = startpoint;
            let textItems: Text[] = [];

            let maxWidth = 200;
            let height = 0;
            this.features.forEach(feature => {

                let itemText = new Text(
                    this.context,
                    new Point(
                        currentPoint.x,
                        currentPoint.y
                    ),
                    feature
                );

                itemText.color = '#000';
                itemText.outlineColor = '#000';
                itemText.fontSize = this.listFontSize;
                itemText.alignment = 'start';
                itemText.baseLine = 'hanging';

                maxWidth = itemText.textWidth;
                height += itemText.textHeight;

                textItems.push(itemText);
            });

            maxWidth += this.listItemPadding * 2;

            let rectPoint = <Point>{
                x: this.point.x + this.circle.radius * 2 + this.popupPaddingFromCircle,
                y: this.point.y - ((height + (this.listItemPadding * textItems.length)) / 2),
            };

            let itemBacks: Rectangle[] = [];

            // centering the items to the right
            let itemPoint = new Point(rectPoint.x + this.listItemPadding, rectPoint.y + this.listItemPadding - (this.listItemLineWidth * textItems.length));

            // TODO: need to check for out of bounds and move it if needed

            textItems.forEach(item => {
                let back = new Rectangle(this.context, itemPoint, new Size(maxWidth, item.textHeight));

                back.lineWidth = this.listItemLineWidth;
                back.point.y += back.lineWidth;
                back.color = '#fff';
                back.outlineColor = '#ff5c38';
                itemBacks.push();

                item.point = new Point(itemPoint.x + this.listItemPadding, itemPoint.y + this.listItemPadding);
                item.alignment = 'start';
                item.baseLine = 'hanging';

                back.draw();
                item.draw();

                itemPoint.y += item.textHeight + this.listItemPadding;
            });
        }
    }

}
