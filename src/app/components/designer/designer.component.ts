import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewChecked, AfterViewInit } from '@angular/core';
import { RectangleTool } from '../../lib/canvas/tools/rectangle-tool';
import { Utils } from '../../lib/canvas/utils';
import { Point } from '../../lib/canvas/models/point';
import { Grid } from '../../lib/canvas/items/grid';
import { CrossLines } from '../../lib/canvas/items/cross-lines';
import { Text } from '../../lib/canvas/shapes/text';
import { Rectangle } from '../../lib/canvas/shapes/rectangle';
import { Size } from '../../lib/canvas/models/size';
import { SHIFT_DIRECTION } from '../../lib/canvas/enums/shift-direction';
import { MouseManagerInstance } from '../../lib/canvas/managers/mouse-manager';
import { Drawable } from '../../lib/canvas/models/drawable';
import { iTool } from '../../lib/canvas/interfaces/iTool';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements AfterViewInit {
  @ViewChild('drawingCanvas') canvasRef: ElementRef<HTMLCanvasElement>;

  utils: Utils;
  context: CanvasRenderingContext2D;
  tools: iTool[] = [];

  currentTool: iTool;
  currentToolbarItem: string = 'draw';
  pointerLocation: Point = new Point(0, 0);
  trackMouse: boolean = true;

  drawGrid: boolean = true;
  gridSpacing: number = 20;

  selectedShape: Drawable;
  isDragging: boolean = true;
  dragOffsetX: number;
  dragOffsetY: number;

  shiftDirections = SHIFT_DIRECTION;

  constructor() { }

  ngAfterViewInit() {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');

    this.utils = new Utils();
    this.canvasInit();
    this.registerEvents();
    this.fitToContainer(this.context.canvas);

    this.paint();
  }

  private canvasInit() {
    this.canvasRef.nativeElement.tabIndex = 1000; // canvas needs a tabindex so we can listen for keyboard events
    this.canvasRef.nativeElement.style.outline = 'none'; // removing the focus outline

    // for better image quality
    // this.context.mozImageSmoothingEnabled = false;  // firefox
    this.context.imageSmoothingEnabled = false; // everything else

    this.fitToContainer(this.context.canvas);
  }

  registerEvents() {

    // fixes a problem where double clicking causes text to get selected on the canvas
    this.canvasRef.nativeElement.addEventListener('selectstart', function (e: any) {
      e.preventDefault();
      return false;
    },
      false);

    this.canvasRef.nativeElement.onmousedown = (e: MouseEvent) => {
      this.onMouseDown(e);
    };

    this.canvasRef.nativeElement.onmouseup = (e: MouseEvent) => {
      this.onMouseUp(e);
    };

    this.canvasRef.nativeElement.onmousemove = (e: MouseEvent) => {
      this.onMouseMove(e);
    };

    this.canvasRef.nativeElement.onkeydown = (e: KeyboardEvent) => {
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

  fitToContainer(canvas: HTMLCanvasElement) {
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

  changeLayer(direction: any) {
    this.currentTool.shiftItem(this.selectedShape, direction);
  }

  setToolbarItem(id: string) {
    this.currentToolbarItem = id;
  }

}
