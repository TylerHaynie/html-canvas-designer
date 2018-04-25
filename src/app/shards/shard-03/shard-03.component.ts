import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'shard-03',
  templateUrl: './shard-03.component.html',
  styleUrls: ['./shard-03.component.css']
})
export class Shard03Component implements OnInit {
  @ViewChild('c') canvasRef: ElementRef;

  context;
  constructor() { }

  ngOnInit() {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');
    this.paint();
  }

  paint() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    // changing font and color from default (inherits from page)
    this.context.font = 'bold 12px sans-serif';
    this.context.fillStyle = '#fff';

    this.makeGrid(30);

    // drawing random point
    let px = Math.floor(Math.random() * this.context.canvas.width) | 0;
    let py = Math.floor(Math.random() * this.context.canvas.height) | 0;
    this.drawPoint(px, py, 3);

    setTimeout(() => {
      requestAnimationFrame(() => this.paint());
    }, 1000);

  }

  makeGrid(cellSize = 10, color = '#333') {
    // verticle lines
    // start at 0.5 so the lines take up 1 whole pixel and not 2 halves
    for (let x = 0.5; x < this.context.canvas.width; x += cellSize) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.context.canvas.width);
    }

    // horizontal
    // start at 0.5 so the lines take up 1 whole pixel and not 2 halves
    for (let y = 0.5; y < this.context.canvas.height; y += cellSize) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.context.canvas.height, y);
    }

    this.context.strokeStyle = color;
    this.context.stroke();
  }

  drawPoint(x, y, size = 1, textEdge = 45) {
    // drawing maximim point
    this.context.fillRect(x, y, size, size);
    this.context.textAlign = 'right';
    this.context.textBaseline = 'bottom';

    let tx = x - 3;
    let ty = y - 3;

    if (x - textEdge <= 0) {
      tx += textEdge + size;
    }

    if (y + textEdge < 0) {
      ty += textEdge;
    }

    // let ty = y - 15 <= context.canvas.height ? y + 15 : y - 15 : y;

    this.context.fillText(`(${x}, ${y})`, tx, ty);
  }


}
