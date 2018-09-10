import { ActionFunction, ActionFunctionRegistry } from '@visualstorytelling/provenance-core';
import { BrainvisCanvasComponent } from './brainvis-canvas.component';

const getActions = (canvas: BrainvisCanvasComponent): {[key: string]: ActionFunction} => ({
  setControlZoom: (args) => Promise.resolve(canvas.setControlZoom(args, 500)),
  setSlicePlaneOrientation: (position, direction) => Promise.resolve(canvas.setSlicePlanePosition({position, direction}, 500)),
  showSlice: (value: boolean) => Promise.resolve(canvas.showSlice = value),
  showSliceHandle: (value: boolean) => Promise.resolve(canvas.showSliceHandle = value),
  showSegmentedObjects: (value: boolean) => Promise.resolve(canvas.showObjects = value),
  selectedObjects: (value: THREE.Object3D[]) => Promise.resolve(canvas.selectedObjects = value),
});

export const registerActions = (registry: ActionFunctionRegistry, canvas: BrainvisCanvasComponent) => {
  const actions = getActions(canvas);

  Object.keys(actions).forEach(actionName => {
    registry.register(actionName, actions[actionName]);
  });

};
