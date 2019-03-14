import * as THREE from 'three';
import * as AMI from 'ami.js';

import { Component, ElementRef, OnInit } from '@angular/core';
import { IOrientation, ISlicePosition, View, IAMIRenderer } from './utils/types';
import { Trackball } from './utils/trackball';
import SliceManipulatorWidget from './utils/sliceManipulatorWidget';
import STLLoader from './loaders/stlLoader';
import { IntersectionManager, StaticGeometryListener } from './selectionHelpers/intersectionManager';
import ObjectSelector from './selectionHelpers/objectSelector';
import SegmentationVoxels from './selectionHelpers/segmentationVoxels';
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
  public objectSelector: ObjectSelector;

  // private width: number;
  // private height: number;
  private elem: Element;
  // private scene = new THREE.Scene();
  // private objects = new THREE.Object3D(); // all the loaded objects go in here

  // private camera: THREE.PerspectiveCamera;
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

  // private renderer = new THREE.WebGLRenderer();
  // private controls: Trackball;

  private textureTarget: THREE.WebGLRenderTarget;
  private contourHelper: AMI.ContourHelper;
  private contourScene: THREE.Scene;

  private _perspectiveRenderer: Renderer3D;
  private _axialRenderer: Renderer2D;
  private _coronalRenderer: Renderer2D;
  private _sagittalRenderer: Renderer2D;

  // extra variables to show mesh plane intersections in 2D renderers
  private sceneClip = new THREE.Scene();
  private clipPlaneAxial = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
  private clipPlaneCoronal = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
  private clipPlaneSagittal = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);


  // public stackHelper: AMI.StackHelper;
  // private volumeRenderer: AMI.VolumeRenderingHelper;
  private sliceManipulator: SliceManipulatorWidget;

  // private directionalLight: THREE.DirectionalLight;
  // private lightRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

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

  get perspectiveRenderer() {
    return this._perspectiveRenderer;
  }

  get initialized() {
    return this._initialized;
  }

  ngOnInit() {
    // todo: remove object from window
    (window as any).canvas = this;
    // this.width = this.elem.clientWidth;
    // this.height = this.elem.clientHeight;

    // this.scene.background = new THREE.Color('black');

    this._axialRenderer = new Renderer2D(this.views[0]);
    this._perspectiveRenderer = new Renderer3D(this.views[1]);
    this._coronalRenderer = new Renderer2D(this.views[2]);
    this._sagittalRenderer = new Renderer2D(this.views[3]);

    this._perspectiveRenderer.init();
    this._axialRenderer.init();
    this._coronalRenderer.init();
    this._sagittalRenderer.init();

    this.loadData();


    // this.renderer.setSize(this.width, this.height);

    // const canvasElm = this.renderer.domElement;
    // this.elem.appendChild(canvasElm);
    // canvasElm.style.display = 'block';

    // Setup controls
    // if (this.settings.quadView) {
    //   this.controls = new Trackball(this.views, 1, this.renderer.domElement);
    // } else {
    //   this.views[1].left = 0;
    //   this.views[1].top = 0;
    //   this.views[1].width = 1.0;
    //   this.views[1].height = 1.0;
    //   this.views[1].camera = this.camera;
    //   this.controls = new Trackball([this.views[1]], 0, this.renderer.domElement);
    // }

    // this.scene.add(this.objects);

    // Initial camera position
    // this.controls.position0.set(-100.0, -100.0, 100.0);
    // this.controls.reset();

    // this.initScene();

    // this.objectSelector = new ObjectSelector(this.objects);
    // this.annotationAnchorSelector = new AnnotationAnchorSelector(this.objects);

    // this.intersectionManager = new IntersectionManager(this._perspectiveRenderer.domElement, this.camera);
    // this.intersectionManager.addListener(this.objectSelector);
    // this.intersectionManager.addListener(this.annotationAnchorSelector);

    this.addEventListeners();
    this.animate();
  }

  loadData() {
    const t1 = [
      // tslint:disable-next-line
      '36747136', '36747150', '36747164', '36747178', '36747192', '36747206', '36747220', '36747234', '36747248', '36747262', '36747276', '36747290', '36747304', '36747318', '36747332', '36747346', '36747360', '36747374', '36747388', '36747402', '36747416', '36747430', '36747444', '36747458', '36747472', '36747486', '36747500', '36747514', '36747528', '36747542', '36747556', '36747570', '36747584', '36747598', '36747612', '36747626', '36747640', '36747654', '36747668', '36747682', '36747696', '36747710', '36747724', '36747738', '36747752', '36747766', '36747780', '36747794', '36747808', '36747822', '36747836', '36747850', '36747864', '36747878', '36747892', '36747906', '36747920', '36747934', '36747948', '36747962', '36747976', '36747990', '36748004', '36748018', '36748032', '36748046', '36748060', '36748074', '36748088', '36748102', '36748116', '36748130', '36748144', '36748158', '36748172', '36748186', '36748578', '36748592', '36748606', '36748620', '36748634', '36748648', '36748662', '36748676', '36748690', '36748704', '36748718', '36748732', '36748746', '36748760', '36748774', '36748788', '36748802', '36748816', '36748830', '36748844', '36748858', '36748872', '36748886', '36748900', '36748914', '36748928', '36748942', '36748956', '36748970', '36748984', '36748998', '36749012', '36749026', '36749040', '36749054', '36749068', '36749082', '36749096', '36749110', '36749124', '36749138', '36749152', '36749166', '36749180', '36749194', '36749208', '36749222', '36749236', '36749250', '36749264', '36749278', '36749292', '36749306', '36749320', '36749334', '36749348', '36749362', '36749376', '36749390', '36749404', '36749418', '36749446', '36749460', '36749474', '36749488', '36749502', '36749516', '36749530', '36749544', '36749558', '36749572', '36749586', '36749600', '36749614', '36749628', '36749642', '36749656', '36749670', '36749684', '36749698', '36749712', '36749726', '36749740', '36749754', '36749768', '36749782', '36749796', '36749810', '36749824', '36749838', '36749852', '36749866', '36749880', '36749894', '36749908', '36749922', '36749936', '36749950', '36749964'
    ];

    const files = t1.map(function (v) {
      return 'https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/' + v;
    });

    // Setup loader
    let loader = new AMI.VolumeLoader();

    loader
      .load(files)
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
        const persectiveCamera = <THREE.PerspectiveCamera>bcc._perspectiveRenderer.camera;
        persectiveCamera.lookAt(new THREE.Vector3(centerLPS.x, centerLPS.y, centerLPS.z));
        persectiveCamera.updateProjectionMatrix();

        const perspectiveControls = <THREE.TrackballControls>bcc._perspectiveRenderer.controls;
        perspectiveControls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);

        // bouding box
        const boxHelper = new AMI.BoundingBoxHelper(stack);
        bcc._perspectiveRenderer.scene.add(boxHelper);

        // Freeform slice
        bcc._perspectiveRenderer.initHelpersStack(stack);
        // bcc._perspectiveRenderer.scene.add(bcc._axialRenderer.scene);

        // red slice
        bcc._axialRenderer.initHelpersStack(stack);
        // bcc._perspectiveRenderer.scene.add(bcc._axialRenderer.scene);

        // yellow slice
        bcc._coronalRenderer.initHelpersStack(stack);
        // bcc._perspectiveRenderer.scene.add(bcc._coronalRenderer.scene);

        // green slice
        bcc._sagittalRenderer.initHelpersStack(stack);
        // bcc._perspectiveRenderer.scene.add(bcc._sagittalRenderer.scene);

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

        function onAxialChanged() {
          bcc._axialRenderer.updateLocalizer([bcc._coronalRenderer.localizerHelper, bcc._sagittalRenderer.localizerHelper]);
          bcc._axialRenderer.updateClipPlane(bcc.clipPlaneAxial);

          if (bcc.contourHelper) {
            bcc.contourHelper.geometry = bcc._axialRenderer.stackHelper.slice.geometry;
          }
        }

        function onCoronalChanged() {
          bcc._coronalRenderer.updateLocalizer([bcc._axialRenderer.localizerHelper, bcc._sagittalRenderer.localizerHelper]);
          bcc._coronalRenderer.updateClipPlane(bcc.clipPlaneCoronal);
        }

        function onSagittalChanged() {
          bcc._sagittalRenderer.updateLocalizer([bcc._axialRenderer.localizerHelper, bcc._coronalRenderer.localizerHelper]);
          bcc._sagittalRenderer.updateClipPlane(bcc.clipPlaneSagittal);
        }

        function onClick(event) {
          const canvas = event.target.parentElement;
          const id = event.target.id;
          const mouse = {
            x: ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1,
            y: -((event.clientY - canvas.offsetTop) / canvas.clientHeight) * 2 + 1,
          };

          const camera = bcc.getCorrectCamera(id);
          const stackHelper = bcc.getCorrectStackHelper(id);
          const scene = bcc.getCorrectScene(id);

          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, camera);

          // TODO reinstate single click
          // const intersects = raycaster.intersectObjects(scene.children, true);
          // if (intersects.length > 0) {
          //   if (intersects[0].object) {
          //     const refObject = intersects[0].object;
          //     refObject.selected = !refObject.selected;

          //     let color = refObject.color;
          //     if (refObject.selected) {
          //       color = 0xccff00;
          //     }

          //     // update materials colors
          //     refObject.material.color.setHex(color);
          //     refObject.materialFront.color.setHex(color);
          //     refObject.materialBack.color.setHex(color);
          //   }
          // }
        }
        // r0.domElement.addEventListener('click', onClick);

        function onScroll(event) {
          const id = event.target.domElement.id;
          const stackHelper = bcc.getCorrectStackHelper(id);

          if (event.delta > 0) {
            if (stackHelper.index >= stackHelper.orientationMaxIndex - 1) {
              return false;
            }
            stackHelper.index += 1;
          } else {
            if (stackHelper.index <= 0) {
              return false;
            }
            stackHelper.index -= 1;
          }

          onAxialChanged();
          onCoronalChanged();
          onSagittalChanged();
        }

        function onDoubleClick(event) {
          const canvas = event.target.parentElement;
          const id = event.target.id;
          const mouse = {
            x: ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1,
            y: -((event.clientY - canvas.offsetTop) / canvas.clientHeight) * 2 + 1,
          };

          let camera = null;
          let stackHelper = null;
          let scene = null;
          switch (id) {
            case '0':
              camera = bcc._perspectiveRenderer.camera;
              stackHelper = bcc._axialRenderer.stackHelper;
              scene = bcc._perspectiveRenderer.scene;
              break;
            case '1':
              camera = bcc._axialRenderer.camera;
              stackHelper = bcc._axialRenderer.stackHelper;
              scene = bcc._axialRenderer.scene;
              break;
            case '2':
              camera = bcc._coronalRenderer.camera;
              stackHelper = bcc._coronalRenderer.stackHelper;
              scene = bcc._coronalRenderer.scene;
              break;
            case '3':
              camera = bcc._sagittalRenderer.camera;
              stackHelper = bcc._sagittalRenderer.stackHelper;
              scene = bcc._sagittalRenderer.scene;
              break;
          }

          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, camera);

          const intersects = raycaster.intersectObjects(scene.children, true);
          if (intersects.length > 0) {
            const ijk = AMI.UtilsCore.worldToData(stackHelper.stack.lps2IJK, intersects[0].point);

            bcc._axialRenderer.stackHelper.index = ijk.getComponent((bcc._axialRenderer.stackHelper.orientation + 2) % 3);
            bcc._coronalRenderer.stackHelper.index = ijk.getComponent((bcc._coronalRenderer.stackHelper.orientation + 2) % 3);
            bcc._sagittalRenderer.stackHelper.index = ijk.getComponent((bcc._sagittalRenderer.stackHelper.orientation + 2) % 3);

            onAxialChanged();
            onCoronalChanged();
            onSagittalChanged();
          }
        }

        // event listeners
        bcc._perspectiveRenderer.domElement.addEventListener('dblclick', onDoubleClick);
        bcc._axialRenderer.domElement.addEventListener('dblclick', onDoubleClick);
        bcc._coronalRenderer.domElement.addEventListener('dblclick', onDoubleClick);
        bcc._sagittalRenderer.domElement.addEventListener('dblclick', onDoubleClick);

        // Stup freeform slice handler for the perspective view
        bcc._perspectiveRenderer.stackHelper.slice.aabbSpace = 'LPS';
        bcc._perspectiveRenderer.stackHelper.slice.planePosition.x = centerLPS.x;
        bcc._perspectiveRenderer.stackHelper.slice.planePosition.y = centerLPS.y;
        bcc._perspectiveRenderer.stackHelper.slice.planePosition.z = centerLPS.z;
        bcc._perspectiveRenderer.stackHelper.slice.planeDirection = new THREE.Vector3(1, 0, 0).normalize();
        bcc._perspectiveRenderer.stackHelper.slice.colorMap = 'grayscale';
        bcc._perspectiveRenderer.stackHelper.slice._update();
        bcc._perspectiveRenderer.stackHelper.border.helpersSlice = bcc._perspectiveRenderer.stackHelper.slice;

        // const sliceGeometry = new StaticGeometryListener(
        //   bcc._perspectiveRenderer.stackHelper.slice,
        //   bcc.sliceMouseDown.bind(bcc),
        //   bcc.sliceMouseUp.bind(bcc),
        //   bcc.sliceMouseMove.bind(bcc));
        // bcc.intersectionManager.addListener(sliceGeometry);

        // slice manipulator
        // bcc.sliceManipulator = new SliceManipulatorWidget(
        //   bcc._perspectiveRenderer.stackHelper,
        //   bcc._perspectiveRenderer.domElement,
        //   bcc.camera);

        // bcc.scene.add(bcc.sliceManipulator);

        // bcc.sliceManipulator.addEventListener('zoomChange', bcc.onSlicePlaneZoomChange);
        // bcc.sliceManipulator.addEventListener('orientationChange', bcc.onSlicePlaneOrientationChange);
        // bcc.sliceManipulator.visible = bcc.settings.showSliceHandle;

        // bcc.intersectionManager.addListener(bcc.sliceManipulator);

        // bcc.segmentationVoxels = new SegmentationVoxels(100, 100, 100, 1);
        // bcc.segmentationVoxels.visible = true;
        // bcc.scene.add(bcc.segmentationVoxels);

        // Setup volumerenderer
        // bcc.volumeRenderer = new AMI.VolumeRenderingHelper(series[0].stack[0]);
        // bcc.scene.add(bcc.volumeRenderer);

        // Annotation Anchor(s)
        // bcc.anchorDummy = new AnnotationAnchor(bcc.renderer.domElement, bcc.camera);
        // bcc.scene.add(bcc.anchorDummy);
        // bcc.anchorDummy.visible = true;

        // bcc.intersectionManager.addListener(bcc.anchorDummy);

        // bcc.controls.initEventListeners();

        bcc._initialized = true;
      }.bind(this))
      .catch(function (error) {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
      });

    // Load STL model
    // const loaderSTL = new STLLoader();
    // loaderSTL.load('https://cdn.rawgit.com/FNNDSC/data/master/stl/adi_brain/WM.stl', function (geometry) {
    //   const material = new THREE.MeshPhongMaterial({ color: 0xf44336, specular: 0x111111, shininess: 200 });
    //   const mesh = new THREE.Mesh(geometry, material);
    //   mesh.name = 'wm.stl';
    //   // to LPS space
    //   const rasToLPS = new THREE.Matrix4();
    //   rasToLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    //   mesh.applyMatrix(rasToLPS);
    //   this.objects.add(mesh);
    // }.bind(this));
  }

  getCorrectCamera(id: string) {
    let camera = null;
    switch (id) {
      case '0' || 'r0':
        camera = this._perspectiveRenderer.camera;
        break;
      case '1' || 'r1':
        camera = this._axialRenderer.camera;
        break;
      case '2' || 'r2':
        camera = this._coronalRenderer.camera;
        break;
      case '3' || 'r3':
        camera = this._sagittalRenderer.camera;
        break;
    }
    return camera;
  }

  getCorrectStackHelper(id: string) {
    let stackHelper = null;
    switch (id) {
      case '0' || 'r0':
      stackHelper = this._axialRenderer.stackHelper;
        break;
      case '1' || 'r1':
      stackHelper = this._axialRenderer.stackHelper;
        break;
      case '2' || 'r2':
      stackHelper = this._coronalRenderer.stackHelper;
        break;
      case '3' || 'r3':
      stackHelper = this._sagittalRenderer.stackHelper;
        break;
    }
    return stackHelper;
  }

  getCorrectScene(id: string) {
    let scene = null;
    switch (id) {
      case '0' || 'r0':
      scene = this._perspectiveRenderer.scene;
        break;
      case '1' || 'r1':
      scene = this._axialRenderer.scene;
        break;
      case '2' || 'r2':
      scene = this._coronalRenderer.scene;
        break;
      case '3' || 'r3':
      scene = this._sagittalRenderer.scene;
        break;
    }
    return scene;
  }

  addEventListeners() {
    // this.renderer.domElement.addEventListener('mousewheel', (event) => this.mousewheel(event));

    // this.controls.addEventListener('zoomstart', (event) => {
    //   const position = this.controls.camera.position.toArray();
    //   const target = this.controls.target.toArray();
    //   const up = this.controls.camera.up.toArray();
    //   const orientation = { position, target, up };

    //   this.dispatchEvent({
    //     type: 'zoomStart',
    //     orientation
    //   });
    // });

    // this.controls.addEventListener('zoomend', (event) => {
    //   const position = this.controls.camera.position.toArray();
    //   const target = this.controls.target.toArray();
    //   const up = this.controls.camera.up.toArray();
    //   const orientation = { position, target, up };

    //   this.dispatchEvent({
    //     type: 'zoomEnd',
    //     orientation
    //   });
    // });

    // this.controls.addEventListener('start', (event) => {
    //   const position = this.controls.camera.position.toArray();
    //   const target = this.controls.target.toArray();
    //   const up = this.controls.camera.up.toArray();
    //   const orientation = { position, target, up };

    //   this.dispatchEvent({
    //     type: 'cameraStart',
    //     orientation
    //   });
    // });

    // this.controls.addEventListener('end', (event) => {
    //   const position = this.controls.camera.position.toArray();
    //   const target = this.controls.target.toArray();
    //   const up = this.controls.camera.up.toArray();
    //   const orientation = { position, target, up };

    //   this.dispatchEvent({
    //     type: 'cameraEnd',
    //     orientation
    //   });
    // });

    // this.objectSelector.addEventListener('objectSelection', (event: any) => {
    //   this.settings.selectedObjects = event.newObject;
    // });
  }

  // onResize() {
  //   this.perspectiveRenderer.onWindowResize();
  //   this.axialRenderer.onWindowResize();
  //   this.coronalRenderer.onWindowResize();
  //   this.sagittalRenderer.onWindowResize();
  // }

  // setSize(width: number, height: number) {
  //   this.camera.aspect = width / height;
  //   this.camera.updateProjectionMatrix();

  //   this.renderer.setSize(width, height);
  //   this.controls.handleResize(this.views);
  // }

  // setInteractive(interactive: boolean) {
  //   this.controls.enabled = interactive;
  //   if (this.sliceManipulator) {
  //     this.sliceManipulator.enabled = interactive;
  //   }
  // }

  // setControlZoom(newOrientation: IOrientation, within: number) {
  //   this.controls.changeCamera(new THREE.Vector3(newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]),
  //     new THREE.Vector3(newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]),
  //     new THREE.Vector3(newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]),
  //     within > 0 ? within : 1000);
  // }

  // setControlOrientation(newOrientation: IOrientation, within: number) {
  //   this.controls.changeCamera(new THREE.Vector3(newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]),
  //     new THREE.Vector3(newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]),
  //     new THREE.Vector3(newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]),
  //     within > 0 ? within : 1000);
  // }

  animate = () => {
    requestAnimationFrame(this.animate);
    if (this._initialized) {
      // update from settings
      // this.objects.visible = this.settings.showObjects;
      // if (this.stackHelper) {
      //   this.stackHelper._slice.visible = this.settings.showSlice;
      //   this.stackHelper._border.visible = this.settings.showSlice;
      //   this.sliceManipulator.visible = this.settings.showSliceHandle;
      // }

      // update light position
      // if (this._perspectiveRenderer.stackHelper) {
      //   const lightDir = this.camera.position.clone();
      //   lightDir.sub(this._perspectiveRenderer.stackHelper.stack.worldCenter());
      //   lightDir.normalize();

      //   const lightRotationTemp = this.lightRotation.clone();
      //   lightRotationTemp.applyQuaternion(this.camera.quaternion);

      //   this.directionalLight.position.set(lightDir.x, lightDir.y, lightDir.z);
      //   this.directionalLight.position.add(new THREE.Vector3(lightRotationTemp.x, lightRotationTemp.y, lightRotationTemp.z));
      //   this.directionalLight.position.normalize();
      // }

      // this.controls.update();

      this.render();
    }
  }

  render() {
    // if (this.settings.quadView) {
    //   this.views.forEach((v: View) => {
    //     const camera: THREE.PerspectiveCamera = v.camera;
    //     // v.updateCamera( camera, this.scene, mouseX, mouseY );
    //     const left = Math.floor(this.width * v.left);
    //     const top = Math.floor(this.height * v.top);
    //     const width = Math.floor(this.width * v.width);
    //     const height = Math.floor(this.height * v.height);
    //     this.renderer.setViewport(left, top, width, height);
    //     this.renderer.setScissor(left, top, width, height);
    //     this.renderer.setScissorTest(true);
    //     this.renderer.setClearColor(v.background);
    //     camera.aspect = width / height;
    //     camera.updateProjectionMatrix();
    //     this.renderer.render(this.scene, camera);
    //   });
    // } else {
    //   this.renderer.render(this.scene, this.camera);
    // }

    this._perspectiveRenderer.render();
    this._axialRenderer.render();
    this._coronalRenderer.render();
    this._sagittalRenderer.render();
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

  // slice alignment
  moveCameraTo2DSlice = (event?) => {
    // if (this.stackHelper) {
    //   // Finish movement
    //   this.controls.finishCurrentTransition();
    //   this.sliceManipulator.finishCurrentTransition();

    //   // Store variables for restoration later
    //   this.cachedCameraOrigin = this.controls.camera.position.clone();
    //   this.cachedCameraTarget = this.controls.target.clone();
    //   this.cachedCameraUp = this.controls.camera.up.clone();
    //   this.cachedObjectsShown = this.settings.showObjects;
    //   this.cachedSliceHandleShown = this.settings.showSliceHandle;
    //   this.cachedSliceShown = this.settings.showSlice;

    //   // Switch controls and settings that are appropriate for this mode
    //   this.settings.showObjects = false;
    //   this.settings.showObjectsDisabled = true;
    //   this.settings.showSliceHandle = false;
    //   this.settings.showSliceHandleDisabled = true;
    //   this.settings.showSlice = true;
    //   this.settings.showSliceDisabled = true;
    //   this.settings.editModeDisabled = false;

    //   // store the camera position for later restoration
    //   const cameraPosition: THREE.Vector3 = this.stackHelper.slice.planePosition.clone();
    //   cameraPosition.addScaledVector(this.stackHelper.slice.planeDirection, 150.0);
    //   // choose a up vector that does not point in the same way as the target plane
    //   const upVector = new THREE.Vector3(0, 0, 1);
    //   if (Math.abs(this.stackHelper.slice.planeDirection.x) < 0.001 && Math.abs(this.stackHelper.slice.planeDirection.y) < 0.001) {
    //     upVector.set(0, 1, 0);
    //   }
    //   this.controls.changeCamera(cameraPosition, this.stackHelper.slice.planePosition.clone(), upVector, 0);

    //   // turn off the camera controls
    //   this.controls.enabled = false;
    // }
  }

  moveCameraFrom2DSlice = (event?) => {
    // if (this.stackHelper) {
    //   // turn camera controls back on
    //   this.controls.enabled = true;

    //   // reset to the old camera position
    //   this.controls.changeCamera(this.cachedCameraOrigin, this.cachedCameraTarget, this.cachedCameraUp, 0);

    //   // reset to old settings before align mode
    //   this.settings.showSlice = this.cachedSliceShown;
    //   this.settings.showSliceDisabled = false;
    //   this.settings.showSliceHandle = this.cachedSliceHandleShown;
    //   this.settings.showSliceHandleDisabled = false;
    //   this.settings.showObjects = this.cachedObjectsShown;
    //   this.settings.showObjectsDisabled = false;
    //   this.settings.editModeDisabled = true;
    // }
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
      this.settings.editMode = false;
    }
  }

  mousewheel(event) {
    // TODO: check bounds
    if (this.settings.alignMode === false) { return; }

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

    const oldPosition: THREE.Vector3 = this._perspectiveRenderer.stackHelper.slice.planePosition.clone();
    const intersectionDirection: THREE.Vector3 = this._perspectiveRenderer.stackHelper.slice.planeDirection.clone();
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
    if (intersection && this.settings.editMode) {
      this.settings.sliceMouseDown = true;

      if (this.segmentationVoxels.getGridPoint(intersection.point)) {
        this.settings.segmentationIsDeleting = true;
        this.segmentationVoxels.paintAt(intersection.point, this.settings.segmentationSize, false);
      } else {
        this.settings.segmentationIsDeleting = false;
        this.segmentationVoxels.paintAt(intersection.point, this.settings.segmentationSize, true);
      }
    }
  }

  sliceMouseUp(intersection: THREE.Intersection, pointer: MouseEvent) {
    if (intersection) {
      this.settings.sliceMouseDown = false;
      this.settings.segmentationIsDeleting = false;
    }
  }

  sliceMouseMove(intersection: THREE.Intersection, pointer: MouseEvent) {
    if (intersection && this.settings.editMode && this.settings.sliceMouseDown) {
      if (this.settings.segmentationIsDeleting) {
        this.segmentationVoxels.paintAt(intersection.point, this.settings.segmentationSize, false);
      } else {
        this.segmentationVoxels.paintAt(intersection.point, this.settings.segmentationSize, true);
      }
    }
  }
}
