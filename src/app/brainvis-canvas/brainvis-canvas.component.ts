import * as THREE from 'three';
import * as AMI from 'ami.js';

import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { IOrientation, ISlicePosition, View } from './utils/types';
import SliceManipulatorWidget from './utils/sliceManipulatorWidget';
import { ProvenanceService } from '../provenance.service';
import { registerActions } from './provenanceHelpers/provenanceActions';
import { addListeners } from './provenanceHelpers/provenanceListeners';
import { Settings } from './utils/settings';
import { Renderer2D } from './renderer2d';
import { Renderer3D } from './renderer3d';

@Component({
  selector: 'app-brainvis-canvas',
  templateUrl: './brainvis-canvas.component.html',
  styleUrls: ['./brainvis-canvas.component.css']
})
export class BrainvisCanvasComponent extends THREE.EventDispatcher implements OnInit {
  private _initialized = false;
  public settings = Settings.getInstance(this);
  private elem: Element;
  private views: View[] = [
    { // Left top view (TOP/AXIAL): Patient's top side towards camera, patient's right side to the left
      domId: 'r0',

      left: 0.0,
      top: 0.0,
      width: 0.5,
      height: 0.5,

      color: 0x121212,
      sliceOrientation: 'axial',
      sliceColor: 0xff1744,
      targetID: 0
    },
    { // Right top view: Perspective camera
      domId: 'r1',

      left: 0.5,
      top: 0.0,
      width: 0.5,
      height: 0.5,

      color: 0x121212,
      sliceOrientation: 'freeform',
      sliceColor: 0xffffff,
      targetID: 1
    },
    { // Left bottom view (FRONT/CORONAL): Patient's face towards camera, patient's right side to the left
      domId: 'r2',

      left: 0.5,
      top: 0.0,
      width: 0.5,
      height: 0.5,

      color: 0x121212,
      sliceOrientation: 'coronal',
      sliceColor: 0x76ff03,
      targetID: 2
    },
    { // Right bottom view (SIDE/SAGITTAL): Patient's left side towards camera, patient's face to the left
      domId: 'r3',

      left: 0.5,
      top: 0.5,
      width: 0.5,
      height: 0.5,

      color: 0x121212,
      sliceOrientation: 'sagittal',
      sliceColor: 0xffea00,
      targetID: 3
    },
  ];

  private textureTarget: THREE.WebGLRenderTarget;
  private contourHelper: AMI.ContourHelper;
  private contourScene: THREE.Scene;

  private _perspectiveRenderer: Renderer3D;
  private _axialRenderer: Renderer2D;
  private _coronalRenderer: Renderer2D;
  private _sagittalRenderer: Renderer2D;

  // extra variables to show mesh plane intersections in 2D renderers
  private clipPlaneAxial = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
  private clipPlaneCoronal = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
  private clipPlaneSagittal = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);

  private sliceManipulator: SliceManipulatorWidget;

  constructor(elem: ElementRef, provenance: ProvenanceService) {
    super();
    registerActions(provenance.registry, this);
    addListeners(provenance.tracker, this);
    this.elem = elem.nativeElement;
  }

  get perspectiveRenderer() {
    return this._perspectiveRenderer;
  }

  get initialized() {
    return this._initialized;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    [
      this._axialRenderer,
      this._perspectiveRenderer,
      this._coronalRenderer,
      this._sagittalRenderer
    ].forEach(renderer => {
      if (renderer.scene.children.length > 0) {
        renderer.onWindowResize();
      }
    });
  }

  ngOnInit() {
    // todo: remove object from window
    // (window as any).canvas = this;

    this._axialRenderer = new Renderer2D(this.views[0], this);
    this._perspectiveRenderer = new Renderer3D(this.views[1], this);
    this._coronalRenderer = new Renderer2D(this.views[2], this);
    this._sagittalRenderer = new Renderer2D(this.views[3], this);

    this._perspectiveRenderer.init();
    this._axialRenderer.init();
    this._coronalRenderer.init();
    this._sagittalRenderer.init();

    this.addEventListeners();
    this.animate();

    this.settings.measurementModeChange.subscribe(this.toggleMeasurementMode.bind(this));
  }

  toggleMeasurementMode(isEnabled: boolean) {
    this._axialRenderer.measurementMode = isEnabled;
    this._sagittalRenderer.measurementMode = isEnabled;
    this._coronalRenderer.measurementMode = isEnabled;
  }

  loadData(url: string) {
    let loader = new AMI.VolumeLoader();

    [
      this._axialRenderer,
      this._perspectiveRenderer,
      this._coronalRenderer,
      this._sagittalRenderer
    ].forEach(renderer => {
      const scene = renderer.scene;
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    });

    loader
      .load(url)
      .then(function () {
        const bcc = <BrainvisCanvasComponent>this;
        // merge files into clean series/stack/frame structure
        const series = loader.data[0].mergeSeries(loader.data)[0];
        loader.free();
        loader = null;

        const stack = series.stack[0];
        stack.prepare();

        // center 3d camera/control on the stack
        const centerLPS = stack.worldCenter();
        const perspectiveCamera = <THREE.PerspectiveCamera>bcc._perspectiveRenderer.camera;
        perspectiveCamera.lookAt(new THREE.Vector3(centerLPS.x, centerLPS.y, centerLPS.z));
        perspectiveCamera.updateProjectionMatrix();

        const perspectiveControls = <THREE.TrackballControls>bcc._perspectiveRenderer.controls;
        perspectiveControls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);

        // bounding box
        const boxHelper = new AMI.BoundingBoxHelper(stack);
        bcc._perspectiveRenderer.scene.add(boxHelper);

        // Freeform slice
        bcc._perspectiveRenderer.initHelpersStack(stack);

        // red slice
        bcc._axialRenderer.initHelpersStack(stack);
        bcc._perspectiveRenderer.scene.add(bcc._axialRenderer.scene);

        // yellow slice
        bcc._coronalRenderer.initHelpersStack(stack);
        bcc._perspectiveRenderer.scene.add(bcc._coronalRenderer.scene);

        // green slice
        bcc._sagittalRenderer.initHelpersStack(stack);
        bcc._perspectiveRenderer.scene.add(bcc._sagittalRenderer.scene);

        // Set initial threshold values for white balance
        bcc.settings.thresholdLowerBound = bcc._axialRenderer.stackHelper.stack.minMax[0];
        bcc.settings.thresholdUpperBound = bcc._axialRenderer.stackHelper.stack.minMax[1];
        bcc.settings.thresholdMinValue = bcc._axialRenderer.stackHelper.stack.minMax[0];
        bcc.settings.thresholdMaxValue = bcc._axialRenderer.stackHelper.stack.minMax[1];

        // Init render to texture target
        bcc.textureTarget = new THREE.WebGLRenderTarget(
          bcc._axialRenderer.domElement.clientWidth,
          bcc._axialRenderer.domElement.clientHeight,
          {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
          }
        );

        bcc.contourHelper = new AMI.ContourHelper(stack, bcc._axialRenderer.stackHelper.slice.geometry);
        bcc.contourHelper.canvasWidth = bcc.textureTarget.width;
        bcc.contourHelper.canvasHeight = bcc.textureTarget.height;
        bcc.contourHelper.textureToFilter = bcc.textureTarget.texture;
        bcc.contourScene = new THREE.Scene();
        bcc.contourScene.add(bcc.contourHelper);

        // create new mesh with Localizer shaders
        const plane1 = bcc._axialRenderer.stackHelper.slice.cartesianEquation();
        const plane2 = bcc._coronalRenderer.stackHelper.slice.cartesianEquation();
        const plane3 = bcc._sagittalRenderer.stackHelper.slice.cartesianEquation();

        // localizer axial slice
        bcc._axialRenderer.initHelpersLocalizer(stack, plane1, [
          { plane: plane2, color: new THREE.Color(bcc._coronalRenderer.stackHelper.borderColor) },
          { plane: plane3, color: new THREE.Color(bcc._sagittalRenderer.stackHelper.borderColor) },
        ]);

        // localizer coronal slice
        bcc._coronalRenderer.initHelpersLocalizer(stack, plane2, [
          { plane: plane1, color: new THREE.Color(bcc._axialRenderer.stackHelper.borderColor) },
          { plane: plane3, color: new THREE.Color(bcc._sagittalRenderer.stackHelper.borderColor) },
        ]);

        // localizer sagittal slice
        bcc._sagittalRenderer.initHelpersLocalizer(stack, plane3, [
          { plane: plane1, color: new THREE.Color(bcc._axialRenderer.stackHelper.borderColor) },
          { plane: plane2, color: new THREE.Color(bcc._coronalRenderer.stackHelper.borderColor) },
        ]);

        // // event listeners
        bcc._perspectiveRenderer.addEventListeners();
        bcc._axialRenderer.addEventListeners();
        bcc._coronalRenderer.addEventListeners();
        bcc._sagittalRenderer.addEventListeners();
        bcc._initialized = true;
      }.bind(this))
      .catch(function (error) {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
      });
  }

  onAxialChanged() {
    this._axialRenderer.updateLocalizer([this._coronalRenderer.localizerHelper, this._sagittalRenderer.localizerHelper]);
    this._axialRenderer.updateClipPlane(this.clipPlaneAxial);

    if (this.contourHelper) {
      this.contourHelper.geometry = this._axialRenderer.stackHelper.slice.geometry;
    }
  }

  onCoronalChanged() {
    this._coronalRenderer.updateLocalizer([this._axialRenderer.localizerHelper, this._sagittalRenderer.localizerHelper]);
    this._coronalRenderer.updateClipPlane(this.clipPlaneCoronal);
  }

  onSagittalChanged() {
    this._sagittalRenderer.updateLocalizer([this._axialRenderer.localizerHelper, this._coronalRenderer.localizerHelper]);
    this._sagittalRenderer.updateClipPlane(this.clipPlaneSagittal);
  }

  adjustLocalizersOnDoubleClick(ijk: any) {
    this._axialRenderer.stackHelper.index = ijk.getComponent((this._axialRenderer.stackHelper.orientation + 2) % 3);
    this._coronalRenderer.stackHelper.index = ijk.getComponent((this._coronalRenderer.stackHelper.orientation + 2) % 3);
    this._sagittalRenderer.stackHelper.index = ijk.getComponent((this._sagittalRenderer.stackHelper.orientation + 2) % 3);

    this.onAxialChanged();
    this.onCoronalChanged();
    this.onSagittalChanged();
  }

  addEventListeners() {
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    if (this._initialized) {
      this.render();
    }
  }

  render() {
    this._perspectiveRenderer.render();
    this._axialRenderer.render();
    this._coronalRenderer.render();
    this._sagittalRenderer.render();
  }

  setSlicePlanePosition(positions: ISlicePosition, within: number) {
    if (this._perspectiveRenderer.stackHelper) {
      this.sliceManipulator.changeSlicePosition(new THREE.Vector3(positions.position[0], positions.position[1], positions.position[2]),
        new THREE.Vector3(positions.direction[0], positions.direction[1], positions.direction[2]), within > 0 ? within : 1000);
    }
  }

  setSlicePlaneZoom(positions: ISlicePosition, within: number) {
    if (this._perspectiveRenderer.stackHelper) {
      this.sliceManipulator.changeSlicePosition(new THREE.Vector3(positions.position[0], positions.position[1], positions.position[2]),
        new THREE.Vector3(positions.direction[0], positions.direction[1], positions.direction[2]), within > 0 ? within : 1000);
    }
  }

  setSliceIndex(sliceOrientation: string, index: number) {
    switch (sliceOrientation) {
      case 'axial':
        this._axialRenderer.stackHelper.index = index;
        break;
      case 'coronal':
        this._coronalRenderer.stackHelper.index = index;
        break;
      case 'sagittal':
        this._sagittalRenderer.stackHelper.index = index;
        break;
      default:
        break;
    }
  }

  setPerspectiveCameraZoom(args: IOrientation, transitionTime: number) {
    this._perspectiveRenderer.setCameraOrientation(args, transitionTime);
  }
  setPerspectiveCameraOrientation(args: IOrientation, transitionTime: number) {
    this._perspectiveRenderer.setCameraOrientation(args, transitionTime);
  }
}
