
import * as prov from 'phovea_core/src/provenance';
import * as views from 'phovea_core/src/layout_view';

import { Rect } from 'phovea_core/src/geom';

import BrainvisCanvas from './brainvisWebGLcanvas';
import * as BrainvisCommands from './cmds';
import { Orientation } from './types';

class Brainvis extends views.AView {
    private dim: [number, number] = [100, 100];
    private bounds = new Rect(0, 0, 0, 0);
    private canvas: BrainvisCanvas;
    private orientationStart: Orientation;
    private ref: prov.IObjectRef<Brainvis>;

    constructor(private elem: Element, private graph: prov.ProvenanceGraph) {
        super();
        this.ref = this.graph.findOrAddObject(this, 'Brainvis', 'visual');

        this.canvas = new BrainvisCanvas(elem, this.dim[0], this.dim[1]);
        this.canvas.addEventListener('cameraStart', this.cameraStart);
        this.canvas.addEventListener('cameraEnd', this.cameraEnd);
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

    setControlOrientation(oldOrientation: Orientation, newOrientation: Orientation) {
        const orientations = { old: oldOrientation, new: newOrientation };
        return this.graph.push(BrainvisCommands.setControlOrientation(this.ref, orientations));
    }

    setControlOrientationImpl(orientation: Orientation) {
        return this.canvas.setControlOrientation(orientation);
    }
}

export function create(parent: Element, provGraph: prov.ProvenanceGraph) {
    return new Brainvis(parent, provGraph);
}
