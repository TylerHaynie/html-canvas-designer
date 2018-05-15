import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { RectangleTool } from '../../libs/canvas/tools/rectangle-tool';
import { Utils } from '../../libs/canvas/utils';
import { iTool } from '../../libs/canvas/interfaces/itool';
import { Point } from '../../libs/canvas/models/point';
import { Grid } from '../../libs/canvas/items/grid';
import { CrossLines } from '../../libs/canvas/items/cross-lines';
import { Text } from '../../libs/canvas/shapes/text';
import { Rectangle } from '../../libs/canvas/shapes/rectangle';
import { Size } from '../../libs/canvas/models/size';
import { iDrawable } from '../../libs/canvas/interfaces/iDrawable';
import { SHIFT_DIRECTION } from '../../libs/canvas/enums/shift-direction';
import { MouseManagerInstance } from '../../libs/canvas/managers/mouse-manager';
import { Drawable } from '../../libs/canvas/models/drawable';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {
  @ViewChild('c') canvasRef: ElementRef;

  private utils: Utils;
  private context: CanvasRenderingContext2D;
  private tools: iTool[] = [];

  private currentTool: iTool;
  private currentToolbarItem: string = 'draw';
  private pointerLocation: Point = new Point(0, 0);
  private trackMouse: boolean = true;

  drawGrid: boolean = true;
  gridSpacing: number = 20;

  selectedShape: iDrawable;
  isDragging: boolean = true;
  dragOffsetX: number;
  dragOffsetY: number;

  constructor() { }

  ngOnInit() {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');
    this.canvasRef.nativeElement.tabIndex = 1000; // canvas needs a tabindex so we can listen for keyboard events
    this.canvasRef.nativeElement.style.outline = 'none'; // removing the focus outline

    this.utils = new Utils();
    this.registerEvents();
    this.fitToContainer(this.context.canvas);

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

    this.canvasRef.nativeElement.onkeydown = (e) => {
      this.onKeyDown(e);
    };

    window.onresize = () => {
      this.fitToContainer(this.context.canvas);
    };

  }

  paint() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    this.context.lineWidth = 5;
    if (this.drawGrid) {
      let point = new Point(0, 0);
      let size = new Size(this.context.canvas.width, this.context.canvas.height);

      let grid = new Grid(this.context, point, size, this.gridSpacing);
      grid.color = '#222';
      grid.draw();
    }

    if (this.trackMouse) {
      let ds = new Size(this.context.canvas.width, this.context.canvas.height);
      let lines = new CrossLines(this.context, this.pointerLocation, ds);
      lines.color = '#555';
      lines.draw();
    }

    this.tools.forEach(tool => {
      tool.shapes.forEach(shape => {
        shape.draw();
      });
    });

    requestAnimationFrame(() => this.paint());
  }

  // resize() {
  //   this.context.canvas.width = 0;
  //   this.context.canvas.height = 0;

  //   this.context.canvas.width = this.context.canvas.parentElement.offsetWidth - 5;
  //   this.context.canvas.height = this.context.canvas.parentElement.offsetHeight - 5;
  // }

  fitToContainer(canvas) {
    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  onMouseDown(e: MouseEvent) {
    this.selectedShape = null;

    if (this.currentTool != null && this.currentToolbarItem === 'draw') {
      this.currentTool.useTool(this.context, this.pointerLocation);
    }

    // quad tree here soon
    if (this.currentToolbarItem === 'select') {
      this.tools.forEach(tool => {
        tool.shapes.forEach(shape => {
          if (shape.pointWithinBounds(this.pointerLocation)) {
            this.selectedShape = shape;

            this.dragOffsetX = this.pointerLocation.x - shape.point.x;
            this.dragOffsetY = this.pointerLocation.y - shape.point.y;
          }
        });
      });
    }

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

  onKeyDown(e: KeyboardEvent) {
    console.log(e.key);
    if (e.key.toLocaleLowerCase() === 'delete') {
      this.tools.forEach(tool => {
        tool.deleteShape(this.selectedShape);
      });
      this.selectedShape = null;
    }

    if (e.key.toLocaleLowerCase() === 's') {
      this.currentToolbarItem = 'select';
    }
  }

  setTool(id: string) {
    switch (id) {
      case 'rectangle':
        this.currentTool = new RectangleTool();
        break;
    }

    if (this.currentTool && !this.tools.includes(this.currentTool)) {
      this.tools.push(this.currentTool);
    }
  }

  changeLayer(direction: SHIFT_DIRECTION) {
    this.currentTool.shiftItem(this.selectedShape, direction);
  }

  setToolbarItem(id: string) {
    this.currentToolbarItem = id;
  }

}
