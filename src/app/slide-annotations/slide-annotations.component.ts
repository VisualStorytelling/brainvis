import { Component, Input, OnInit } from '@angular/core';
import { ProvenanceSlidesComponent } from '../provenance-slides/provenance-slides.component';
import { SlideAnnotation } from '@visualstorytelling/provenance-core';
import { toScreenCoordinates, registry, fromScreenCoordinates } from '../annotate';

@Component({
  selector: 'app-slide-annotations',
  templateUrl: './slide-annotations.component.html',
  styleUrls: ['./slide-annotations.component.css']
})
export class SlideAnnotationsComponent implements OnInit {
  @Input() slides: ProvenanceSlidesComponent;
  public JSON: any;
  public console: any;
  constructor() {
    // console.log(registry[0].fromScreenCoordinates({x: 100, y: 100}));
    // console.log(toScreenCoordinates({name: 'dummyAnnotator', x: 100, y: 100}));
    this.JSON = JSON;
    this.console = console;
  }

  ngOnInit() {
    console.log(this.slides.deck.selectedSlide);
  }

  get annotations() {
    const selectedSlide = this.slides.deck.selectedSlide;
    return selectedSlide ? selectedSlide.annotations : [];
  }

  updateAnnotation(annotation: SlideAnnotation, value: string) {
    annotation.data = { ...annotation.data, text: value };
  }

  dragEnd(annotation, event) {
    const annotatedCoordinates = fromScreenCoordinates({x: event.clientX, y: event.clientY});
    if (annotatedCoordinates) {
      annotation.data.coordinates = annotatedCoordinates;
    }
  }

  annotationXY(annotation: SlideAnnotation) {
    if (annotation.data.coordinates) {
      return toScreenCoordinates(annotation.data.coordinates);
    }
    return ({x: 0, y: 0});
  }

  newAnnotation() {
    this.slides.deck.selectedSlide.addAnnotation(
      new SlideAnnotation({text: ''})
    );
  }

}
