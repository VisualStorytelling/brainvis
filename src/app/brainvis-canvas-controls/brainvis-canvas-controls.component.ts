import { Component, Input, OnInit } from '@angular/core';
import { BrainvisCanvasComponent } from '../brainvis-canvas/brainvis-canvas.component';

@Component({
  selector: 'app-brainvis-canvas-controls',
  templateUrl: './brainvis-canvas-controls.component.html',
  styleUrls: ['./brainvis-canvas-controls.component.css']
})
export class BrainvisCanvasControlsComponent {
  @Input() canvas: BrainvisCanvasComponent;
}
