import BrainvisCanvas from "../webGLcanvas";
import { ActionFunctionRegistry } from '@visualstorytelling/provenance-core';

export const registerCanvasActions = (registry: ActionFunctionRegistry, canvas: BrainvisCanvas) => {
  registry.register(
    'setControlZoom', (args) => Promise.resolve(canvas.setControlZoom(args, 500))
  );
  registry.register(
    'setSlicePlaneOrientation', (position, direction) => Promise.resolve(
      canvas.setSlicePlanePosition({position, direction}, 500)
    )
  );
};
