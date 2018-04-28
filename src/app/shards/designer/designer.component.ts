import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { RectangleTool } from './canvas/tools/rectangle-tool';
import { Utils } from './canvas/utils';
import { iTool } from './canvas/interfaces/itool';
import { Point } from './canvas/models/point';
import { Grid } from './canvas/items/grid';
import { CrossLines } from './canvas/items/cross-lines';
import { Text } from './canvas/items/text';
import { Rectangle } from './canvas/shapes/rectangle';
import { Size } from './canvas/models/size';
import { iDrawable } from './canvas/interfaces/iDrawable';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {
  @ViewChild('c') canvasRef: ElementRef;
  @Input() frameRate = 60;

  private utils: Utils;
  private context: CanvasRenderingContext2D;
  private tools: iTool[] = [];

  private currentTool: iTool;
  private pointerLocation: Point = new Point(0, 0);
  private trackMouse: boolean = true;

  drawGrid: boolean = true;
  gridCellSize: number = 10;

  selectedShape: iDrawable;
  isDragging: boolean = true;
  dragOffsetX: number;
  dragOffsetY: number;

  constructor() {

  }

  ngOnInit() {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');
    this.registerEvents();

    // this.draw = new Draw(this.context);
    this.utils = new Utils();

    // testing
    // this.setTool('rectangle');
    // this.currentTool.shapes.push(
    //   new Rectangle(this.context,
    //     new Point(165, 218),
    //     new Size(185, 217),
    //     '#497663',
    //     true,
    //     1,
    //     '#875319'));

    // this.tools.push(this.currentTool);
    // this.selectedShape = this.currentTool.shapes[0];
    // end testing

    this.paint();
  }

  registerEvents() {

    // fixes a problem where double clicking causes text to get selected on the canvas
    this.canvasRef.nativeElement.addEventListener('selectstart', function (e) {
      e.preventDefault();
      return false;
    },
      false);

    this.canvasRef.nativeElement.onmousedown = (e) => {
      this.onMouseDown(e);
    };

    this.canvasRef.nativeElement.onmouseup = (e) => {
      this.onMouseUp(e);
    };

    this.canvasRef.nativeElement.onmousemove = (e) => {
      this.onMouseMove(e);
    };
  }

  paint() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    this.context.lineWidth = 5;
    if (this.drawGrid) {
      let gp = new Point(0, 0);
      let ds = new Size(this.context.canvas.width, this.context.canvas.height);

      let grid = new Grid(this.context, gp, ds, this.gridCellSize, '#252525', 3);
      grid.draw();
    }

    if (this.trackMouse) {
      let ds = new Size(this.context.canvas.width, this.context.canvas.height);
      let lines = new CrossLines(this.context, this.pointerLocation, ds);
      lines.draw();
    }




    this.tools.forEach(tool => {
      tool.shapes.forEach(shape => {
        shape.draw();
      });
    });

    requestAnimationFrame(() => this.paint());
  }

  onMouseDown(e: MouseEvent) {
    this.selectedShape = null;

    if (this.currentTool != null) {
      this.currentTool.useTool(this.context, this.pointerLocation);
    }

    this.tools.forEach(tool => {
      tool.shapes.forEach(shape => {
        if (shape.pointWithinBounds(this.pointerLocation)) {
          this.selectedShape = shape;

          this.dragOffsetX = this.pointerLocation.x - shape.point.x;
          this.dragOffsetY = this.pointerLocation.y - shape.point.y;
        }
      });
    });

    this.isDragging = true;
    console.log(this.selectedShape);
  }

  onMouseUp(e: MouseEvent) {
    this.isDragging = false;
  }

  onMouseMove(e: MouseEvent) {
    this.pointerLocation = this.utils.getMousePosition(this.context, e);

    if (this.selectedShape && this.isDragging) {
      this.selectedShape.point = new Point(this.pointerLocation.x - this.dragOffsetX, this.pointerLocation.y - this.dragOffsetY);
    }
  }

  setTool(id: string) {

    switch (id) {
      case 'rectangle':
        this.currentTool = new RectangleTool();
        break;
      case 'select':
        this.currentTool = null;
        break;
    }

    if (this.currentTool && !this.tools.includes(this.currentTool)) {
      this.tools.push(this.currentTool);
    }
  }

}
