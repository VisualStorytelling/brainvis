import BrainvisCanvas from './webGLcanvas';

import {
  ProvenanceGraph,
  ProvenanceTracker,
  ProvenanceGraphTraverser,
  ActionFunctionRegistry,
} from '@visualstorytelling/provenance-core';

import { ProvenanceTreeVisualization } from '@visualstorytelling/provenance-tree-visualization';

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

(window as any).graph = graph;

registry.register('setControlZoom', (args) =>
  Promise.resolve(canvas.setControlZoom(args, 500))
);

canvas.addEventListener('cameraStart', (startEvent) => {
  const cameraEndListener = (event) => {
    tracker.applyAction({
      do: 'setControlZoom',
      doArguments: [(event as any).orientation],
      undo: 'setControlZoom',
      undoArguments: [(startEvent as any).orientation],
    });
    canvas.removeEventListener('cameraEnd', cameraEndListener);
  };
  canvas.addEventListener('cameraEnd', cameraEndListener);
});

const provenanceTreeVisualization = new ProvenanceTreeVisualization(
  traverser,
  document.getElementById('provviz_root') as HTMLDivElement,
);


// canvas.addEventListener('sliceZoomChanged',this.sliceZoomChanged);
// canvas.addEventListener('sliceOrientationChanged',this.sliceOrientationChanged);
// canvas.addEventListener('sliceVisibilityChanged',this.sliceVisibilityChanged);
// canvas.addEventListener('sliceHandleVisibilityChanged',this.sliceHandleVisibilityChanged);
// canvas.addEventListener('sliceModeChanged',this.sliceModeChanged);
// canvas.addEventListener('objectsVisibilityChanged',this.objectsVisibilityChanged);
// canvas.addEventListener('objectSelection',this.selectionChanged);
