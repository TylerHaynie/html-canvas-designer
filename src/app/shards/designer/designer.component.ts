import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { RectangleTool } from './canvas/tools/rectangleTool';
import { Utils } from './canvas/utils';
import { Tool } from './canvas/interfaces/tool';
import { Point } from './canvas/models/point';
import { Grid } from './canvas/items/grid';
import { GridArrows } from './canvas/items/grid-arrows';
import { Text } from './canvas/items/text';
import { Rectangle } from './canvas/shapes/rectangle';
import { Size } from './canvas/models/size';

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
  private tools: Tool[] = [];

  private currentTool: Tool;
  private pointerLocation: Point = new Point(0, 0);
  private trackMouse: boolean = true;


  drawGrid: boolean = true;
  gridCellSize: number = 10;

  constructor() {

  }

  ngOnInit() {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');
    this.registerEvents();

    // this.draw = new Draw(this.context);
    this.utils = new Utils();

    this.paint();
  }

  registerEvents() {

    // fixes a problem where double clicking causes text to get selected on the canvas
    this.canvasRef.nativeElement.addEventListener('selectstart', function (e) {
      e.preventDefault(); return false;
    },
      false);

    this.canvasRef.nativeElement.onmousedown = (e) => {
      this.onMouseDown(e);
    };

    this.canvasRef.nativeElement.onmousemove = (e) => {
      this.onMouseMove(e);
    };
  }

  paint() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    this.context.lineWidth = 5;
    if (this.drawGrid) {
      let grid = new Grid(this.context, this.gridCellSize, '#252525', 3);
      grid.draw();
    }

    if (this.trackMouse) {
      let gridArrows = new GridArrows(this.context, this.pointerLocation, this.context.canvas.width, this.context.canvas.height);
      gridArrows.draw();
    }

    // let rect = new Rectangle(this.context, new Point(200, 200), new Size(55, 55));
    // rect.draw();

    this.tools.forEach(tool => {
      tool.shapes.forEach(shape => {
        shape.draw();
      });
    });

    let text = new Text(this.context, 'Hello', new Point(40, 40), 'yellow', 'red', 8);
    text.draw();


    // this.context.strokeText("Hello World",10,50);

    requestAnimationFrame(() => this.paint());
  }

  onMouseDown(e: MouseEvent) {
    let p = this.utils.getMousePosition(this.context, e);

    if (this.currentTool != null) {
      this.currentTool.useTool(this.context, p);
    }
  }

  onMouseMove(e: MouseEvent) {
    let p = this.utils.getMousePosition(this.context, e);
    this.pointerLocation = p;
  }

  setTool(id: string) {
    if (this.tools == null) {
      this.tools = [];
    }

    switch (id) {
      case 'rectangle':
        this.currentTool = new RectangleTool();

        break;
    }

    if (!this.tools.includes(this.currentTool)) {
      this.tools.push(this.currentTool);
    }
  }

}
