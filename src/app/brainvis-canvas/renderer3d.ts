import * as THREE from 'three';
import * as AMI from 'ami.js';
import { IAMIRenderer, View, IOrientation } from './utils/types';
import { AMIRenderer } from './amiRenderer';
import { BrainvisCanvasComponent, VIEWS } from './brainvis-canvas.component';
import { Trackball } from './utils/trackball';

export class Renderer3D extends AMIRenderer implements IAMIRenderer {
  constructor(view: View, canvas: BrainvisCanvasComponent) {
    super(view, canvas);
    this._domElement = document.getElementById(view.domId);
    this._color = view.color; // 0x121212
    this._sliceColor = view.sliceColor; // 0xff1744
    this._targetID = view.targetID; // 1
  }

  init() {
    if (this._initialized) {
      return;
    }

    // renderer
    this._renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this._renderer.setSize(
      this._domElement.clientWidth,
      this._domElement.clientHeight
    );
    this._renderer.setClearColor(this._color, 1);
    this._renderer.domElement.id = this._targetID.toString();
    this._domElement.appendChild(this._renderer.domElement);

    // camera
    this._camera = new THREE.PerspectiveCamera(
      45,
      this._domElement.clientWidth / this._domElement.clientHeight,
      0.1,
      100000
    );
    this._camera.position.x = 250;
    this._camera.position.y = 250;
    this._camera.position.z = 250;

    // controls
    this._controls = new Trackball( //new AMI.TrackballControl(
      this._camera,
      this._renderer.domElement as HTMLCanvasElement
    );
    this._controls.rotateSpeed = 5.5;
    this._controls.zoomSpeed = 1.2;
    this._controls.panSpeed = 0.8;
    this._controls.staticMoving = true;
    this._controls.dynamicDampingFactor = 0.3;
    this._controls.initEventListeners();

    // scene
    this._scene = new THREE.Scene();

    // light
    this._light = new THREE.DirectionalLight(0xffffff, 1);
    this._light.position.copy(this._camera.position);
    this._scene.add(this._light);

    // resize event
    this._renderer.domElement.addEventListener('resize', this.onWindowResize, false);

    this.addProvenanceHooks();
    this._initialized = true;
  }

  initHelpersStack(stack) {
    if (!this._initialized) {
      throw new UninitializedError();
    }

    this._stackHelper = new AMI.StackHelper(stack);
    this._stackHelper.bbox.visible = false;
    this._stackHelper.borderColor = this._sliceColor;
    this._stackHelper.slice.canvasWidth = this._domElement.clientWidth;
    this._stackHelper.slice.canvasHeight = this._domElement.clientHeight;

    this._stackHelper.orientation = this._camera.stackOrientation;
    this._stackHelper.index = Math.floor(
        this._stackHelper.orientationMaxIndex / 2
    );
  }

  lookAt(vec: THREE.Vector3) {
    this._camera.lookAt(vec);
  }

  render() {
    if (!this._initialized) {
      throw new UninitializedError();
    }

    this._controls.update();
    this._light.position.copy(this._camera.position);
    this._renderer.render(this._scene, this._camera);
  }

  onWindowResize() {
    this._camera.aspect = this._domElement.clientWidth / this._domElement.clientHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(this._domElement.clientWidth, this._domElement.clientHeight);
  }

  getCameraOrientation() {
    const position = this._controls.camera.position.toArray();
    const target = this._controls.target.toArray();
    const up = this._controls.camera.up.toArray();
    const orientation = { position, target, up };

    return orientation;
  }

  addProvenanceHooks() {
    this._controls.addEventListener('zoomstart', (event) => {
      const orientation = this.getCameraOrientation();

      this._canvas.dispatchEvent({
        type: 'perspectiveCameraZoomChangeStart',
        orientation
      });
    });

    this._controls.addEventListener('zoomend', (event) => {
      const orientation = this.getCameraOrientation();

      this._canvas.dispatchEvent({
        type: 'perspectiveCameraZoomChanged',
        orientation
      });
    });

    this._controls.addEventListener('start', (event) => {
      const orientation = this.getCameraOrientation();

      this._canvas.dispatchEvent({
        type: 'perspectiveCameraOrientationChangeStart',
        orientation
      });
    });

    this._controls.addEventListener('end', (event) => {
      const orientation = this.getCameraOrientation();

      this._canvas.dispatchEvent({
        type: 'perspectiveCameraOrientationChanged',
        orientation
      });
    });
  }

  onScroll(event) {
    super.onScroll(event);
  }

  setCameraOrientation(newOrientation: IOrientation, within: number) {
    this._controls.changeCamera(new THREE.Vector3(newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]),
      new THREE.Vector3(newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]),
      new THREE.Vector3(newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]),
      within > 0 ? within : 1000);
  }
}
