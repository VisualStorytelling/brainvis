import { ProvenanceTracker } from '@visualstorytelling/provenance-core';
import { debounce } from 'lodash';
import { BrainvisCanvasComponent } from './brainvis-canvas.component';

export const addListeners = (tracker: ProvenanceTracker, canvas: BrainvisCanvasComponent) => {
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

  canvas.onShowSlice.subscribe(val => {
    tracker.applyAction({
      do: 'showSlice',
      doArguments: [val],
      undo: 'showSlice',
      undoArguments: [!val],
    }, true);
  });

  canvas.onShowSliceHandle.subscribe(val => {
    tracker.applyAction({
      do: 'showSliceHandle',
      doArguments: [val],
      undo: 'showSliceHandle',
      undoArguments: [!val],
    }, true);
  });

  // canvas.addEventListener('sliceZoomChanged', console.log);
  // canvas.addEventListener('sliceVisibilityChanged', console.log);
  // canvas.addEventListener('sliceHandleVisibilityChanged', console.log);
  // canvas.addEventListener('sliceModeChanged', console.log);
  // canvas.addEventListener('objectsVisibilityChanged', console.log);
  // canvas.addEventListener('objectSelection', console.log);
  // canvas.addEventListener('sliceZoomChanged', console.log);
};
