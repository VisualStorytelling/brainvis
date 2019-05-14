import { ProvenanceTracker } from '@visualstorytelling/provenance-core';
import { debounce } from 'lodash';
import { BrainvisCanvasComponent } from '../brainvis-canvas.component';
import { Settings } from '../utils/settings';
import { Renderer2D } from '../renderer2d';
import { IPointPair } from '../utils/types';

export const addListeners = (tracker: ProvenanceTracker, canvas: BrainvisCanvasComponent) => {
  canvas.addEventListener('sliceOrientationChanged', (event: any) => {
    const { position, direction, oldPosition, oldDirection } = event.changes;
    tracker.applyAction({
      metadata: { userIntent: 'exploration' },
      do: 'setSlicePlaneOrientation',
      doArguments: [position, direction],
      undo: 'setSlicePlaneOrientation',
      undoArguments: [oldPosition, oldDirection],
    });
  });

  canvas.addEventListener('sliceZoomChanged', (event: any) => {
    const { position, direction, oldPosition, oldDirection } = event.changes;
    tracker.applyAction({
      metadata: { userIntent: 'exploration' },
      do: 'setSlicePlaneZoom',
      doArguments: [position, direction],
      undo: 'setSlicePlaneZoom',
      undoArguments: [oldPosition, oldDirection],
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



  // Slice Index Listener for all orientations - Debounced
  let sliceIndexEndListener: EventListener = null;
  const sliceIndexStartListener = (startEvent) => {
    canvas.removeEventListener('sliceIndexChanged', sliceIndexEndListener);
    sliceIndexEndListener = debounce((event) => {
      let label = '';
      switch (startEvent.changes.sliceOrientation) {
        case 'axial':
          label = 'Axial    #: ' + event.changes.newIndex;
          break;
        case 'coronal':
          label = 'Coronal  #: ' + event.changes.newIndex;
          break;
        case 'sagittal':
          label = 'Sagittal #: ' + event.changes.newIndex;
          break;
        default:
          label = 'strange index?';
      }
      tracker.applyAction({
        metadata: {
          userIntent: 'configuration',
          label: label
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
    perspectiveZoomEndListener = debounce((event) => {
      let label  = 'P ZOOM:';
          label += ' ' + event.orientation.position[0].toFixed(0);
          label += '/' + event.orientation.position[1].toFixed(0);
          label += '/' + event.orientation.position[2].toFixed(0);

      tracker.applyAction({
        metadata: {
          userIntent: 'exploration',
          label: label
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
    perspectiveOrientationEndListener = debounce((event) => {
      let label  = 'P XYZ :';
          label += ' ' + event.orientation.position[0].toFixed(0);
          label += '/' + event.orientation.position[1].toFixed(0);
          label += '/' + event.orientation.position[2].toFixed(0);
      tracker.applyAction({
        metadata: {
          userIntent: 'exploration',
          label: label
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


  canvas.renderers.forEach(renderer => {
    if (renderer instanceof Renderer2D) {
      renderer.rulerRemoved.subscribe((args) => {
        const action = {
          metadata: {
            userIntent: 'measurement',
            label: 'delete ruler'
          },
          do: 'deleteRuler',
          doArguments: [renderer.sliceOrientation],
          undo: 'createRuler',
          undoArguments: [renderer.sliceOrientation, args],
        };
        tracker.applyAction(action, true);
      });
      renderer.rulerCreated.subscribe((args) => {
        const action = {
          metadata: {
            userIntent: 'measurement',
            label: 'create ruler'
          },
          do: 'createRuler',
          doArguments: [renderer.sliceOrientation, args],
          undo: 'deleteRuler',
          undoArguments: [renderer.sliceOrientation],
        };
        tracker.applyAction(action, true);
      });

      renderer.rulerChanged.subscribe(({oldPoints, newPoints}: { oldPoints: IPointPair, newPoints: IPointPair}) => {
        const action = {
          metadata: {
            userIntent: 'measurement',
            label: 'update ruler'
          },
          do: 'updateRuler',
          doArguments: [renderer.sliceOrientation, newPoints],
          undo: 'updateRuler',
          undoArguments: [renderer.sliceOrientation, oldPoints],
        };
        console.log(action);
        tracker.applyAction(action, true);
      });
    }
  });

};
