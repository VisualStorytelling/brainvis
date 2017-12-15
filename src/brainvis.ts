
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
        this.canvas.addEventListener('cameraStart', this.cameraStart);
        this.canvas.addEventListener('cameraEnd', this.cameraEnd);
        this.canvas.addEventListener('sliceChanged',this.sliceChanged);
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

    cameraStart = (event) => {
        this.orientationStart = event.orientation;
    }

    cameraEnd = (event) => {
        const orientationEnd = event.orientation;

        this.setControlOrientation(this.orientationStart, orientationEnd);
    }

    sliceChanged = (event) => {
        const oldPosition: ISlicePosition = {position: event.changes.oldPosition, direction: event.changes.oldDirection};
        const newPosition: ISlicePosition = {position: event.changes.position, direction: event.changes.direction};
        this.setSlicePosition(oldPosition, newPosition);
    }

    setSlicePosition(oldSlicePosition: ISlicePosition, newSlicePosition: ISlicePosition) {
        return this.graph.push(BrainvisCommands.setSlicePosition(this.ref, { old: oldSlicePosition, new: newSlicePosition }));
    }

    setControlOrientation(oldOrientation: IOrientation, newOrientation: IOrientation) {
        const orientations = { old: oldOrientation, new: newOrientation };
        return this.graph.push(BrainvisCommands.setControlOrientation(this.ref, orientations));
    }

    setControlOrientationImpl(orientation: IOrientation, within:number) {
        return this.canvas.setControlOrientation(orientation, within);
    }

    setSlicePositionImpl(newPosition: ISlicePosition, within:number) {
        return this.canvas.setSlicePlanePosition(newPosition, within);
    }
}

export function create(parent: Element, provGraph: prov.ProvenanceGraph) {
    return new Brainvis(parent, provGraph);
}
