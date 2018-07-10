import { Injectable } from '@angular/core';

import {
  ProvenanceGraph,
  ProvenanceTracker,
  ProvenanceGraphTraverser,
  ActionFunctionRegistry,
} from '@visualstorytelling/provenance-core';

import { ProvenanceTreeVisualization } from '@visualstorytelling/provenance-tree-visualization';

import {
  ProvenanceSlide,
  ProvenanceSlidedeck,
  ProvenanceSlidedeckVisualization,
  ProvenanceSlidePlayer,
} from '../../../provenance-slide-deck';
// todo: update to normal node_modules path when published

@Injectable({
  providedIn: 'root'
})
export class ProvenanceService {
  constructor() {
    console.log('creating provenance service');
  }
}
