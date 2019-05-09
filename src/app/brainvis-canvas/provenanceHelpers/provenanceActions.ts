import { ActionFunction, ActionFunctionRegistry } from '@visualstorytelling/provenance-core';
import { BrainvisCanvasComponent } from '../brainvis-canvas.component';

const getActions = (canvas: BrainvisCanvasComponent): {[key: string]: ActionFunction} => ({
  // setControlZoom: (args, transitionTime) => Promise.resolve(canvas.setControlZoom(args, transitionTime)),
  // setControlOrientation: (args, transitionTime) => Promise.resolve(canvas.setControlOrientation(args, transitionTime)),
  setSlicePlaneOrientation: (position, direction, transitionTime) =>
      Promise.resolve(canvas.setSlicePlanePosition({position, direction}, transitionTime)),
  setSlicePlaneZoom: (position, direction, transitionTime) =>
      Promise.resolve(canvas.setSlicePlaneZoom({position, direction}, transitionTime)),

  setSliceIndex: (sliceOrientation, index) => Promise.resolve(canvas.setSliceIndex(sliceOrientation, index)),
  setPerspectiveCameraZoomLevel: (args, transitionTime) => Promise.resolve(canvas.setPerspectiveCameraZoom(args, transitionTime)),
  setPerspectiveCameraOrientation: (args, transitionTime) => Promise.resolve(canvas.setPerspectiveCameraOrientation(args, transitionTime)),
});

export const registerActions = (registry: ActionFunctionRegistry, canvas: BrainvisCanvasComponent) => {
  const actions = getActions(canvas);

  Object.keys(actions).forEach(actionName => {
    registry.register(actionName, actions[actionName]);
  });
};
