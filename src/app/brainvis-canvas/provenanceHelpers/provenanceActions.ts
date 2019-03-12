import { ActionFunction, ActionFunctionRegistry } from '@visualstorytelling/provenance-core';
import { BrainvisCanvasComponent } from '../brainvis-canvas.component';

const getActions = (canvas: BrainvisCanvasComponent): {[key: string]: ActionFunction} => ({
  setControlZoom: (args, transitionTime) => Promise.resolve(canvas.setControlZoom(args, transitionTime)),
  setControlOrientation: (args, transitionTime) => Promise.resolve(canvas.setControlOrientation(args, transitionTime)),
  setSlicePlaneOrientation: (position, direction, transitionTime) =>
      Promise.resolve(canvas.setSlicePlanePosition({position, direction}, transitionTime)),
  setSlicePlaneZoom: (position, direction, transitionTime) =>
      Promise.resolve(canvas.setSlicePlaneZoom({position, direction}, transitionTime)),
  showSlice: (value: boolean) => Promise.resolve(canvas.settings.showSlice = value),
  showObjects: (value: boolean) => Promise.resolve(canvas.settings.showObjects = value),
  editMode: (value: boolean) => Promise.resolve(canvas.settings.editMode = value),
  alignMode: (value: boolean) => Promise.resolve(canvas.settings.alignMode = value),
  showSliceHandle: (value: boolean) => Promise.resolve(canvas.settings.showSliceHandle = value),
  // showSegmentedObjects: (value: boolean) => Promise.resolve(canvas.showObjects = value),
  selectedObjects: (value: THREE.Object3D[]) => Promise.resolve(canvas.settings.selectedObjects = value),
});

export const registerActions = (registry: ActionFunctionRegistry, canvas: BrainvisCanvasComponent) => {
  const actions = getActions(canvas);

  Object.keys(actions).forEach(actionName => {
    registry.register(actionName, actions[actionName]);
  });
};
