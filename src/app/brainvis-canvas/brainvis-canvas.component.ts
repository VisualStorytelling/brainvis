import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { View } from './view';

import * as THREE from 'three';
import * as AMI from 'ami.js';

import { IOrientation, ISlicePosition } from './types';

import Trackball from './trackball';
import SliceManipulatorWidget from './sliceManipulatorWidget';
import STLLoader from './stlLoader';
import { IntersectionManager, StaticGeometryListener } from './intersectionManager';
import ObjectSelector from './objectSelector';

// import AnnotationAnchorSelector from './annotationAnchorSelector';
import SegmentationVoxels from './segmentationVoxels';

import { ProvenanceService } from '../provenance.service';
import { registerActions } from './provenanceActions';
import { addListeners } from './provenanceListeners';

@Component({
  selector: 'app-brainvis-canvas',
  template: '',
  styleUrls: ['./brainvis-canvas.component.css']
})
export class BrainvisCanvasComponent extends THREE.EventDispatcher implements OnInit {
  private doViews = false;

  private _showSlice = true;
  private _showSliceDisabled = false;
  private _showSliceHandle = true;
  private _showSliceHandleDisabled = false;
  private _showObjects = true;
  private _showObjectsDisabled = false;
  private _editMode = false;
  private _editModeDisabled = true;
  private _quadView = false;
  private _quadViewDisabled = false;
  private _alignMode = false;
  private _sliceMouseDown = false;
  private objectSelector: ObjectSelector;
  private _segmentationIsDeleting = false;
  private _segmentationSize = 3;

  private _thresholdLowerBound = 0;
  private _thresholdUpperBound = 1426;
  private _thresholdMinValue = 10;
  private _thresholdMaxValue = 90;

  private _colorMap = 'grayscale';
  // private annotationAnchorSelector: AnnotationAnchorSelector;

  @Input() set showSlice(showSlice: boolean) {
    this._showSlice = showSlice;
    this.showSliceChange.emit(showSlice);
  }
  @Output() showSliceChange = new EventEmitter<boolean>();
  get showSlice() { return this._showSlice; }

  @Input() set showSliceDisabled(showSliceDisabled: boolean) {
    this._showSliceDisabled = showSliceDisabled;
  }
  get showSliceDisabled() { return this._showSliceDisabled; }

  @Input() set showSliceHandle(showSliceHandle: boolean) {
    this._showSliceHandle = showSliceHandle;
    this.showSliceHandleChange.emit(showSliceHandle);
  }
  @Output() showSliceHandleChange = new EventEmitter<boolean>();
  get showSliceHandle() { return this._showSliceHandle; }

  @Input() set showSliceHandleDisabled(showSliceHandleDisabled: boolean) {
    this._showSliceHandleDisabled = showSliceHandleDisabled;
  }
  get showSliceHandleDisabled() { return this._showSliceHandleDisabled; }

  @Input() set showObjects(showObjects: boolean) {
    this._showObjects = showObjects;
    this.showObjectsChange.emit(showObjects);
  }
  @Output() showObjectsChange = new EventEmitter<boolean>();
  get showObjects() { return this._showObjects; }

  @Input() set showObjectsDisabled(showObjectsDisabled: boolean) {
    this._showObjectsDisabled = showObjectsDisabled;
  }
  get showObjectsDisabled() { return this._showObjectsDisabled; }

  @Input() set editMode(editMode: boolean) {
    this._editMode = editMode;
    this.editModeChange.emit(editMode);
  }
  @Output() editModeChange = new EventEmitter<boolean>();
  get editMode() { return this._editMode; }

  @Input() set editModeDisabled(editModeDisabled: boolean) {
    this._editModeDisabled = editModeDisabled;
  }
  get editModeDisabled() { return this._editModeDisabled; }

  @Input() set quadView(quadView: boolean) {
    this._quadView = quadView;
    this.quadViewChange.emit(quadView);
  }
  @Output() quadViewChange = new EventEmitter<boolean>();
  get quadView() { return this._quadView; }

  @Input() set quadViewDisabled(quadViewDisabled: boolean) {
    this._quadViewDisabled = quadViewDisabled;
  }
  get quadViewDisabled() { return this._quadViewDisabled; }

  @Input() set alignMode(alignMode: boolean) {
    this._alignMode = alignMode;
    this.toggleAlignMode(alignMode);
    this.alignModeChange.emit(alignMode);
  }
  @Output() alignModeChange = new EventEmitter<boolean>();
  get alignMode() { return this._alignMode; }

  @Input() set selectedObjects(newSelectedObjects: THREE.Object3D[]) {
    const oldSelectedObjects = this.objectSelector.getObjects();
    this.objectSelector.setSelection(newSelectedObjects);
    this.selectedObjectsChange.emit([newSelectedObjects, oldSelectedObjects]);
  }
  @Output() selectedObjectsChange = new EventEmitter<[THREE.Object3D[], THREE.Object3D[]]>();
  get selectedObjects() { return this.objectSelector.getObjects(); }

  @Input() set segmentationSize(value: number) {
    this._segmentationSize = value;
    this.segmentationSizeChange.emit(value);
  }
  @Output() segmentationSizeChange = new EventEmitter<number>();
  get segmentationSize() { return this._segmentationSize; }

  set thresholdLowerBound(value: number) {
    this._thresholdLowerBound = value;
  }
  get thresholdLowerBound() { return this._thresholdLowerBound; }

  set thresholdUpperBound(value: number) {
    this._thresholdUpperBound = value;
  }
  get thresholdUpperBound() { return this._thresholdUpperBound; }

  @Input() set thresholdMinValue(value: number) {
    this._thresholdMinValue = value;
    if (this.stackHelper) {
      this.stackHelper.slice.lowerThreshold = this._thresholdMinValue;
      this.stackHelper.slice.intensityAuto = false;
    }
    this.thresholdMinValueChange.emit(value);
  }
  get thresholdMinValue() { return this._thresholdMinValue; }
  @Output() thresholdMinValueChange = new EventEmitter<number>();

  @Input() set thresholdMaxValue(value: number) {
    this._thresholdMaxValue = value;
    if (this.stackHelper) {
      this.stackHelper.slice.upperThreshold = this._thresholdMaxValue;
      this.stackHelper.slice.intensityAuto = false;
      // this.stackHelper.slice.thicknessMethod = 1;
      // this.stackHelper.slice.thickness = 2;
      // this.stackHelper.slice.steps = 2;
    }
    this.thresholdMaxValueChange.emit(value);
  }
  get thresholdMaxValue() { return this._thresholdMaxValue; }
  @Output() thresholdMaxValueChange = new EventEmitter<number>();

  @Input() set colorMap(value: string) {
    this._colorMap = value;
    if (this.stackHelper) {
      this.stackHelper.slice.colorMap = this._colorMap;
    }
    this.colorMapValueChange.emit(value);
  }
  get colorMap() { return this._colorMap; }
  @Output() colorMapValueChange = new EventEmitter<string>();


  // @Input() set annotationAnchors(newAnchors: THREE.Object3D[]) {
  //   const oldAnchors = this.annotationAnchorSelector.getObjects();
  //   this.annotationAnchorSelector.setSelection(newAnchors);
  //   this.annotationAnchorsChange.emit([newAnchors, oldAnchors]);
  // }
  // @Output() annotationAnchorsChange = new EventEmitter<[THREE.Object3D[], THREE.Object3D[]]>();
  // get annotationAnchors() { return this.annotationAnchorSelector.getObjects(); }

  private width: number;
  private height: number;
  private elem: Element;
  private scene = new THREE.Scene();
  private objects = new THREE.Object3D(); // all the loaded objects go in here

  private camera: THREE.PerspectiveCamera;
  private views: View[] = [
    { // Left top view (TOP): Face towards camera, feet down
      left: 0.0,
      top: 0.0,
      width: 0.5,
      height: 0.5,
      background: new THREE.Color(0.0, 0.0, 0.0),
      eye: new THREE.Vector3(0.0, 150.0, 0.0),
      up: new THREE.Vector3(0.0, 0.0, -1.0),
      fov: 75,
      camera: null
    },
    { // Right top view: Perspective camera
      left: 0.5,
      top: 0.0,
      width: 0.5,
      height: 0.5,
      background: new THREE.Color(0.0, 0.0, 0.0),
      eye: new THREE.Vector3(100.0, 100.0, -100.0),
      up: new THREE.Vector3(0.0, 1.0, 0.0),
      fov: 75,
      camera: null
    },
    { // Left bottom view (FRONT): Feet towards camera (Z), face up (Y)
      left: 0.0,
      top: 0.5,
      width: 0.5,
      height: 0.5,
      background: new THREE.Color(0.0, 0.0, 0.0),
      eye: new THREE.Vector3(0.0, 0.0, 150.0),
      up: new THREE.Vector3(0.0, 1.0, 0.0),
      fov: 75,
      camera: null
    },
    { // Right bottom view (FRONT): Left side towards camera, face up
      left: 0.5,
      top: 0.5,
      width: 0.5,
      height: 0.5,
      background: new THREE.Color(0.0, 0.0, 0.0),
      eye: new THREE.Vector3(150.0, 0.0, 0.0),
      up: new THREE.Vector3(0.0, 1.0, 0.0),
      fov: 75,
      camera: null
    },
  ];

  private renderer = new THREE.WebGLRenderer();
  private controls: Trackball;

  private stackHelper: AMI.StackHelper;
  private volumeRenderer: AMI.VolumeRenderingHelper;
  private sliceManipulator: SliceManipulatorWidget;

  private directionalLight: THREE.DirectionalLight;
  private lightRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  // stored gui state to recover when swithing back from 2D view
  private cachedSliceHandleShown: boolean;
  private cachedSliceShown: boolean;
  private cachedObjectsShown: boolean;
  private cachedCameraOrigin: THREE.Vector3;
  private cachedCameraTarget: THREE.Vector3;
  private cachedCameraUp: THREE.Vector3;

  // callback to call when loading is completed
  private loadCompeletedCallback: () => void;

  private intersectionManager: IntersectionManager;

  private segmentationVoxels: SegmentationVoxels;

  constructor(elem: ElementRef, provenance: ProvenanceService) {
    super();
    registerActions(provenance.registry, this);
    addListeners(provenance.tracker, this);
    this.elem = elem.nativeElement;
  }

  ngOnInit() {
    // todo: remove object from window
    (window as any).canvas = this;
    this.width = this.elem.clientWidth;
    this.height = this.elem.clientHeight;

    this.scene.background = new THREE.Color('black');

    // if (this._quadView) {
      this.views.forEach((v: View) => {
        const newCamera = new THREE.PerspectiveCamera(v.fov, this.width / this.height, 0.1, 10000);
        newCamera.position.copy(v.eye);
        newCamera.up.copy(v.up);
        v.camera = newCamera;
        v.camera.lookAt(new THREE.Vector3(0, 0, 0));
      });
      this.camera = this.views[1].camera;
    // } else {
    //   this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    // }

    this.renderer.setSize(this.width, this.height);

    const canvasElm = this.renderer.domElement;
    this.elem.appendChild(canvasElm);
    canvasElm.style.display = 'block';

    // Setup controls
    if (this._quadView) {
      this.controls = new Trackball(this.views, 1, this.renderer.domElement);
    } else {
      this.views[1].left = 0;
      this.views[1].top = 0;
      this.views[1].width = 1.0;
      this.views[1].height = 1.0;
      this.views[1].camera = this.camera;
      this.controls = new Trackball([this.views[1]], 0, this.renderer.domElement);
    }

    this.scene.add(this.objects);

    // Initial camera position
    this.controls.position0.set(-100.0, -100.0, 100.0);
    this.controls.reset();

    this.initScene();

    this.objectSelector = new ObjectSelector(this.objects);
    // this.annotationAnchorSelector = new AnnotationAnchorSelector(this.objects);

    this.intersectionManager = new IntersectionManager(this.renderer.domElement, this.camera);

    this.intersectionManager.addListener(this.objectSelector);
    // this.intersectionManager.addListener(this.annotationAnchorSelector);

    this.addEventListeners();
    this.animate();
  }

  initScene() {
    // Setup lights
    this.scene.add(new THREE.AmbientLight(0x222222));

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(this.directionalLight);

    // Setup loader
    const loader = new AMI.VolumeLoader(this.renderer.domElement);

    const t1 = [
      // tslint:disable-next-line
      '36747136', '36747150', '36747164', '36747178', '36747192', '36747206', '36747220', '36747234', '36747248', '36747262', '36747276', '36747290', '36747304', '36747318', '36747332', '36747346', '36747360', '36747374', '36747388', '36747402', '36747416', '36747430', '36747444', '36747458', '36747472', '36747486', '36747500', '36747514', '36747528', '36747542', '36747556', '36747570', '36747584', '36747598', '36747612', '36747626', '36747640', '36747654', '36747668', '36747682', '36747696', '36747710', '36747724', '36747738', '36747752', '36747766', '36747780', '36747794', '36747808', '36747822', '36747836', '36747850', '36747864', '36747878', '36747892', '36747906', '36747920', '36747934', '36747948', '36747962', '36747976', '36747990', '36748004', '36748018', '36748032', '36748046', '36748060', '36748074', '36748088', '36748102', '36748116', '36748130', '36748144', '36748158', '36748172', '36748186', '36748578', '36748592', '36748606', '36748620', '36748634', '36748648', '36748662', '36748676', '36748690', '36748704', '36748718', '36748732', '36748746', '36748760', '36748774', '36748788', '36748802', '36748816', '36748830', '36748844', '36748858', '36748872', '36748886', '36748900', '36748914', '36748928', '36748942', '36748956', '36748970', '36748984', '36748998', '36749012', '36749026', '36749040', '36749054', '36749068', '36749082', '36749096', '36749110', '36749124', '36749138', '36749152', '36749166', '36749180', '36749194', '36749208', '36749222', '36749236', '36749250', '36749264', '36749278', '36749292', '36749306', '36749320', '36749334', '36749348', '36749362', '36749376', '36749390', '36749404', '36749418', '36749446', '36749460', '36749474', '36749488', '36749502', '36749516', '36749530', '36749544', '36749558', '36749572', '36749586', '36749600', '36749614', '36749628', '36749642', '36749656', '36749670', '36749684', '36749698', '36749712', '36749726', '36749740', '36749754', '36749768', '36749782', '36749796', '36749810', '36749824', '36749838', '36749852', '36749866', '36749880', '36749894', '36749908', '36749922', '36749936', '36749950', '36749964'
    ];

    const files = t1.map(function (v) {
      return 'https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/' + v;
    });

    loader
      .load(files)
      .then(function () {
        // merge files into clean series/stack/frame structure
        const series = loader.data[0].mergeSeries(loader.data);
        loader.free();
        // loader = null;

        // be carefull that series and target stack exist!
        this.stackHelper = new AMI.StackHelper(series[0].stack[0]);
        this.stackHelper.border.color = 0xffeb3b;
        this.scene.add(this.stackHelper);

        // setup slice
        const centerLPS = this.stackHelper.stack.worldCenter();
        this.stackHelper.slice.aabbSpace = 'LPS';
        this.stackHelper.slice.planePosition.x = centerLPS.x;
        this.stackHelper.slice.planePosition.y = centerLPS.y;
        this.stackHelper.slice.planePosition.z = centerLPS.z;
        this.stackHelper.slice.planeDirection = new THREE.Vector3(1, 0, 0).normalize();
        this.stackHelper.slice.colorMap = 'grayscale';
        this.stackHelper.slice._update();
        this.stackHelper.border.helpersSlice = this.stackHelper.slice;

        const sliceGeometry = new StaticGeometryListener(
          this.stackHelper.slice,
          this.sliceMouseDown.bind(this),
          this.sliceMouseUp.bind(this),
          this.sliceMouseMove.bind(this));
        this.intersectionManager.addListener(sliceGeometry);

        // slice manipulator
        this.sliceManipulator = new SliceManipulatorWidget(this.stackHelper, this.renderer.domElement, this.camera);
        this.scene.add(this.sliceManipulator);

        this.sliceManipulator.addEventListener('zoomChange', this.onSlicePlaneZoomChange);
        this.sliceManipulator.addEventListener('orientationChange', this.onSlicePlaneOrientationChange);
        this.sliceManipulator.visible = this._showSliceHandle;

        this.intersectionManager.addListener(this.sliceManipulator);

        this.segmentationVoxels = new SegmentationVoxels(100, 100, 100, 1);
        this.segmentationVoxels.visible = true;
        this.scene.add(this.segmentationVoxels);

        this.thresholdLowerBound = this.stackHelper.stack.minMax[0];
        this.thresholdUpperBound = this.stackHelper.stack.minMax[1];

        this.thresholdMinValue = this.stackHelper.stack.minMax[0];
        this.thresholdMaxValue = this.stackHelper.stack.minMax[1];

        // Setup volumerenderer
        // this.volumeRenderer = new AMI.VolumeRenderingHelper(series[0].stack[0]);
        // this.scene.add(this.volumeRenderer);

        // Annotation Anchor(s)
        // this.anchorDummy = new AnnotationAnchor(this.renderer.domElement, this.camera);
        // this.scene.add(this.anchorDummy);
        // this.anchorDummy.visible = true;

        // this.intersectionManager.addListener(this.anchorDummy);

        this.controls.initEventListeners();
      }.bind(this))
      .catch(function (error) {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
      });

    // Load STL model
    const loaderSTL = new STLLoader();
    loaderSTL.load('https://cdn.rawgit.com/FNNDSC/data/master/stl/adi_brain/WM.stl', function (geometry) {
      const material = new THREE.MeshPhongMaterial({ color: 0xf44336, specular: 0x111111, shininess: 200 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = 'wm.stl';
      // to LPS space
      const rasToLPS = new THREE.Matrix4();
      rasToLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      mesh.applyMatrix(rasToLPS);
      this.objects.add(mesh);
    }.bind(this));
  }

  addEventListeners() {
    this.renderer.domElement.addEventListener('mousewheel', (event) => this.mousewheel(event));

    this.controls.addEventListener('zoomstart', (event) => {
      const position = this.controls.camera.position.toArray();
      const target = this.controls.target.toArray();
      const up = this.controls.camera.up.toArray();
      const orientation = { position, target, up };

      this.dispatchEvent({
        type: 'zoomStart',
        orientation
      });
    });

    this.controls.addEventListener('zoomend', (event) => {
      const position = this.controls.camera.position.toArray();
      const target = this.controls.target.toArray();
      const up = this.controls.camera.up.toArray();
      const orientation = { position, target, up };

      this.dispatchEvent({
        type: 'zoomEnd',
        orientation
      });
    });

    this.controls.addEventListener('start', (event) => {
      const position = this.controls.camera.position.toArray();
      const target = this.controls.target.toArray();
      const up = this.controls.camera.up.toArray();
      const orientation = { position, target, up };

      this.dispatchEvent({
        type: 'cameraStart',
        orientation
      });
    });

    this.controls.addEventListener('end', (event) => {
      const position = this.controls.camera.position.toArray();
      const target = this.controls.target.toArray();
      const up = this.controls.camera.up.toArray();
      const orientation = { position, target, up };

      this.dispatchEvent({
        type: 'cameraEnd',
        orientation
      });
    });

    this.objectSelector.addEventListener('objectSelection', (event: any) => {
      this.selectedObjects = event.newObject;
    });

    this.renderer.domElement.addEventListener('resize', this.onResize, false);
  }

  onResize() {
    // if (this._quadView) {
      this.views.forEach((v: View) => {
        v.camera.aspect = window.innerWidth / window.innerWidth;
        v.camera.updateProjectionMatrix();
      });
    // } else {
      this.camera.aspect = window.innerWidth / window.innerWidth;
      this.camera.updateProjectionMatrix();
    // }

    this.renderer.setSize(window.innerWidth, window.innerWidth);
    this.controls.handleResize(this.views);
  }

  setSize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.controls.handleResize(this.views);
  }

  setInteractive(interactive: boolean) {
    this.controls.enabled = interactive;
    if (this.sliceManipulator) {
      this.sliceManipulator.enabled = interactive;
    }
  }

  setControlZoom(newOrientation: IOrientation, within: number) {
    this.controls.changeCamera(new THREE.Vector3(newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]),
      new THREE.Vector3(newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]),
      new THREE.Vector3(newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]),
      within > 0 ? within : 1000);
  }

  setControlOrientation(newOrientation: IOrientation, within: number) {
    this.controls.changeCamera(new THREE.Vector3(newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]),
      new THREE.Vector3(newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]),
      new THREE.Vector3(newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]),
      within > 0 ? within : 1000);
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    // update from settings
    this.objects.visible = this._showObjects;
    if (this.stackHelper) {
      this.stackHelper._slice.visible = this._showSlice;
      this.stackHelper._border.visible = this._showSlice;
      this.sliceManipulator.visible = this._showSliceHandle;
    }

    // update light position
    if (this.stackHelper) {
      const lightDir = this.camera.position.clone();
      lightDir.sub(this.stackHelper.stack.worldCenter());
      lightDir.normalize();

      const lightRotationTemp = this.lightRotation.clone();
      lightRotationTemp.applyQuaternion(this.camera.quaternion);

      this.directionalLight.position.set(lightDir.x, lightDir.y, lightDir.z);
      this.directionalLight.position.add(new THREE.Vector3(lightRotationTemp.x, lightRotationTemp.y, lightRotationTemp.z));
      this.directionalLight.position.normalize();
    }

    this.controls.update();

    this.render();
  }

  render() {
    if (this._quadView) {
      this.views.forEach((v: View) => {
        const camera: THREE.PerspectiveCamera = v.camera;
        // v.updateCamera( camera, this.scene, mouseX, mouseY );
        const left = Math.floor(this.width * v.left);
        const top = Math.floor(this.height * v.top);
        const width = Math.floor(this.width * v.width);
        const height = Math.floor(this.height * v.height);
        this.renderer.setViewport(left, top, width, height);
        this.renderer.setScissor(left, top, width, height);
        this.renderer.setScissorTest(true);
        this.renderer.setClearColor(v.background);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        this.renderer.render(this.scene, camera);
      });
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  getSlicePlaneChanges = (event) => {
    const position = event.position.toArray();
    const direction = event.direction.toArray();
    const oldPosition = event.oldPosition.toArray();
    const oldDirection = event.oldDirection.toArray();

    return { position, direction, oldPosition, oldDirection };
  }

  onSlicePlaneOrientationChange = (event) => {
    const changes = this.getSlicePlaneChanges(event);

    this.dispatchEvent({
      type: 'sliceOrientationChanged',
      changes
    });
  }

  onSlicePlaneZoomChange = (event) => {
    const changes = this.getSlicePlaneChanges(event);

    this.dispatchEvent({
      type: 'sliceZoomChanged',
      changes
    });
  }

  onSliceVisibilityChange = (event) => {
    this.dispatchEvent({
      type: 'sliceVisibilityChanged',
      change: event
    });
  }

  onSliceHandleVisibilityChange = (event) => {
    this.dispatchEvent({
      type: 'sliceHandleVisibilityChanged',
      change: event
    });
  }

  setSlicePlanePosition(positions: ISlicePosition, within: number) {
    if (this.stackHelper) {
      this.sliceManipulator.changeSlicePosition(new THREE.Vector3(positions.position[0], positions.position[1], positions.position[2]),
        new THREE.Vector3(positions.direction[0], positions.direction[1], positions.direction[2]), within > 0 ? within : 1000);
    }
  }

  setSlicePlaneZoom(positions: ISlicePosition, within: number) {
    if (this.stackHelper) {
      this.sliceManipulator.changeSlicePosition(new THREE.Vector3(positions.position[0], positions.position[1], positions.position[2]),
        new THREE.Vector3(positions.direction[0], positions.direction[1], positions.direction[2]), within > 0 ? within : 1000);
    }
  }

  // slice alignment
  moveCameraTo2DSlice = (event?) => {
    if (this.stackHelper) {
      // Finish movement
      this.controls.finishCurrentTransition();
      this.sliceManipulator.finishCurrentTransition();

      // Store variables for restoration later
      this.cachedCameraOrigin = this.controls.camera.position.clone();
      this.cachedCameraTarget = this.controls.target.clone();
      this.cachedCameraUp = this.controls.camera.up.clone();
      this.cachedObjectsShown = this.showObjects;
      this.cachedSliceHandleShown = this.showSliceHandle;
      this.cachedSliceShown = this.showSlice;

      // Switch controls and settings that are appropriate for this mode
      this._showObjects = false;
      this.showObjectsDisabled = true;
      this._showSliceHandle = false;
      this.showSliceHandleDisabled = true;
      this._showSlice = true;
      this.showSliceDisabled = true;
      this.editModeDisabled = false;

      // store the camera position for later restoration
      const cameraPosition: THREE.Vector3 = this.stackHelper.slice.planePosition.clone();
      cameraPosition.addScaledVector(this.stackHelper.slice.planeDirection, 150.0);
      // choose a up vector that does not point in the same way as the target plane
      const upVector = new THREE.Vector3(0, 0, 1);
      if (Math.abs(this.stackHelper.slice.planeDirection.x) < 0.001 && Math.abs(this.stackHelper.slice.planeDirection.y) < 0.001) {
        upVector.set(0, 1, 0);
      }
      this.controls.changeCamera(cameraPosition, this.stackHelper.slice.planePosition.clone(), upVector, 0);

      // turn off the camera controls
      this.controls.enabled = false;
    }
  }

  moveCameraFrom2DSlice = (event?) => {
    if (this.stackHelper) {
      // turn camera controls back on
      this.controls.enabled = true;

      // reset to the old camera position
      this.controls.changeCamera(this.cachedCameraOrigin, this.cachedCameraTarget, this.cachedCameraUp, 0);

      // reset to old settings before align mode
      this._showSlice = this.cachedSliceShown;
      this.showSliceDisabled = false;
      this._showSliceHandle = this.cachedSliceHandleShown;
      this.showSliceHandleDisabled = false;
      this._showObjects = this.cachedObjectsShown;
      this.showObjectsDisabled = false;
      this.editModeDisabled = true;
    }
  }

  onShowObjectsChange = (visible) => {
    this.dispatchEvent({
      type: 'objectsVisibilityChanged',
      change: visible
    });
  }

  showObjectsToggled = (checkBox) => {
    this.onShowObjectsChange(checkBox.currentTarget.checked);
  }

  onEditModeChange = (visible) => {
    this.dispatchEvent({
      type: 'editModeChanged',
      change: visible
    });
  }

  editModeToggled = (checkBox) => {
    this.onEditModeChange(checkBox.currentTarget.checked);
  }

  onAlignModeChange = (visible) => {
    this.dispatchEvent({
      type: 'alignModeChanged',
      change: visible
    });
  }

  alignModeToggled = (checkBox) => {
    this.toggleAlignMode(checkBox.currentTarget.checked);
    this.onAlignModeChange(checkBox.currentTarget.checked);
  }

  toggleAlignMode(checked) {
    if (checked) {
      this.moveCameraTo2DSlice();
    } else {
      this.moveCameraFrom2DSlice();
      this.editMode = false;
    }
  }

  mousewheel(event) {
    // TODO: check bounds
    if (this._alignMode === false) { return; }

    event.preventDefault();
    event.stopPropagation();

    let delta = 0;

    if (event.wheelDelta) {
      //  WebKit / Opera / Explorer 9

      delta = event.wheelDelta / 40;
    } else if (event.detail) {
      //  Firefox

      delta = -event.detail / 3;
    }

    let change = 0;
    if (delta > 0) {
      change = 1;
    } else {
      change = -1;
    }

    const oldPosition: THREE.Vector3 = this.stackHelper.slice.planePosition.clone();
    const intersectionDirection: THREE.Vector3 = this.stackHelper.slice.planeDirection.clone();
    const newPosition = oldPosition.addScaledVector(intersectionDirection, change);

    this.sliceManipulator.changeSlicePosition(newPosition, intersectionDirection, 0);

    this.dispatchEvent({
      type: 'sliceZoomChanged',
      changes: {
        position: newPosition.clone(),
        direction: intersectionDirection.clone(),
        oldPosition: oldPosition.clone(),
        oldDirection: intersectionDirection.clone()
      }
    });
  }

  sliceMouseDown(intersection: THREE.Intersection, pointer: MouseEvent) {
    if (intersection && this.editMode) {
      this._sliceMouseDown = true;

      if (this.segmentationVoxels.getGridPoint(intersection.point)) {
        this._segmentationIsDeleting = true;
        this.segmentationVoxels.paintAt(intersection.point, this.segmentationSize, false);
      } else {
        this._segmentationIsDeleting = false;
        this.segmentationVoxels.paintAt(intersection.point, this.segmentationSize, true);
      }
    }
  }

  sliceMouseUp(intersection: THREE.Intersection, pointer: MouseEvent) {
    if (intersection) {
      this._sliceMouseDown = false;
      this._segmentationIsDeleting = false;
    }
  }

  sliceMouseMove(intersection: THREE.Intersection, pointer: MouseEvent) {
    if (intersection && this.editMode && this._sliceMouseDown) {
      if (this._segmentationIsDeleting) {
        this.segmentationVoxels.paintAt(intersection.point, this.segmentationSize, false);
      } else {
        this.segmentationVoxels.paintAt(intersection.point, this.segmentationSize, true);
      }
    }
  }
}
