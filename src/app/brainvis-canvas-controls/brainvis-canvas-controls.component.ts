import { Component, Input, OnInit, ViewEncapsulation  } from '@angular/core';
import { BrainvisCanvasComponent } from '../brainvis-canvas/brainvis-canvas.component';
import { ProvenanceService } from '../provenance.service';

@Component({
  selector: 'app-brainvis-canvas-controls',
  templateUrl: './brainvis-canvas-controls.component.html',
  styleUrls: ['./brainvis-canvas-controls.component.scss']
})
export class BrainvisCanvasControlsComponent {
  @Input() canvas: BrainvisCanvasComponent;

  constructor(public provenance: ProvenanceService) {}

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
      this.canvas.settings.colorMap = event.source.value;
    }
  }
}
