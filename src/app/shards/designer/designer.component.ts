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
  private currentToolbarItem: string;
  private pointerLocation: Point = new Point(0, 0);
  private trackMouse: boolean = true;

  drawGrid: boolean = true;
  gridCellSize: number = 20;

  selectedShape: iDrawable;
  isDragging: boolean = true;
  dragOffsetX: number;
  dragOffsetY: number;

  constructor() {

  }

  ngOnInit() {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');
    this.canvasRef.nativeElement.tabIndex = 1000; // canvas needs a tabindex so we can listen for keyboard events
    this.canvasRef.nativeElement.style.outline = 'none'; // removing the focus outline

    this.utils = new Utils();
    this.registerEvents();
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

    if (this.currentTool != null && this.currentToolbarItem === 'draw') {
      this.currentTool.useTool(this.context, this.pointerLocation);
    }

    // quad tree here soon
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

  changeLayer(where: string) {

    switch (where) {
      case 'push':
        this.currentTool.pushBack(this.selectedShape);
        break;
      case 'pull':
        this.currentTool.pullForward(this.selectedShape);
        break;
      case 'top':
        this.currentTool.pullToTop(this.selectedShape);
        break;
      case 'bottom':
        this.currentTool.pushToBack(this.selectedShape);
        break;
    }
  }

  setToolbarItem(id: string) {
    this.currentToolbarItem = id;
  }

}
