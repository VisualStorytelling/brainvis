import { Component, Input, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { BrainvisCanvasComponent } from '../brainvis-canvas/brainvis-canvas.component';
import { StyledSliderComponent } from './styled-slider/styled-slider.component';

@Component({
  selector: 'app-brainvis-canvas-controls',
  templateUrl: './brainvis-canvas-controls.component.html',
  styleUrls: ['./brainvis-canvas-controls.component.scss']
})
export class BrainvisCanvasControlsComponent {
  @Input() canvas: BrainvisCanvasComponent;

  min = 1;
  max = 9;
  step = 2;
}
