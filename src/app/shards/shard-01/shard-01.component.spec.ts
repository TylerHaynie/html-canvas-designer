import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Shard01Component } from './shard-01.component';

describe('Shard01Component', () => {
  let component: Shard01Component;
  let fixture: ComponentFixture<Shard01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Shard01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Shard01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
