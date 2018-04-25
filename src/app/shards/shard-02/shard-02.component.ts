import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Canvas } from './parts/canvas';

@Component({
  selector: 'shard-02',
  templateUrl: './shard-02.component.html',
  styleUrls: ['./shard-02.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Shard02Component implements OnInit, OnDestroy {
  @ViewChild('theCanvas') canvasRef: ElementRef;
  private context: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');

    this.paint();
  }

  ngOnDestroy() {

  }

  private paint() {

    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(300, 150);
    this.context.strokeStyle = 'green';
    this.context.stroke();

    // requestAnimationFrame(() => this.paint());
  }


}
