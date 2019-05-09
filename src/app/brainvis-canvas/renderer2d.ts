import * as THREE from 'three';
import * as AMI from 'ami.js';
import { IAMIRenderer, View } from './utils/types';
import { AMIRenderer } from './amiRenderer';
import { BrainvisCanvasComponent } from './brainvis-canvas.component';

export interface IMeasurement {
  start: THREE.Vector3;
  end: THREE.Vector3;
}

export class Renderer2D extends AMIRenderer implements IAMIRenderer {
  private measurement: IMeasurement | null;

  constructor(view: View, canvas: BrainvisCanvasComponent) {
    super(view, canvas);
    this._domElement = <HTMLElement>document.getElementById(view.domId);
    this._color = view.color; // 0x121212
    this._sliceOrientation = view.sliceOrientation; // 'axial'
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
    this._camera = new AMI.OrthographicCamera(
      this._domElement.clientWidth / -2,
      this._domElement.clientWidth / 2,
      this._domElement.clientHeight / 2,
      this._domElement.clientHeight / -2,
      1,
      1000
    );

    // controls
    this._controls = new AMI.TrackballOrthoControl(
      this._camera,
      this._domElement
    );
    this._controls.staticMoving = true;
    this._controls.noRotate = true;
    this._camera.controls = this._controls;

    // scene
    this._scene = new THREE.Scene();


    this._renderer.domElement.addEventListener('click', this.onClick.bind(this));

    // this.scene.add()

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

    this._localizerHelper = new AMI.LocalizerHelper(
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

  updateLocalizer(targetLocalizersHelpers) {
    const refHelper = this._stackHelper;
    const plane = refHelper.slice.cartesianEquation();
    this._localizerHelper.referencePlane = plane;

    // bit of a hack... works fine for this application
    for (let i = 0; i < targetLocalizersHelpers.length; i++) {
      for (let j = 0; j < 3; j++) {
        const targetPlane = targetLocalizersHelpers[i]['plane' + (j + 1)];
        if (
          targetPlane &&
          plane.x.toFixed(6) === targetPlane.x.toFixed(6) &&
          plane.y.toFixed(6) === targetPlane.y.toFixed(6) &&
          plane.z.toFixed(6) === targetPlane.z.toFixed(6)
        ) {
          targetLocalizersHelpers[i]['plane' + (j + 1)] = plane;
        }
      }
    }

    // update the geometry will create a new mesh
    this._localizerHelper.geometry = refHelper.slice.geometry;
  }

  updateClipPlane(clipPlane) {
    const vertices = this._stackHelper.slice.geometry.vertices;
    const p1 = new THREE.Vector3(vertices[0].x, vertices[0].y, vertices[0].z).applyMatrix4(
      this._stackHelper._stack.ijk2LPS
    );
    const p2 = new THREE.Vector3(vertices[1].x, vertices[1].y, vertices[1].z).applyMatrix4(
      this._stackHelper._stack.ijk2LPS
    );
    const p3 = new THREE.Vector3(vertices[2].x, vertices[2].y, vertices[2].z).applyMatrix4(
      this._stackHelper._stack.ijk2LPS
    );

    clipPlane.setFromCoplanarPoints(p1, p2, p3);

    const cameraDirection = new THREE.Vector3(1, 1, 1);
    cameraDirection.applyQuaternion(this._camera.quaternion);

    if (cameraDirection.dot(clipPlane.normal) > 0) {
      clipPlane.negate();
    }

    // resize event
    this._renderer.domElement.addEventListener('resize', this.onWindowResize, false);
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
    // data.forEach(function(object, key) {
    //   object.materialFront.clippingPlanes = [clipPlane1];
    //   object.materialBack.clippingPlanes = [clipPlane1];
    //   r1.renderer.render(object.scene, r1.camera, redTextureTarget, true);
    //   r1.renderer.clearDepth();
    //   redContourHelper.contourWidth = object.selected ? 3 : 2;
    //   redContourHelper.contourOpacity = object.selected ? 1 : 0.8;
    //   r1.renderer.render(redContourScene, r1.camera);
    //   r1.renderer.clearDepth();
    // });

    // localizer
    this._renderer.clearDepth();
    this._renderer.render(this._localizerScene, this._camera);
  }

  onWindowResize() {
    this._camera.canvas = {
      width: this._domElement.clientWidth,
      height: this._domElement.clientHeight,
    };
    this._camera.fitBox(2, 1);
    this._renderer.setSize(
      this._domElement.clientWidth,
      this._domElement.clientHeight
    );

    // update info to draw borders properly
    this._stackHelper.slice.canvasWidth = this._domElement.clientWidth;
    this._stackHelper.slice.canvasHeight = this._domElement.clientHeight;
    this._localizerHelper.canvasWidth = this._domElement.clientWidth;
    this._localizerHelper.canvasHeight = this._domElement.clientHeight;
  }

  onScroll(event) {
    super.onScroll(event);

    const oldIndex = this._stackHelper.index;

    if (event.delta > 0) {
      if (this._stackHelper.index >= this._stackHelper.orientationMaxIndex - 1) {
        return;
      }
      this._stackHelper.index += 1;
    } else {
      if (this._stackHelper.index <= 0) {
        return;
      }
      this._stackHelper.index -= 1;
    }

    const newIndex = this._stackHelper.index;

    this._canvas.dispatchEvent({
        type: 'sliceIndexChangeStart',
        changes: {
            sliceOrientation: this._sliceOrientation,
            newIndex: newIndex,
            oldIndex: oldIndex,
        }
    });

    this._canvas.dispatchEvent({
        type: 'sliceIndexChanged',
        changes: {
            sliceOrientation: this._sliceOrientation,
            newIndex: newIndex,
            oldIndex: oldIndex,
        }
    });
  }

  protected onClick(event) {
    super.onClick(event);
    const mouse = {
      x: ((event.clientX - this._domElement.offsetLeft) / this._domElement.clientWidth) * 2 - 1,
      y: -((event.clientY - this._domElement.offsetTop) / this._domElement.clientHeight) * 2 + 1,
    };

    // if measurementMode...

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({x: 0, y: 0}, this._camera);
    // const r = raycaster.intersectObject(this._stackhelper._slice);
    const r = raycaster.intersectObjects(this._scene.children);
    console.log(r);
    console.log(raycaster.intersectObject(this._localizerHelper));
    if (r.length === 1) {
      const dotGeometry = new THREE.Geometry();
      dotGeometry.vertices.push(r[0].point);
      const dotMaterial = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false, depthTest: false } );
      const dot = new THREE.Points( dotGeometry, dotMaterial );
      this.scene.add( dot );
    }

  }

  set measurementMode(isEnabled: boolean) {
    // toggle default controls to opposite of measurementMode
    // this._controls.enabled = !isEnabled;
  }
}
