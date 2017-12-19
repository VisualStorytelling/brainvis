
import * as prov from 'phovea_core/src/provenance';
import * as views from 'phovea_core/src/layout_view';

import { Rect } from 'phovea_core/src/geom';

import BrainvisCanvas from './webGLcanvas';
import * as BrainvisCommands from './cmds';
import { IOrientation, ISlicePosition } from './types';

class Brainvis extends views.AView {
    private dim: [number, number] = [100, 100];
    private bounds = new Rect(0, 0, 0, 0);
    private canvas: BrainvisCanvas;
    private orientationStart: IOrientation;
    private ref: prov.IObjectRef<Brainvis>;

    constructor(private elem: Element, private graph: prov.ProvenanceGraph) {
        super();
        this.ref = this.graph.findOrAddObject(this, 'Brainvis', 'visual');

        this.canvas = new BrainvisCanvas(elem, this.dim[0], this.dim[1]);
        this.canvas.addEventListener('zoomStart', this.zoomStart);
        this.canvas.addEventListener('zoomEnd', this.zoomEnd);
        this.canvas.addEventListener('cameraStart', this.cameraStart);
        this.canvas.addEventListener('cameraEnd', this.cameraEnd);
        this.canvas.addEventListener('sliceZoomChanged',this.sliceZoomChanged);
        this.canvas.addEventListener('sliceOrientationChanged',this.sliceOrientationChanged);
    }

    getBounds() {
        return this.bounds;
    }

    setBounds(x, y, w, h) {
        this.bounds = new Rect(x, y, w, h);
        this.dim = [w, h];
        this.canvas.setSize(w, h);
    }

    setInteractive(interactive: boolean) {
        this.canvas.setInteractive(interactive);
    }

    zoomStart = (event) => {
        this.orientationStart = event.orientation;
    }

    zoomEnd = (event) => {
        const orientationEnd = event.orientation;

        this.setControlZoom(this.orientationStart, orientationEnd);
    }

    cameraStart = (event) => {
        this.orientationStart = event.orientation;
    }

    cameraEnd = (event) => {
        const orientationEnd = event.orientation;

        this.setControlOrientation(this.orientationStart, orientationEnd);
    }

    //Slice zoom
    sliceZoomChanged = (event) => {
        const oldPosition: ISlicePosition = {position: event.changes.oldPosition, direction: event.changes.oldDirection};
        const newPosition: ISlicePosition = {position: event.changes.position, direction: event.changes.direction};
        this.setSliceZoom(oldPosition, newPosition);
    }

    setSliceZoom(oldSlicePosition: ISlicePosition, newSlicePosition: ISlicePosition) {
        return this.graph.push(BrainvisCommands.setSliceZoom(this.ref, { old: oldSlicePosition, new: newSlicePosition }));
    }

    setSliceZoomImpl(orientation: ISlicePosition, within:number) {
        return this.canvas.setSlicePlanePosition(orientation, within);
    }

    //Slice Orientation
    sliceOrientationChanged = (event) => {
        const oldPosition: ISlicePosition = {position: event.changes.oldPosition, direction: event.changes.oldDirection};
        const newPosition: ISlicePosition = {position: event.changes.position, direction: event.changes.direction};
        this.setSliceOrientation(oldPosition, newPosition);
    }

    setSliceOrientation(oldSlicePosition: ISlicePosition, newSlicePosition: ISlicePosition) {
        return this.graph.push(BrainvisCommands.setSliceOrientation(this.ref, { old: oldSlicePosition, new: newSlicePosition }));
    }

    setSliceOrientationImpl(orientation: ISlicePosition, within:number) {
        return this.canvas.setSlicePlanePosition(orientation, within);
    }

    //Control zoom
    setControlZoom(oldOrientation: IOrientation, newOrientation: IOrientation) {
        const orientations = { old: oldOrientation, new: newOrientation };
        return this.graph.push(BrainvisCommands.setControlZoom(this.ref, orientations));
    }

    setControlZoomImpl(orientation: IOrientation, within:number) {
        return this.canvas.setControlZoom(orientation, within);
    }

    //Control Orientation
    setControlOrientation(oldOrientation: IOrientation, newOrientation: IOrientation) {
        const orientations = { old: oldOrientation, new: newOrientation };
        return this.graph.push(BrainvisCommands.setControlOrientation(this.ref, orientations));
    }

    setControlOrientationImpl(orientation: IOrientation, within:number) {
        return this.canvas.setControlOrientation(orientation, within);
    }
}

export function create(parent: Element, provGraph: prov.ProvenanceGraph) {
    return new Brainvis(parent, provGraph);
}
