import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { ProvenanceSlide, ProvenanceSlidedeck } from '@visualstorytelling/provenance-core';
import { SlideDeckVisualization } from '@visualstorytelling/slide-deck-visualization';

import { ProvenanceService } from '../provenance.service';
import { BrainvisCanvasComponent } from '../brainvis-canvas/brainvis-canvas.component';

@Component({
  selector: 'app-provenance-slides',
  template: '<div id="slideDeck"></div>',
  styleUrls: ['./provenance-slides.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProvenanceSlidesComponent implements OnInit {
  @Input() canvas: BrainvisCanvasComponent;

  private _deck: ProvenanceSlidedeck;
  private _deckViz: SlideDeckVisualization;

  constructor(private elementRef: ElementRef, private provenance: ProvenanceService) {
  }

  get deck() {
    return this._deck;
  }

  ngOnInit() {
    this._deck = new ProvenanceSlidedeck(this.provenance.graph.application, this.provenance.traverser);
    this._deckViz = new SlideDeckVisualization(this._deck, this.elementRef.nativeElement.children[0]);
    this._deck.screenShotProvider = () => this.canvas.getScreenShot();
    this._deck.autoScreenShot = true;
    (window as any).slideDeck = this._deck;
  }
}
