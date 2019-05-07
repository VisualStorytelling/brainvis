import { Component, Input, OnInit } from '@angular/core';
import { BrainvisCanvasComponent } from '../brainvis-canvas/brainvis-canvas.component';
import { ProvenanceService } from '../provenance.service';

import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  @Input() canvas: BrainvisCanvasComponent;
  public now: string;
  constructor(public provenance: ProvenanceService) {

  }

  public dataSources = [
    { name: 'adi_brain', url: 'https://raw.githubusercontent.com/VisualStorytelling/data/master/fnndsc/adi_brain.nii.gz' },
    { name: 'adi_slice', url: 'https://raw.githubusercontent.com/VisualStorytelling/data/master/fnndsc/adi_slice.nii.gz' },
    { name: 'carp', url: 'https://raw.githubusercontent.com/VisualStorytelling/data/master/mricrogl/carp.nii.gz' },
    { name: 'chris t1', url: 'https://raw.githubusercontent.com/VisualStorytelling/data/master/mricrogl/chris_t1.nii.gz' },
    { name: 'visiblehuman', url: 'https://raw.githubusercontent.com/VisualStorytelling/data/master/mricrogl/visiblehuman.nii.gz' }
  ];

  public setDataSource(change: MatSelectChange) {
    this.canvas.loadData(change.value);
    // console.log(change.value);
  }

  ngOnInit() {
    const numFormat = (i: number) => ('0' + i).slice(-2);
    setInterval(() => {
      const date = new Date();
      this.now = `${numFormat(date.getHours())}:${numFormat(date.getMinutes())}`;
    }, 1000);
  }

}
