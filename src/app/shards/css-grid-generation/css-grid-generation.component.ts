import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'css-grid-gen',
  templateUrl: './css-grid-generation.component.html',
  styleUrls: ['./css-grid-generation.component.css'],
  encapsulation: ViewEncapsulation.None // fix for dynamically created html and styling issue
})
export class CssGridGenerationComponent implements OnInit, AfterViewInit {
  generators = 25;
  pageColumns = 5;
  countSpanAsCell = false;
  autoFlow = 'row';
  boxesPerCell = 25;
  maxColumns = 4;

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.createGenerator(this.generators, this.pageColumns, this.boxesPerCell);
  }

  createGenerator(cellCount, ColumnCount, squaredSpace) {
    let wrapper = document.getElementById('frame');
    wrapper.style.setProperty('grid-template-columns', `repeat(${ColumnCount}, 1fr`);
    if (wrapper) {
      for (let cellNumber = 1; cellNumber <= cellCount; ++cellNumber) {
        let cell = document.createElement('div');
        cell.setAttribute('id', `cell-${cellNumber.toString()}`);
        cell.classList.add('section');
        if (this.autoFlow) {
          cell.style.setProperty('grid-auto-flow', this.autoFlow);
        }

        for (let ramainingBoxes = squaredSpace; ramainingBoxes > 0; --ramainingBoxes) {
          let newBox = this.createArea(cellNumber, ramainingBoxes);
          cell.appendChild(newBox.box);
          if (this.countSpanAsCell) {
            ramainingBoxes -= newBox.columnSpan;
          }
        }
        wrapper.appendChild(cell);

      }
    }
  }

  createArea(cellNumber, boxesRemaining) {
    let boxObject = this.createBox(this.maxColumns);
    let boxId = `${cellNumber.toString()}-${boxesRemaining.toString()}`;
    boxObject.box.setAttribute('id', `box-${boxId}`);
    return boxObject;
  }

  createBox(maxColumn) {
    let columnSpan = Math.floor(Math.random() * Math.floor(maxColumn) + 1);
    let rowSpan = Math.floor(Math.random() * (3)) + 1;
    let div = document.createElement('div');
    div.classList.add('box');
    div.style.setProperty('grid-row', `span ${rowSpan}`);
    div.style.setProperty('grid-column', `span ${columnSpan}`);
    return { box: div, columnSpan: columnSpan, rowSpan: rowSpan };
  }
}
