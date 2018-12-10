import {
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  ProvenanceSlide,
  ProvenanceSlidedeck
} from '@visualstorytelling/provenance-core';
import { SlideDeckVisualization } from '@visualstorytelling/slide-deck-visualization';

import { ProvenanceService } from '../provenance.service';

@Component({
  selector: 'app-provenance-slides',
  template:
    '<button mat-button color="primary" (click)="addSlide()"></button><div id="slideDeck"></div>',
  styleUrls: ['./provenance-slides.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProvenanceSlidesComponent implements OnInit {
  private _deck: ProvenanceSlidedeck;
  private _deckViz: SlideDeckVisualization;

  constructor(
    private elementRef: ElementRef,
    private provenance: ProvenanceService
  ) {}

  get deck() {
    return this._deck;
  }

  addSlide() {
    const node = this._deck.graph.current;
    const slide = new ProvenanceSlide(node.label, 5000, 0, [], node);
    this._deck.addSlide(
      slide,
      this._deck.selectedSlide
        ? this._deck.slides.indexOf(this._deck.selectedSlide) + 1
        : this._deck.slides.length
    );
  }

  ngOnInit() {
    this._deck = new ProvenanceSlidedeck(
      this.provenance.graph.application,
      this.provenance.traverser
    );
    this._deckViz = new SlideDeckVisualization(
      this._deck,
      this.elementRef.nativeElement.children[1]
    );
  }
}
