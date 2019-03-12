import { Component, Input, OnInit, ViewEncapsulation  } from '@angular/core';
import { Options } from 'ng5-slider';
import { BrainvisCanvasComponent } from '../brainvis-canvas/brainvis-canvas.component';
import { StyledSliderComponent } from './styled-slider/styled-slider.component';
import { ProvenanceService } from '../provenance.service';

@Component({
  selector: 'app-brainvis-canvas-controls',
  templateUrl: './brainvis-canvas-controls.component.html',
  styleUrls: ['./brainvis-canvas-controls.component.scss']
})
export class BrainvisCanvasControlsComponent {
  constructor(public provenance: ProvenanceService) {}

  @Input() canvas: BrainvisCanvasComponent;

  private availableColorMaps = [
    {value: 'grayscale', viewValue: 'Grayscale'},
    {value: 'pastels', viewValue: 'Colorful'}
  ];

  public min = 1;
  public max = 9;
  public step = 2;
  public selectedColorMap = 'grayscale';

  change(event) {
    if(event.isUserInput) {
      this.canvas.colorMap = event.source.value;
    }
  }
}
