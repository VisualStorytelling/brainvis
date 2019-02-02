import { ProvenanceTracker } from '@visualstorytelling/provenance-core';
import { debounce } from 'lodash';
import { BrainvisCanvasComponent } from './brainvis-canvas.component';

export const addListeners = (tracker: ProvenanceTracker, canvas: BrainvisCanvasComponent) => {
  canvas.addEventListener('cameraStart', (startEvent) => {
    const cameraEndListener = (event) => {
      tracker.applyAction({
        metadata: {userIntent: 'exploration'},
        do: 'setControlOrientation',
        doArguments: [(event as any).orientation],
        undo: 'setControlOrientation',
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
        metadata: {
          userIntent: 'exploration',
          value: event.orientation
        },
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
    tracker.applyAction({
      metadata: {userIntent: 'exploration'},
      do: 'setSlicePlaneOrientation',
      doArguments: [position, direction],
      undo: 'setSlicePlaneOrientation',
      undoArguments: [oldPosition, oldDirection],
    });
  });

  canvas.addEventListener('sliceZoomChanged', (event: any) => {
    const { position, direction, oldPosition, oldDirection } = event.changes;
    tracker.applyAction({
      metadata: {userIntent: 'exploration'},
      do: 'setSlicePlaneZoom',
      doArguments: [position, direction],
      undo: 'setSlicePlaneZoom',
      undoArguments: [oldPosition, oldDirection],
    }, true);
  });

  canvas.showSliceChange.subscribe(val => {
    tracker.applyAction({
      metadata: {userIntent: 'configuration'},
      do: 'showSlice',
      doArguments: [val],
      undo: 'showSlice',
      undoArguments: [!val],
    }, true);
  });

  canvas.showSliceHandleChange.subscribe(val => {
    tracker.applyAction({
      metadata: {userIntent: 'configuration'},
      do: 'showSliceHandle',
      doArguments: [val],
      undo: 'showSliceHandle',
      undoArguments: [!val],
    }, true);
  });

  canvas.showObjectsChange.subscribe(val => {
    tracker.applyAction({
      metadata: {userIntent: 'configuration'},
      do: 'showObjects',
      doArguments: [val],
      undo: 'showObjects',
      undoArguments: [!val],
    }, true);
  });

  canvas.editModeChange.subscribe(val => {
    tracker.applyAction({
      metadata: {userIntent: 'configuration'},
      do: 'editMode',
      doArguments: [val],
      undo: 'editMode',
      undoArguments: [!val],
    }, true);
  });

  canvas.alignModeChange.subscribe(val => {
    tracker.applyAction({
      metadata: {userIntent: 'configuration'},
      do: 'alignMode',
      doArguments: [val],
      undo: 'alignMode',
      undoArguments: [!val],
    }, true);
  });

  canvas.selectedObjectsChange.subscribe(([newObjects, oldObjects]) => {
    tracker.applyAction({
      metadata: {userIntent: 'selection'},
      do: 'selectedObjects',
      doArguments: [newObjects],
      undo: 'selectedObjects',
      undoArguments: [oldObjects],
    }, true);
  });
};
