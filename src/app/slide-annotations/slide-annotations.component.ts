import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ProvenanceSlidesComponent } from '../provenance-slides/provenance-slides.component';
import { ProvenanceService } from '../provenance.service';

@Component({
  selector: 'app-slide-annotations',
  templateUrl: './slide-annotations.component.html',
  styleUrls: ['./slide-annotations.component.css']
})
export class SlideAnnotationsComponent implements OnInit {
  @Input() slides: ProvenanceSlidesComponent;

  public annotationText(): string {
    const selectedSlide = this.slides.deck.selectedSlide;
    if (!selectedSlide) {
      return '';
    }
    const annotation = selectedSlide.annotations[0];
    if (annotation) {
      return annotation.data;
    } else {
      return '';
    }
  }

  constructor(private elementRef: ElementRef, private provenance: ProvenanceService) {
  }

  ngOnInit() {
  }

}
