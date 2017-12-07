
import * as prov from 'phovea_core/src/provenance';
import * as views from 'phovea_core/src/layout_view';

import { Rect } from 'phovea_core/src/geom';

import BrainvisCanvas from './brainvisWebGLcanvas';
import * as BrainvisCommands from './brainvisCmds';
import { start } from 'repl';

class Brainvis extends views.AView {
    private dim: [number, number] = [100, 100];
    private bounds = new Rect(0, 0, 0, 0);
    private canvas: BrainvisCanvas;
    private cameraMatrixStart: number[];
    private ref:prov.IObjectRef<Brainvis>;

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
        this.update();
    }

    setInteractive(interactive: boolean) {
        this.canvas.setInteractive(interactive);
    }

    cameraStart = (event) => {
        this.cameraMatrixStart = event.matrix;
    }

    cameraEnd = (event) => {
        const stopMatrix = event.matrix;
        const startMatrix = this.cameraMatrixStart;

        this.setCameraMatrix(startMatrix, stopMatrix);
    }

    setCameraMatrix(oldMatrix:number[], newMatrix:number[]) {
        const matrices = { oldMatrix, newMatrix };
        return this.graph.push(BrainvisCommands.setCameraMatrix(this.ref, matrices));
    }

    setCameraMatrixImpl(matrix:number[]) {
        return this.canvas.setCameraMatrix(matrix);
    }

    private update() { }
}

export function create(parent: Element, provGraph: prov.ProvenanceGraph) {
    return new Brainvis(parent, provGraph);
}
