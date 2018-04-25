import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Draw } from './canvas/draw';
import { Point, Tool, Rectangle } from './canvas/models';
import { RectangleTool } from './canvas/tools/rectangleTool';
import { Utils } from './canvas/utils';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {
  @ViewChild('c') canvasRef: ElementRef;
  @Input() frameRate = 1;

  private draw: Draw;
  private utils: Utils;
  private context: CanvasRenderingContext2D;
  private currentTool: Tool;
  private pointerLocation: Point;

  drawGrid: boolean = true;
  gridCellSize: number = 10;

  constructor() {

  }

  ngOnInit() {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');
    this.registerEvents();

    this.draw = new Draw(this.context);
    this.utils = new Utils();

    this.paint();
  }

  registerEvents() {
    this.canvasRef.nativeElement.onmousedown = (e) => {
      this.onMouseDown(e);
    };

    this.canvasRef.nativeElement.onmousemove = (e) => {
      this.onMouseMove(e);
    };
  }

  paint() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = '#fff';

    if (this.drawGrid) {
      this.draw.drawGrid(this.gridCellSize);
    }


    // setTimeout(() => {
    //   requestAnimationFrame(() => this.paint());
    // }, Math.floor(1000 / this.frameRate));
  }

  onMouseDown(e: MouseEvent) {
    let p = this.utils.getMousePosition(this.context, e);

    if (this.currentTool != null) {
      this.currentTool.useTool(p);
    }
  }

  onMouseMove(e: MouseEvent) {
    let p = this.utils.getMousePosition(this.context, e);
    this.pointerLocation = p;
  }

  setTool(id: string) {
    switch (id) {
      case 'rectangle':
        this.currentTool = new RectangleTool(this.draw);
        break;
    }
  }



}
