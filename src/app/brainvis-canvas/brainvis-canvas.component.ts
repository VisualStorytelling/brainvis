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

export enum VIEWS {
  AXIAL = 'axial',
  SAGITTAL = 'sagittal',
  CORONAL = 'coronal',
  FREEFORM = 'freeform',
}

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
      sliceOrientation: VIEWS.AXIAL,
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
      sliceOrientation: VIEWS.FREEFORM,
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
      sliceOrientation: VIEWS.CORONAL,
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
      sliceOrientation: VIEWS.SAGITTAL,
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

  private _provenance: ProvenanceService;

  constructor(elem: ElementRef, provenance: ProvenanceService) {
    super();
    registerActions(provenance.registry, this);
    this._provenance = provenance;
    this.elem = elem.nativeElement;
  }

  get perspectiveRenderer() {
    return this._perspectiveRenderer;
  }

  get initialized() {
    return this._initialized;
  }

  getRenderer(view: VIEWS) {
    switch (view) {
      case VIEWS.SAGITTAL: return this._sagittalRenderer;
      case VIEWS.AXIAL: return this._axialRenderer;
      case VIEWS.CORONAL: return this._coronalRenderer;
      case VIEWS.FREEFORM: return this._perspectiveRenderer;
      default: throw new Error('no such view: ' + view);
    }
  }

  get renderers() {
    return [
      this._axialRenderer,
      this._perspectiveRenderer,
      this._coronalRenderer,
      this._sagittalRenderer
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.renderers.forEach(renderer => {
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

    this.renderers.forEach(renderer => renderer.init());

    this.addEventListeners();
    this.animate();

    this.settings.measurementModeChange.subscribe(this.toggleMeasurementMode.bind(this));
    addListeners(this._provenance.tracker, this);
  }

  toggleMeasurementMode(isEnabled: boolean) {
    this._axialRenderer.measurementMode = isEnabled;
    this._sagittalRenderer.measurementMode = isEnabled;
    this._coronalRenderer.measurementMode = isEnabled;
  }

  async loadData(url: string) {
    let loader = new AMI.VolumeLoader();

    this.renderers.forEach(renderer => {
      const scene = renderer.scene;
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    });

    try {
      await loader.load(url);
      // merge files into clean series/stack/frame structure
      const series = loader.data[0].mergeSeries(loader.data)[0];
      loader.free();
      loader = null;

      const stack = series.stack[0];
      stack.prepare();

      // center 3d camera/control on the stack
      const centerLPS = stack.worldCenter();
      const perspectiveCamera = <THREE.PerspectiveCamera>this._perspectiveRenderer.camera;
      perspectiveCamera.lookAt(new THREE.Vector3(centerLPS.x, centerLPS.y, centerLPS.z));
      perspectiveCamera.updateProjectionMatrix();

      const perspectiveControls = <THREE.TrackballControls>this._perspectiveRenderer.controls;
      perspectiveControls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);

      // bounding box
      const boxHelper = new AMI.BoundingBoxHelper(stack);
      this._perspectiveRenderer.scene.add(boxHelper);

      // Freeform slice
      this._perspectiveRenderer.initHelpersStack(stack);

      [this._coronalRenderer, this._axialRenderer, this._sagittalRenderer].forEach(renderer => {
        renderer.initHelpersStack(stack);
        this._perspectiveRenderer.scene.add(renderer.scene);
      });

      // Set initial threshold values for white balance
      this.settings.thresholdLowerBound = this._axialRenderer.stackHelper.stack.minMax[0];
      this.settings.thresholdUpperBound = this._axialRenderer.stackHelper.stack.minMax[1];
      this.settings.thresholdMinValue = this._axialRenderer.stackHelper.stack.minMax[0];
      this.settings.thresholdMaxValue = this._axialRenderer.stackHelper.stack.minMax[1];

      // Init render to texture target
      this.textureTarget = new THREE.WebGLRenderTarget(
        this._axialRenderer.domElement.clientWidth,
        this._axialRenderer.domElement.clientHeight,
        {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.NearestFilter,
          format: THREE.RGBAFormat,
        }
      );

      this.contourHelper = new AMI.ContourHelper(stack, this._axialRenderer.stackHelper.slice.geometry);
      this.contourHelper.canvasWidth = this.textureTarget.width;
      this.contourHelper.canvasHeight = this.textureTarget.height;
      this.contourHelper.textureToFilter = this.textureTarget.texture;
      this.contourScene = new THREE.Scene();
      this.contourScene.add(this.contourHelper);

      // create new mesh with Localizer shaders
      const plane1 = this._axialRenderer.stackHelper.slice.cartesianEquation();
      const plane2 = this._coronalRenderer.stackHelper.slice.cartesianEquation();
      const plane3 = this._sagittalRenderer.stackHelper.slice.cartesianEquation();

      // localizer axial slice
      this._axialRenderer.initHelpersLocalizer(stack, plane1, [
        {plane: plane2, color: new THREE.Color(this._coronalRenderer.stackHelper.borderColor)},
        {plane: plane3, color: new THREE.Color(this._sagittalRenderer.stackHelper.borderColor)},
      ]);

      // localizer coronal slice
      this._coronalRenderer.initHelpersLocalizer(stack, plane2, [
        {plane: plane1, color: new THREE.Color(this._axialRenderer.stackHelper.borderColor)},
        {plane: plane3, color: new THREE.Color(this._sagittalRenderer.stackHelper.borderColor)},
      ]);

      // localizer sagittal slice
      this._sagittalRenderer.initHelpersLocalizer(stack, plane3, [
        {plane: plane1, color: new THREE.Color(this._axialRenderer.stackHelper.borderColor)},
        {plane: plane2, color: new THREE.Color(this._coronalRenderer.stackHelper.borderColor)},
      ]);

      // // event listeners
      this.renderers.forEach(renderer => renderer.addEventListeners());
      this._initialized = true;
    } catch (error) {
      window.console.log('oops... something went wrong...');
      window.console.log(error);
    }
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
    this.renderers.forEach(renderer => renderer.render());
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

  setSliceIndex(sliceOrientation: VIEWS, index: number) {
    const renderer = this.getRenderer(sliceOrientation);
    renderer.stackHelper.index = index;
  }

  setPerspectiveCameraZoom(args: IOrientation, transitionTime: number) {
    this._perspectiveRenderer.setCameraOrientation(args, transitionTime);
  }
  setPerspectiveCameraOrientation(args: IOrientation, transitionTime: number) {
    this._perspectiveRenderer.setCameraOrientation(args, transitionTime);
  }
}
