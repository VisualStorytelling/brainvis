import { Component, Input, OnInit } from '@angular/core';
import { ProvenanceSlidesComponent } from '../provenance-slides/provenance-slides.component';

@Component({
  selector: 'app-slide-annotations',
  templateUrl: './slide-annotations.component.html',
  styleUrls: ['./slide-annotations.component.css']
})
export class SlideAnnotationsComponent implements OnInit {
  @Input() slides: ProvenanceSlidesComponent;
  constructor() {
  }

  ngOnInit() {
    console.log(this.slides.deck);

  }

}
