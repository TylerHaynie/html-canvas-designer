import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utils } from '../../libs/canvas/utils';
import { Marker } from './models/marker';
import { Point } from './models/point';

@Component({
  selector: 'image-marker',
  templateUrl: './image-marker.component.html',
  styleUrls: ['./image-marker.component.css']
})
export class ImageMarkerComponent implements OnInit {
  @ViewChild('c') canvasRef: ElementRef;

  markingImage: boolean = false;
  editMode: boolean = false;

  private image = new Image;
  private imageLoaded: boolean = false;
  private selectedMarker: Marker;

  private context: CanvasRenderingContext2D;
  private utils = new Utils();

  private pointerLocation: Point;
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
    this.image.onload = () => {
      this.imageLoaded = true;
    };

    if (event.target.files.length > 0) {
      this.image.src = URL.createObjectURL(event.target.files[0]);
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    if (this.imageLoaded) {
      this.context.drawImage(this.image, 0, 0);
    }

    if (this.selectedMarker) {
      this.selectedMarker.draw();
    }

    requestAnimationFrame(() => this.draw());
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
