import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as THREE from 'three';
import * as AMI from 'ami.js';

import { IOrientation, ISlicePosition } from './types';

import Trackball from './trackball';
import SliceManipulatorWidget from './sliceManipulatorWidget';
import STLLoader from './stlLoader';
import { IntersectionManager, StaticGeometryListener } from './intersectionManager';
import ObjectSelector from './objectSelector';

import AnnotationAnchorSelector from './annotationAnchorSelector';
import AnnotationAnchor from './annotationAnchor';

import { ProvenanceService } from '../provenance.service';
import { registerActions } from './provenanceActions';
import { addListeners } from './provenanceListeners';

@Component({
  selector: 'app-brainvis-canvas',
  template: '',
  styleUrls: ['./brainvis-canvas.component.css']
})
export class BrainvisCanvasComponent extends THREE.EventDispatcher implements OnInit {
  private _showSlice = true;
  private _showSliceHandle = true;
  private _showObjects = true;
  private objectSelector: ObjectSelector;
  private annotationAnchorSelector: AnnotationAnchorSelector;

  @Input() set showSlice(showSlice: boolean) {
    this._showSlice = showSlice;
    this.toggleSlice(showSlice);
    this.showSliceChange.emit(showSlice);
  }
  @Output() showSliceChange = new EventEmitter<boolean>();
  get showSlice() { return this._showSlice; }

  @Input() set showSliceHandle(showSliceHandle: boolean) {
    this._showSliceHandle = showSliceHandle;
    this.toggleSliceHandle(showSliceHandle);
    this.showSliceHandleChange.emit(showSliceHandle);
  }
  @Output() showSliceHandleChange = new EventEmitter<boolean>();
  get showSliceHandle() { return this._showSliceHandle; }

  @Input() set showObjects(showObjects: boolean) {
    this._showObjects = showObjects;
    this.toggleObjects(showObjects);
    this.showObjectsChange.emit(showObjects);
  }
  @Output() showObjectsChange = new EventEmitter<boolean>();
  get showObjects() { return this._showObjects; }

  @Input() set selectedObjects(newSelectedObjects: THREE.Object3D[]) {
    const oldSelectedObjects = this.objectSelector.getObjects();
    this.objectSelector.setSelection(newSelectedObjects);
    this.selectedObjectsChange.emit([newSelectedObjects, oldSelectedObjects]);
  }
  @Output() selectedObjectsChange = new EventEmitter<[THREE.Object3D[], THREE.Object3D[]]>();
  get selectedObjects() { return this.objectSelector.getObjects(); }

  @Input() set annotationAnchors(newAnchors: THREE.Object3D[]) {
    const oldAnchors = this.annotationAnchorSelector.getObjects();
    this.annotationAnchorSelector.setSelection(newAnchors);
    this.annotationAnchorsChange.emit([newAnchors, oldAnchors]);
  }
  @Output() annotationAnchorsChange = new EventEmitter<[THREE.Object3D[], THREE.Object3D[]]>();
  get annotationAnchors() { return this.annotationAnchorSelector.getObjects(); }

  private width: number;
  private height: number;
  private elem: Element;
  private scene = new THREE.Scene();
  private objects = new THREE.Object3D(); // all the loaded objects go in here
  private camera: THREE.PerspectiveCamera;
  private renderer = new THREE.WebGLRenderer();
  private controls: Trackball;
  private stackHelper: AMI.StackHelper;
  private sliceManipulator: SliceManipulatorWidget;

  private directionalLight: THREE.DirectionalLight;
  private lightRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  // for the 2D slice
  private alignButton: HTMLInputElement;
  // stored gui state to recoveren when swithing back from 2D view
  private cachedCameraOrigin: THREE.Vector3;
  private cachedCameraTarget: THREE.Vector3;
  private cachedCameraUp: THREE.Vector3;
  private cachedSliceHandleVisibility: boolean;
  private cachedObjectsShown: boolean;

  // callback to call when loading is completed
  private loadCompeletedCallback: () => void;

  private intersectionManager: IntersectionManager;

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
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 10000);

    this.renderer.setSize(this.width, this.height);

    const canvasElm = this.renderer.domElement;
    this.elem.appendChild(canvasElm);
    canvasElm.style.display = 'block';

    // Setup controls
    this.controls = new Trackball(this.camera, this.renderer.domElement);

    this.scene.add(this.objects);

    // Initial camera position
    this.controls.position0.set(0, 0, 5);
    this.controls.reset();

    this.initScene();

    this.objectSelector = new ObjectSelector(this.objects);
    this.annotationAnchorSelector = new AnnotationAnchorSelector(this.objects);

    this.intersectionManager = new IntersectionManager(this.renderer.domElement, this.camera);

    this.intersectionManager.addListener(this.objectSelector);
    this.intersectionManager.addListener(this.annotationAnchorSelector);

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

    const files = t1.map(function(v) {
      return 'https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/' + v;
    });

    loader
      .load(files)
      .then(function() {
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
        this.stackHelper.slice._update();
        this.stackHelper.border.helpersSlice = this.stackHelper.slice;

        const sliceGeometry = new StaticGeometryListener(this.stackHelper.slice);
        this.intersectionManager.addListener(sliceGeometry);

        // slice manipulator
        this.sliceManipulator = new SliceManipulatorWidget(this.stackHelper, this.renderer.domElement, this.camera);
        this.scene.add(this.sliceManipulator);

        this.sliceManipulator.addEventListener('zoomChange', this.onSlicePlaneZoomChange);
        this.sliceManipulator.addEventListener('orientationChange', this.onSlicePlaneOrientationChange);
        this.sliceManipulator.visible = this._showSliceHandle;

        this.intersectionManager.addListener(this.sliceManipulator);

        // Annotation Anchor(s)
        this.anchorDummy = new AnnotationAnchor(this.renderer.domElement, this.camera);
        this.scene.add(this.anchorDummy);
        this.anchorDummy.visible = true;

        this.intersectionManager.addListener(this.anchorDummy);

        this.controls.initEventListeners();
      }.bind(this))
      .catch(function(error) {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
      });

    // Load STL model
    const loaderSTL = new STLLoader();
    loaderSTL.load('https://cdn.rawgit.com/FNNDSC/data/master/stl/adi_brain/WM.stl', function(geometry) {
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
  }

  setSize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.controls.handleResize();
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
    this.renderer.render(this.scene, this.camera);
  }

  getSlicePlaneChanges = (event) => {
    console.log(event);
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

  toggleSlice(state) {
    if (this.stackHelper) {
      this.stackHelper._slice.visible = state;
      this.stackHelper._border.visible = state;
      if (state === false) {
        this.sliceManipulator.visible = state;
      } else {
        this.sliceManipulator.visible = this._showSlice;
      }
    }
  }

  toggleSliceHandle(state) {
    if (this.sliceManipulator) {
      this.sliceManipulator.visible = state;
    }
  }

  // slice alignment
  moveCameraTo2DSlice = (event?) => {
    if (this.stackHelper) {
      // if this comes from the button we dispach an event to the provenance graph
      // the graph will then call this function again
      if (event) {
        this.dispatchEvent({
          type: 'sliceModeChanged',
          mode2D: true
        });
        return;
      }
      this.controls.finishCurrentTransition();
      this.sliceManipulator.finishCurrentTransition();
      this.cachedCameraOrigin = this.controls.camera.position.clone();
      this.cachedCameraTarget = this.controls.target.clone();
      this.cachedCameraUp = this.controls.camera.up.clone();
      this.cachedSliceHandleVisibility = this.sliceManipulator.visible;
      this.cachedObjectsShown = this.objects.visible;
      this.sliceManipulator.visible = false;
      this.objects.visible = false;
      const cameraPosition: THREE.Vector3 = this.stackHelper.slice.planePosition.clone();
      cameraPosition.addScaledVector(this.stackHelper.slice.planeDirection, 150.0);
      // choose a up vector that does not point in the same way as the target plane
      const upVector = new THREE.Vector3(0, 0, 1);
      if (Math.abs(this.stackHelper.slice.planeDirection.x) < 0.001 && Math.abs(this.stackHelper.slice.planeDirection.y) < 0.001) {
        upVector.set(0, 1, 0);
      }
      this.controls.changeCamera(cameraPosition, this.stackHelper.slice.planePosition.clone(), upVector, 0);
      this.alignButton.removeEventListener('click', this.moveCameraTo2DSlice);
      this.alignButton.addEventListener('click', this.moveCameraFrom2DSlice);
      this.alignButton.value = 'Back to 3D';
      this.controls.enabled = false;
    }
  }

  moveCameraFrom2DSlice = (event?) => {
    if (this.stackHelper) {
      // if this comes from the button we dispach an event to the provenance graph
      // the graph will then call this function again
      if (event) {
        this.dispatchEvent({
          type: 'sliceModeChanged',
          mode2D: false
        });
        return;
      }
      this.controls.enabled = true;
      this.controls.changeCamera(this.cachedCameraOrigin, this.cachedCameraTarget, this.cachedCameraUp, 0);
      this.alignButton.removeEventListener('click', this.moveCameraFrom2DSlice);
      this.alignButton.addEventListener('click', this.moveCameraTo2DSlice);
      this.alignButton.value = 'Align to slice';
      this.sliceManipulator.visible = this.cachedSliceHandleVisibility;
      this.objects.visible = this.cachedObjectsShown;
    }
  }

  onShowObjectsChange = (visible) => {

    this.dispatchEvent({
      type: 'objectsVisibilityChanged',
      change: visible
    });
  }

  showObjectsToggled = (checkBox) => {
    this.toggleObjects(checkBox.currentTarget.checked);
    this.onShowObjectsChange(checkBox.currentTarget.checked);
  }

  toggleObjects(visible) {
    this.objects.visible = visible;
  }
}
