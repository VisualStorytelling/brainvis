import { Injectable } from '@angular/core';

import {
  ProvenanceGraph,
  ProvenanceTracker,
  ProvenanceGraphTraverser,
  ActionFunctionRegistry,
  serializeProvenanceGraph,
  restoreProvenanceGraph,
} from '@visualstorytelling/provenance-core';

const SAVE_STATUS = {
  IDLE: 'idle',
  SAVING: 'saving'
};

@Injectable({
  providedIn: 'root'
})
export class ProvenanceService {
  public graph: ProvenanceGraph;
  public registry: ActionFunctionRegistry;
  public tracker: ProvenanceTracker;
  public traverser: ProvenanceGraphTraverser;
  public initialized = false;

  public saveStatus = SAVE_STATUS.IDLE;

  public async saveGraph() {
    this.saveStatus = SAVE_STATUS.SAVING;
    const serializedGraph = JSON.stringify(serializeProvenanceGraph(this.graph));
    try {
      const saveResult = await fetch('https://us-central1-brainvis.cloudfunctions.net/save', {
        method: 'POST',
        body: JSON.stringify({ graph: serializedGraph })
      }).then(result => result.json());
      window.history.pushState({}, 'Brainvis', `?graph=${saveResult.key}`);
    } catch (e) {
      console.log(e);
    }
    this.saveStatus = SAVE_STATUS.IDLE;
  }

  private async tryRestoreGraph() {
    const parts = window.location.href.split('graph=');
    if (parts.length === 2) {
      const getResult = await fetch(`https://us-central1-brainvis.cloudfunctions.net/get?key=${parts[1]}`)
        .then(result => result.json());
      const graph = restoreProvenanceGraph(JSON.parse(getResult.graph));
      graph.current = graph.root;
      return graph;
    }
  }

  async init() {
    this.graph = await this.tryRestoreGraph() || new ProvenanceGraph({ name: 'brainvis', version: '1.0.0' });
    this.registry = new ActionFunctionRegistry();
    this.tracker = new ProvenanceTracker(this.registry, this.graph);
    this.traverser = new ProvenanceGraphTraverser(this.registry, this.graph, this.tracker);

    (window as any).prov = {
      graph: this.graph,
      registry: this.registry,
      tracker: this.tracker,
      traverser: this.traverser,
    };

  }

  constructor() {
    this.init().then(() => this.initialized = true);
  }
}
