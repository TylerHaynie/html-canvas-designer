import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'shard-01',
  templateUrl: './shard-01.component.html',
  styleUrls: ['./shard-01.component.css']
})
export class Shard01Component implements OnInit, AfterViewInit {
  generators = 5;
  pageColumns = 5;
  countSpanAsCell = false;
  autoFlow = 'row';
  boxesPerCell = 135;
  maxColumns = 5;


  ngOnInit(): void {
    this.createGenerator(this.generators, this.pageColumns, this.boxesPerCell);
  }

  ngAfterViewInit() {

  }

  // window.onload = () => {
  //   this.createGenerator(this.generators, this.pageColumns, this.boxesPerCell);
  // }

  createGenerator(cellCount, ColumnCount, squaredSpace) {
    let wrapper = document.getElementById('frame');
    wrapper.style.setProperty('grid-template-columns', `repeat(${ColumnCount}, 1fr`);
    if (wrapper) {
      for (let cellNumber = 1; cellNumber <= cellCount; ++cellNumber) {
        console.log('HERE?');
        let div = document.createElement('div');
        div.setAttribute('id', `cell-${cellNumber.toString()}`);
        div.classList.add('section');
        if (this.autoFlow) {
          div.style.setProperty('grid-auto-flow', this.autoFlow);
        }

        for (let ramainingBoxes = squaredSpace; ramainingBoxes > 0; --ramainingBoxes) {
          let newBox = this.createArea(cellNumber, ramainingBoxes);
          div.appendChild(newBox.box);
          if (this.countSpanAsCell) {
            ramainingBoxes -= newBox.columnSpan;
          }
        }
        wrapper.appendChild(div);

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
