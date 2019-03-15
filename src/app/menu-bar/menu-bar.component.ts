import { Component, Input, OnInit } from '@angular/core';
import { BrainvisCanvasComponent } from '../brainvis-canvas/brainvis-canvas.component';
import { ProvenanceService } from '../provenance.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  @Input() canvas: BrainvisCanvasComponent;
  protected now: string;
  constructor(public provenance: ProvenanceService) {

  }

  ngOnInit() {
    setInterval(() => {
      const date = new Date();
      this.now = `${date.getHours()}:${date.getMinutes()}`;
    }, 1000);
  }

}
