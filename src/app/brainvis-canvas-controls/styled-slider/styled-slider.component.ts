import { Component, Input, DoCheck } from '@angular/core';
import { BrainvisCanvasComponent } from '../../brainvis-canvas/brainvis-canvas.component';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-styled-slider',
  templateUrl: './styled-slider.component.html',
  styleUrls: ['./styled-slider.component.scss']
})
export class StyledSliderComponent implements DoCheck {
    @Input() canvas: BrainvisCanvasComponent;

    constructor() {}

    options: Options = {
      floor: 0,
      ceil: 1426,
      step: 1,
      showTicks: false
    };

    ngDoCheck() {
      let changeDetected = false;
      
      if (this.canvas.thresholdLowerBound !== this.options.floor) {
        changeDetected = true;
      }

      if (this.canvas.thresholdUpperBound !== this.options.ceil) {
        changeDetected = true;
      }

      if (changeDetected) {
        const newOptions: Options = Object.assign({}, this.options);
        newOptions.floor = this.canvas.thresholdLowerBound;
        newOptions.ceil = this.canvas.thresholdUpperBound;
  
        this.options = newOptions;
      }
    }
}