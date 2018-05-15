import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utils } from '../../libs/canvas/utils';
import { Marker } from './models/marker';
import { Point } from './models/point';
import { CanvasImage } from '../../libs/canvas/shapes/canvas-image';
import { SCALE_DIRECTION } from '../../libs/canvas/enums/scale-direction';

@Component({
  selector: 'image-marker',
  templateUrl: './image-marker.component.html',
  styleUrls: ['./image-marker.component.css']
})
export class ImageMarkerComponent implements OnInit {
  @ViewChild('c') canvasRef: ElementRef;

  markingImage: boolean = false;
  editMode: boolean = false;

  private canvasImage: CanvasImage;
  private imageLoaded: boolean = false;
  private selectedMarker: Marker;

  private context: CanvasRenderingContext2D;
  private utils = new Utils();

  private pointerLocation: Point;
  private pixelLocation: Point;
  private dragOffsetX: number;
  private dragOffsetY: number;

  constructor() { }

  ngOnInit() {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');
    this.canvasRef.nativeElement.tabIndex = 1000; // canvas needs a tabindex so we can listen for keyboard events
    this.canvasRef.nativeElement.style.outline = 'none'; // removing the focus outline

    this.utils = new Utils();

    this.registerEvents();
    this.draw();
  }

  registerEvents() {
    this.canvasRef.nativeElement.onmousemove = (e) => {
      this.onMouseMove(e);
    };

    this.canvasRef.nativeElement.onmousedown = (e) => {
      this.onMouseDown(e);
    };
  }

  toggleMarking() {
    this.markingImage = !this.markingImage;
  }

  loadImage(event) {
    if (event.target.files.length > 0) {
      this.canvasImage = new CanvasImage(this.context, new Point(0, 0), URL.createObjectURL(event.target.files[0]));

      this.canvasImage.image.onload = () => {
        this.imageLoaded = true;
      };
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    if (this.imageLoaded) {
      this.canvasImage.draw();
    }

    if (this.selectedMarker) {
      this.selectedMarker.draw();
    }

    requestAnimationFrame(() => this.draw());
  }

  zoom(zoomDirection: SCALE_DIRECTION) {
    this.canvasImage.zoom(zoomDirection);

    this.selectedMarker.changeParentScale(this.canvasImage.scale);
    console.log(`Zoom: ${this.canvasImage.zoomPercentage}%`);
  }

  //#region MOUSE EVENTS

  onMouseDown(e: MouseEvent) {
    if (this.editMode) {
      if (this.selectedMarker) {
        this.selectedMarker.point = this.pointerLocation;
      }
      else {
        console.log('drawing marker');
        this.selectedMarker = new Marker(this.context, 12345, ['String 1', 'string 2'], this.pointerLocation, '999');
      }
    }
  }

  onMouseMove(e: MouseEvent) {
    this.pointerLocation = this.utils.getMousePosition(this.context, e);

    if (this.selectedMarker) {
      this.selectedMarker.checkHover(this.pointerLocation);
    }
  }

  //#endregion

}
