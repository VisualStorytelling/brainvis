import * as THREE from 'three';
import {
  CamerasOrthographic,
  ControlsOrthographic,
  HelpersStack,
  HelpersLocalizer
} from 'ami.js';

export class Renderer2D {
  private _color = 0x121212;
  private _sliceOrientation = 'axial';
  private _sliceColor = 0xff1744;
  private _targetID = 1;
  private _initialized = false;

  private _domElement: HTMLCanvasElement;
  private _renderer: THREE.WebGLRenderer;
  private _camera: CamerasOrthographic;
  private _controls: ControlsOrthographic;
  private _scene: THREE.Scene;
  private _light: THREE.Light;
  private _stackHelper: HelpersStack;
  private _localizerHelper: HelpersLocalizer;
  private _localizerScene: THREE.Scene;

  constructor(domElement: HTMLCanvasElement, color: number, sliceOrientation: string, sliceColor: number, targetID: number) {
    this._domElement = domElement;
    this._color = color; // 0x121212
    this._sliceOrientation = sliceOrientation; // 'axial'
    this._sliceColor = sliceColor; // 0xff1744
    this._targetID = targetID; // 1
  }

  init() {
    if (this._initialized) {
      return;
    }

    // renderer
    this._renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this._renderer.autoClear = false;
    this._renderer.localClippingEnabled = true;
    this._renderer.setSize(
      this._domElement.clientWidth,
      this._domElement.clientHeight
    );
    this._renderer.setClearColor(0x121212, 1);
    this._renderer.domElement.id = this._targetID.toString();
    this._domElement.appendChild(this._renderer.domElement);

    // camera
    this._camera = new CamerasOrthographic(
      this._domElement.clientWidth / -2,
      this._domElement.clientWidth / 2,
      this._domElement.clientHeight / 2,
      this._domElement.clientHeight / -2,
      1,
      1000
    );

    // controls
    this._controls = new ControlsOrthographic(
      this._camera,
      this._domElement
    );
    this._controls.staticMoving = true;
    this._controls.noRotate = true;
    this._camera.controls = this._controls;

    // scene
    this._scene = new THREE.Scene();

    this._initialized = true;
  }

  initHelpersStack(stack) {
    if (!this._initialized) {
      throw new UninitializedError();
    }

    this._stackHelper = new HelpersStack(stack);
    this._stackHelper.bbox.visible = false;
    this._stackHelper.borderColor = this._sliceColor;
    this._stackHelper.slice.canvasWidth = this._domElement.clientWidth;
    this._stackHelper.slice.canvasHeight = this._domElement.clientHeight;

    // set camera
    const worldbb = stack.worldBoundingBox();
    const lpsDims = new THREE.Vector3(
      (worldbb[1] - worldbb[0]) / 2,
      (worldbb[3] - worldbb[2]) / 2,
      (worldbb[5] - worldbb[4]) / 2
    );

    // box: {halfDimensions, center}
    const box = {
      center: stack.worldCenter().clone(),
      halfDimensions: new THREE.Vector3(
        lpsDims.x + 10,
        lpsDims.y + 10,
        lpsDims.z + 10
      )
    };

    // init and zoom
    const canvas = {
      width: this._domElement.clientWidth,
      height: this._domElement.clientHeight
    };

    this._camera.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
    this._camera.box = box;
    this._camera.canvas = canvas;
    this._camera.orientation = this._sliceOrientation;
    this._camera.update();
    this._camera.fitBox(2, 1);

    this._stackHelper.orientation = this._camera.stackOrientation;
    this._stackHelper.index = Math.floor(
      this._stackHelper.orientationMaxIndex / 2
    );
    this._scene.add(this._stackHelper);
  }

  initHelpersLocalizer(stack, referencePlane, localizers) {
    if (!this._initialized) {
      throw new UninitializedError();
    }

    this._localizerHelper = new HelpersLocalizer(
      stack,
      this._stackHelper.slice.geometry,
      referencePlane
    );

    for (let i = 0; i < localizers.length; i++) {
      this._localizerHelper['plane' + (i + 1)] = localizers[i].plane;
      this._localizerHelper['color' + (i + 1)] = localizers[i].color;
    }

    this._localizerHelper.canvasWidth = this._domElement.clientWidth;
    this._localizerHelper.canvasHeight = this._domElement.clientHeight;

    this._localizerScene = new THREE.Scene();
    this._localizerScene.add(this._localizerHelper);
  }

  render() {
    if (!this._initialized) {
      throw new UninitializedError();
    }

    this._controls.update();
    this._renderer.clear();
    this._renderer.render(this._scene, this._camera);

    // mesh
    this._renderer.clearDepth();

    // localizer
    this._renderer.clearDepth();
    this._renderer.render(this._localizerScene, this._camera);
  }
}
