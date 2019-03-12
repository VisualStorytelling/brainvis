import * as THREE from 'three';
import { TrackballControls } from 'ami.js';

export class Renderer3D {
  private _color = 0x121212;
  private _targetID = 1;
  private _initialized = false;

  private _domElement: HTMLCanvasElement;
  private _renderer: THREE.WebGLRenderer;
  private _camera: THREE.PerspectiveCamera;
  private _controls: TrackballControls;
  private _scene: THREE.Scene;
  private _light: THREE.Light;

  constructor(domElement: HTMLCanvasElement, color: number, targetID: number) {
    this._domElement = domElement;
    this._color = color; // 0x121212
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
    this._controls = new TrackballControls(
      this._camera,
      this._domElement
    );
    this._controls.rotateSpeed = 5.5;
    this._controls.zoomSpeed = 1.2;
    this._controls.panSpeed = 0.8;
    this._controls.staticMoving = true;
    this._controls.dynamicDampingFactor = 0.3;

    // scene
    this._scene = new THREE.Scene();

    // light
    this._light = new THREE.DirectionalLight(0xffffff, 1);
    this._light.position.copy(this._camera.position);
    this._scene.add(this._light);

    this._initialized = true;
  }
}
