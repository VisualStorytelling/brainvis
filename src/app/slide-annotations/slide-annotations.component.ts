import { Component, Input, OnInit } from '@angular/core';
import { ProvenanceSlidesComponent } from '../provenance-slides/provenance-slides.component';
import { SlideAnnotation } from '@visualstorytelling/provenance-core';

@Component({
  selector: 'app-slide-annotations',
  templateUrl: './slide-annotations.component.html',
  styleUrls: ['./slide-annotations.component.css']
})
export class SlideAnnotationsComponent implements OnInit {
  @Input() slides: ProvenanceSlidesComponent;
  public JSON: any;
  constructor() {
    this.JSON = JSON;
  }

  ngOnInit() {
    console.log(this.slides.deck.selectedSlide);
  }

  get annotations() {
    const selectedSlide = this.slides.deck.selectedSlide;
    return  selectedSlide ? selectedSlide.annotations : [];
  }

  newAnnotation() {
    console.log('creating new annotation');
    const a = new SlideAnnotation({text: 'bladiebla'});
    this.slides.deck.selectedSlide.addAnnotation(a);
  }

}
