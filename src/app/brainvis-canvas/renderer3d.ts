import * as THREE from 'three';
import * as AMI from 'ami.js';
import { IAMIRenderer, View } from './utils/types';
import { AMIRenderer } from './amiRenderer';
import { BrainvisCanvasComponent } from './brainvis-canvas.component';

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
    this._controls = new AMI.TrackballControl(
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

    // resize event
    this._renderer.domElement.addEventListener('resize', this.onWindowResize, false);

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

      // set camera
      // const worldbb = stack.worldBoundingBox();
      // const lpsDims = new THREE.Vector3(
      //     (worldbb[1] - worldbb[0]) / 2,
      //     (worldbb[3] - worldbb[2]) / 2,
      //     (worldbb[5] - worldbb[4]) / 2
      // );

      // // box: {halfDimensions, center}
      // const box = {
      //     center: stack.worldCenter().clone(),
      //     halfDimensions: new THREE.Vector3(
      //         lpsDims.x + 10,
      //         lpsDims.y + 10,
      //         lpsDims.z + 10
      //     )
      // };

      // // init and zoom
      // const canvas = {
      //     width: this._domElement.clientWidth,
      //     height: this._domElement.clientHeight
      // };

      // this._camera.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
      // this._camera.box = box;
      // this._camera.canvas = canvas;
      // this._camera.orientation = this._sliceOrientation;
      // this._camera.update();
      // this._camera.fitBox(2, 1);

      // this._stackHelper.orientation = this._camera.stackOrientation;
      // this._stackHelper.index = Math.floor(
      //     this._stackHelper.orientationMaxIndex / 2
      // );
      this._scene.add(this._stackHelper);
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
}
