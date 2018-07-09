import BrainvisCanvas from "../webGLcanvas";
import { ProvenanceTracker } from '@visualstorytelling/provenance-core';
import { throttle, debounce } from 'lodash';

export const addCanvasListeners = (tracker: ProvenanceTracker, canvas: BrainvisCanvas) => {
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

  let zoomEndListener: EventListener = null;
  const zoomStartListener = (startEvent) => {
    canvas.removeEventListener('zoomEnd', zoomEndListener);
    zoomEndListener = debounce ((event) => {
      tracker.applyAction({
        do: 'setControlZoom',
        doArguments: [event.orientation],
        undo: 'setControlZoom',
        undoArguments: [startEvent.orientation],
      }, true);
    }, 500, { trailing: true });
    canvas.addEventListener('zoomEnd', zoomEndListener);
  };
  canvas.addEventListener('zoomStart', debounce(zoomStartListener, 500, { leading: true }));


  canvas.addEventListener('sliceOrientationChanged', (event: any) => {
    const { position, direction, oldPosition, oldDirection } = event.changes;
    console.log(position, direction, oldPosition, oldDirection);
    tracker.applyAction({
      do: 'setSlicePlaneOrientation',
      doArguments: [position, direction],
      undo: 'setSlicePlaneOrientation',
      undoArguments: [oldPosition, oldDirection],
    });
  });


  // canvas.addEventListener('sliceZoomChanged', console.log);
  // canvas.addEventListener('sliceVisibilityChanged', console.log);
  // canvas.addEventListener('sliceHandleVisibilityChanged', console.log);
  // canvas.addEventListener('sliceModeChanged', console.log);
  // canvas.addEventListener('objectsVisibilityChanged', console.log);
  // canvas.addEventListener('objectSelection', console.log);

  // canvas.addEventListener('sliceZoomChanged', console.log);

};
