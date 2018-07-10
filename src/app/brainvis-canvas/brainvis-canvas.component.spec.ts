import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainvisCanvasComponent } from './brainvis-canvas.component';

describe('BrainvisCanvasComponent', () => {
  let component: BrainvisCanvasComponent;
  let fixture: ComponentFixture<BrainvisCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrainvisCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainvisCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
