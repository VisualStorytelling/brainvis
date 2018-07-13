import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ProvenanceService } from '../provenance.service';

import {
  ProvenanceSlide,
  ProvenanceSlidedeck,
  ProvenanceSlidedeckVisualization,
  ProvenanceSlidePlayer,
} from '../../../../provenance-slide-deck';
// todo: update to normal node_modules path when published

@Component({
  selector: 'app-provenance-slides',
  template: '<button mat-button color="primary" (click)="addSlide()">Add slide</button><div id="slideDeck"></div>',
  styleUrls: ['./provenance-slides.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProvenanceSlidesComponent implements OnInit {
  private _deck: ProvenanceSlidedeck;
  private _deckViz: ProvenanceSlidedeckVisualization;
  constructor(private elementRef: ElementRef, private provenance: ProvenanceService) {

  }

  addSlide() {
    this._deck.addSlide(new ProvenanceSlide('slide', 1000, 1000));
  }

  ngOnInit() {
    this._deck = new ProvenanceSlidedeck(this.provenance.graph.application, this.provenance.traverser);
    this._deckViz = new ProvenanceSlidedeckVisualization(this._deck, this.elementRef.nativeElement.children[1]);
  }

}
