import * as THREE from 'three';
import * as AMI from 'ami.js';

import { Renderer2D } from './renderer2d';
import { EventEmitter, Output } from '@angular/core';
import { IPointPair } from './utils/types';

export default class Ruler {
  widget: any;
  renderer: Renderer2D;

  /**
   * "isNew" is set to false after creation is done (first mouse up event).
   */
  isNew: boolean;

  @Output() changed = new EventEmitter<{oldPoints: IPointPair, newPoints: IPointPair}>();
  @Output() created = new EventEmitter<IPointPair>();

  constructor(renderer: Renderer2D, evt: MouseEvent | null = null) {
    this.renderer = renderer;
    this.isNew = true;

    const {stackHelper, controls} = renderer;
    const stack = stackHelper._stack;

    let startPosition = new THREE.Vector3();

    if (evt) {
      /*
       * we need the mouse x,y position normalized (between -1, +1, where
       * this range spans the whole canvas) for the raycaster. Note that getBoundingClientRect includes
       * scroll offset, so if page is scrollable we need to corrent for scroll position.
       */
      const rect = this.renderer.domElement.getBoundingClientRect() as DOMRect;
      const mouse = {
        x: 2 * (evt.clientX - rect.x) / rect.width - 1,
        y: -2 * (evt.clientY - rect.y) / rect.height + 1,
      };

      // use a raycaster to get the 3D point on the slice mesh for the mouse event.
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.renderer.camera);
      const intersects = raycaster.intersectObject(stackHelper.slice.mesh);
      if (intersects.length > 0) {
        startPosition = intersects[0].point;
      }
    }

    this.widget = new AMI.RulerWidget(stackHelper.slice.mesh, controls, {
      lps2IJK: stack.lps2IJK,
      // todo: check if using this _spacing leads to the right scale
      pixelSpacing: stack._spacing.toArray(),
      // ultrasoundRegions: stack.frame[stackHelper.index].ultrasoundRegions,
      worldPosition: startPosition,
    });

    this.widget.update();

    // add eventlisteners for dragging etc.
    this.renderer.domElement.addEventListener('mouseup',   this.onMouseUp);
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown);
  }

  remove() {
    this.renderer.domElement.removeEventListener('mouseup',   this.onMouseUp);
    this.renderer.domElement.removeEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.removeEventListener('mousedown', this.onMouseDown);
    this.widget.free();
  }

  onMouseUp   = (evt) => {
    this.widget.onEnd(evt);

    if (this.isNew) {
      this.created.emit({
        p0: this.widget._handles[0].worldPosition,
        p1: this.widget._handles[1].worldPosition,
      });
    } else {
      this.changed.emit({
        oldPoints: {
          // todo: get actual old position (not possible with AMI ruler widget atm)
          p0: this.widget._handles[0].worldPosition,
          p1: this.widget._handles[1].worldPosition,
        },
        newPoints: {
          p0: this.widget._handles[0].worldPosition,
          p1: this.widget._handles[1].worldPosition,
        }
      });
    }

    this.isNew = false;
  }

  onMouseMove = (evt) => {
    this.widget.onMove(evt);
  }

  onMouseDown = (evt) => { this.widget.onStart(evt); };
}
