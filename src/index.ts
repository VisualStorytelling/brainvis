import BrainvisCanvas from './webGLcanvas';

import {
  ProvenanceGraph,
  ProvenanceTracker,
  ProvenanceGraphTraverser,
  ActionFunctionRegistry,
} from '@visualstorytelling/provenance-core';

import { ProvenanceTreeVisualization } from '@visualstorytelling/provenance-tree-visualization';

import { registerCanvasActions } from "./provenance/actions";
import { addCanvasListeners } from "./provenance/listeners";

import './style.scss';

// import {
//   ProvenanceSlide,
//   ProvenanceSlidedeck,
//   ProvenanceSlidedeckVisualization,
//   ProvenanceSlidePlayer,
// } from '@visualstorytelling/provenance-slide-deck';


const canvas = new BrainvisCanvas(
  document.getElementById('gl_root'),
  500,
  500,
  console.log
);

const graph = new ProvenanceGraph({ name: 'brainvis', version: '1.0.0' });
const registry = new ActionFunctionRegistry();
const tracker = new ProvenanceTracker(registry, graph);
const traverser = new ProvenanceGraphTraverser(registry, graph);

registerCanvasActions(registry, canvas);
addCanvasListeners(tracker, canvas);

const provenanceTreeVisualization = new ProvenanceTreeVisualization(
  traverser,
  document.getElementById('provviz_root') as HTMLDivElement,
);
