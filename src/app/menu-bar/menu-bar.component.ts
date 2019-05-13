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
    { name: 'adi_brain', url: 'https://rawcdn.githack.com/VisualStorytelling/data/94dd382a51958824eb6bf4cf529f5b7bce383f99/fnndsc/adi_brain.nii.gz' },
    { name: 'adi_slice', url: 'https://rawcdn.githack.com/VisualStorytelling/data/94dd382a51958824eb6bf4cf529f5b7bce383f99/fnndsc/adi_slice.nii.gz' },
    { name: 'carp', url: 'https://rawcdn.githack.com/VisualStorytelling/data/94dd382a51958824eb6bf4cf529f5b7bce383f99/mricrogl/carp.nii.gz' },
    { name: 'chris t1', url: 'https://rawcdn.githack.com/VisualStorytelling/data/94dd382a51958824eb6bf4cf529f5b7bce383f99/mricrogl/chris_t1.nii.gz' },
    { name: 'visiblehuman', url: 'https://rawcdn.githack.com/VisualStorytelling/data/94dd382a51958824eb6bf4cf529f5b7bce383f99/mricrogl/visiblehuman.nii.gz' }
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
