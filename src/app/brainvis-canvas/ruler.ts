import * as THREE from 'three';
import * as AMI from 'ami.js';

import { Renderer2D } from './renderer2d';

export default class Ruler {
  widget: any;
  renderer: Renderer2D;
  constructor(renderer: Renderer2D) {
    this.renderer = renderer;
    const {stackHelper, controls} = renderer;
    const stack = stackHelper._stack;

    this.widget = new AMI.RulerWidget(stackHelper.slice.mesh, controls, {
      lps2IJK: stack.lps2IJK,

      // todo: check if using this _spacing leads to the right scale
      pixelSpacing: stack._spacing.toArray(),
      // ultrasoundRegions: stack.frame[stackHelper.index].ultrasoundRegions,
      // worldPosition: new THREE.Vector3(),
    });

    this.widget.update();

    // add eventlisteners to override the defaults (e.g. disable move slice with mouse)
    this.renderer.domElement.addEventListener('mouseup', this.onMouseUp);
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown);
  }

  remove() {
    this.renderer.domElement.removeEventListener('mouseup', this.onMouseUp);
    this.renderer.domElement.removeEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.removeEventListener('mousedown', this.onMouseDown);
    this.widget.free();
  }

  onMouseUp = (evt) => {
    this.widget.onEnd(evt);
  }

  onMouseMove = (evt) => {
    this.widget.onMove(evt);
  }

  onMouseDown = (evt) => {
    this.widget.onStart(evt);
  }

}
