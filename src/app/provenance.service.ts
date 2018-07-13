import { Injectable } from '@angular/core';

import {
  ProvenanceGraph,
  ProvenanceTracker,
  ProvenanceGraphTraverser,
  ActionFunctionRegistry,
} from '@visualstorytelling/provenance-core';

@Injectable({
  providedIn: 'root'
})
export class ProvenanceService {
  public graph: ProvenanceGraph;
  public registry: ActionFunctionRegistry;
  public tracker: ProvenanceTracker;
  public traverser: ProvenanceGraphTraverser;

  constructor() {
    this.graph = new ProvenanceGraph({ name: 'brainvis', version: '1.0.0' });
    this.registry = new ActionFunctionRegistry();
    this.tracker = new ProvenanceTracker(this.registry, this.graph);
    this.traverser = new ProvenanceGraphTraverser(this.registry, this.graph, this.tracker);

    // todo: remove objects from window (used for dev / debug)
    const w = window as any;
    w.graph = this.graph;
    w.registry = this.registry;
    w.tracker = this.tracker;
    w.traverser = this.traverser;
  }
}
