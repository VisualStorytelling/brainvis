import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainvisCanvasControlsComponent } from './brainvis-canvas-controls.component';

describe('BrainvisCanvasControlsComponent', () => {
  let component: BrainvisCanvasControlsComponent;
  let fixture: ComponentFixture<BrainvisCanvasControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrainvisCanvasControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainvisCanvasControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
