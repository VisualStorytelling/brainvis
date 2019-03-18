import { ProvenanceTracker } from '@visualstorytelling/provenance-core';
import { debounce } from 'lodash';
import { BrainvisCanvasComponent } from '../brainvis-canvas.component';
import { Settings } from '../utils/settings';

export const addListeners = (tracker: ProvenanceTracker, canvas: BrainvisCanvasComponent) => {
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

  canvas.settings.showSliceChange.subscribe(val => {
    tracker.applyAction({
      metadata: {userIntent: 'configuration'},
      do: 'showSlice',
      doArguments: [val],
      undo: 'showSlice',
      undoArguments: [!val],
    }, true);
  });

  canvas.settings.showSliceHandleChange.subscribe(val => {
    tracker.applyAction({
      metadata: {userIntent: 'configuration'},
      do: 'showSliceHandle',
      doArguments: [val],
      undo: 'showSliceHandle',
      undoArguments: [!val],
    }, true);
  });

  canvas.settings.showObjectsChange.subscribe(val => {
    tracker.applyAction({
      metadata: {userIntent: 'configuration'},
      do: 'showObjects',
      doArguments: [val],
      undo: 'showObjects',
      undoArguments: [!val],
    }, true);
  });

  canvas.settings.editModeChange.subscribe(val => {
    tracker.applyAction({
      metadata: {userIntent: 'configuration'},
      do: 'editMode',
      doArguments: [val],
      undo: 'editMode',
      undoArguments: [!val],
    }, true);
  });

  // canvas.settings.alignModeChange.subscribe(val => {
  //   tracker.applyAction({
  //     metadata: {userIntent: 'configuration'},
  //     do: 'alignMode',
  //     doArguments: [val],
  //     undo: 'alignMode',
  //     undoArguments: [!val],
  //   }, true);
  // });

  canvas.settings.selectedObjectsChange.subscribe(([newObjects, oldObjects]) => {
    tracker.applyAction({
      metadata: {userIntent: 'selection'},
      do: 'selectedObjects',
      doArguments: [newObjects],
      undo: 'selectedObjects',
      undoArguments: [oldObjects],
    }, true);
  });

  // Slice Index Listener for all orientations - Debounced
  let sliceIndexEndListener: EventListener = null;
  const sliceIndexStartListener = (startEvent) => {
    canvas.removeEventListener('sliceIndexChanged', sliceIndexEndListener);
    sliceIndexEndListener = debounce ((event) => {
      tracker.applyAction({
        metadata: {
          userIntent: 'exploration',
          sliceOrientation: startEvent.changes.sliceOrientation,
          delta: (event.changes.newIndex - startEvent.changes.oldIndex)
        },
        do: 'setSliceIndex',
        doArguments: [startEvent.changes.sliceOrientation, event.changes.newIndex],
        undo: 'setSliceIndex',
        undoArguments: [startEvent.changes.sliceOrientation, startEvent.changes.oldIndex],
      }, true);
    }, 500, { trailing: true });
    canvas.addEventListener('sliceIndexChanged', sliceIndexEndListener);
  };
  canvas.addEventListener('sliceIndexChangeStart', debounce(sliceIndexStartListener, 500, { leading: true }));

  // Perspective canvas zoom Listener - Debounced
  let perspectiveZoomEndListener: EventListener = null;
  const perspectiveZoomStartListener = (startEvent) => {
    canvas.removeEventListener('perspectiveCameraZoomChanged', perspectiveZoomEndListener);
    perspectiveZoomEndListener = debounce ((event) => {
      tracker.applyAction({
        metadata: {
          userIntent: 'exploration',
          value: event.orientation
        },
        do: 'setPerspectiveCameraZoomLevel',
        doArguments: [event.orientation],
        undo: 'setPerspectiveCameraZoomLevel',
        undoArguments: [startEvent.orientation],
      }, true);
    }, 500, { trailing: true });
    canvas.addEventListener('perspectiveCameraZoomChanged', perspectiveZoomEndListener);
  };
  canvas.addEventListener('perspectiveCameraZoomChangeStart', debounce(perspectiveZoomStartListener, 500, { leading: true }));

  // Perspective canvas orientation Listener - Debounced
  let perspectiveOrientationEndListener: EventListener = null;
  const perspectiveOrientationStartListener = (startEvent) => {
    canvas.removeEventListener('perspectiveCameraOrientationChanged', perspectiveOrientationEndListener);
    perspectiveOrientationEndListener = debounce ((event) => {
      tracker.applyAction({
        metadata: {
          userIntent: 'exploration',
          value: event.orientation
        },
        do: 'setPerspectiveCameraOrientation',
        doArguments: [event.orientation],
        undo: 'setPerspectiveCameraOrientation',
        undoArguments: [startEvent.orientation],
      }, true);
    }, 500, { trailing: true });
    canvas.addEventListener('perspectiveCameraOrientationChanged', perspectiveOrientationEndListener);
  };
  canvas.addEventListener('perspectiveCameraOrientationChangeStart', debounce(perspectiveOrientationStartListener, 500, { leading: true }));
};
