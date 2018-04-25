import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CanvasTools } from '../../shared/canvasTools';
import { Point, Tool, Rectangle } from '../../shared/models';

@Component({
  selector: 'shard-03',
  templateUrl: './shard-03.component.html',
  styleUrls: ['./shard-03.component.css']
})
export class Shard03Component implements OnInit {
  @ViewChild('c') canvasRef: ElementRef;
  @Input() frameRate = 1;

  private tools: CanvasTools;
  private context: CanvasRenderingContext2D;
  private currentTool: Tool;

  currentPoints: Point[];
  rectangles: Rectangle[];

  constructor() {

  }

  ngOnInit() {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');

    // this.canvasRef.nativeElement.onclick = (e) => {
    //   this.onClick(e);
    // };

    this.canvasRef.nativeElement.onmousedown = (e) => {
      this.onMouseDown(e);
    };

    this.tools = new CanvasTools(this.context);
    this.paint();
  }

  paint() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = '#fff';

    this.tools.drawGrid(10);


    // setTimeout(() => {
    //   requestAnimationFrame(() => this.paint());
    // }, Math.floor(1000 / this.frameRate));
  }

  onMouseDown(e: MouseEvent) {
    let p = <Point>{ x: e.clientX, y: e.clientY };

    if (this.currentTool != null) {
      this.currentTool.useTool(p);
    }

  }

  setTool() {
    this.currentTool = <Tool>{
      name: 'Rectangle',
      id: 'rectangle',
      useTool: (point: Point) => {
        this.useTool(point);
      }
    };
  }

  useTool(point: Point) {
    console.log('using rectangle tool');
    if (this.currentPoints == null) {
      this.currentPoints = [];
    }

    this.currentPoints.push(point);
    this.tools.drawPoint(point, 3);

    console.log(this.currentPoints);
    if (this.currentPoints.length > 1) {

      let p1 = <Point>{ x: this.currentPoints[0].x, y: this.currentPoints[0].y };
      let p2 = <Point>{ x: this.currentPoints[1].x, y: this.currentPoints[1].y, };

      this.tools.drawRectangle(p2, p1, true);

      this.currentPoints = null;
    }
  }
}
