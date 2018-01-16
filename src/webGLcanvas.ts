import * as THREE from 'three';
import * as AMI from 'ami.js';

import { IOrientation, ISlicePosition } from './types';

import Trackball from './trackball';
import SliceManipulatorWidget from './sliceManipulatorWidget';
import STLLoader from './STLLoader';

export default class BrainvisCanvas extends THREE.EventDispatcher {
    private width: number;
    private height: number;
    private elem: Element;
    private scene = new THREE.Scene();
    private camera: THREE.PerspectiveCamera;
    private renderer = new THREE.WebGLRenderer();
    private controls: Trackball;
    private stackHelper: AMI.StackHelper;
    private sliceManipulator: SliceManipulatorWidget;
    private sliceCheckbox: HTMLInputElement;
    private sliceHandleCheckbox: HTMLInputElement;

    // store slice position values in case AMI is not ready with loading data
    private storedSlicePosition: THREE.Vector3;
    private storedSliceDirection: THREE.Vector3;
    // store stack visibility
    private storedStackVisible: boolean;
    private storedStackHandleVisible: boolean;

    private directionalLight: THREE.DirectionalLight;
    private lightRotation: THREE.Vector3 = new THREE.Vector3(0,0,0);

    constructor(elem, width, height) {
        super();
        this.width = width;
        this.height = height;
        this.elem = elem;

        this.scene.background = new THREE.Color('black');
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);

        this.renderer.setSize(width, height);
        this.elem.appendChild(this.renderer.domElement);

        // Setup controls
        this.controls = new Trackball(this.camera, this.renderer.domElement);

        //Initial camera position
        this.controls.position0.set(0, 0, 5);
        this.controls.reset();

        this.initScene();
        this.addEventListeners();
        this.animate();

        // div with buttons
        const elem2 =  document.createElement('div');
        elem2.classList.add('gui');
        elem2.innerHTML = ` <div >
                            <div class="noSelectText">
                                Light direction
                                <div>
                                    <div class="circle" id="circle">
                                        <div class='dot' id="dot"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="checkbox" checked id="sliceCheckbox">Show slice</input><br/>
                                <input type="checkbox" id="sliceHandleCheckbox">Show slice handle</input>
                            </div>
                        </div>`;
        this.elem.appendChild(elem2);
        this.sliceCheckbox = <HTMLInputElement>document.getElementById('sliceCheckbox');
        this.sliceCheckbox.addEventListener('change',this.sliceToggled);
        this.sliceHandleCheckbox = <HTMLInputElement>document.getElementById('sliceHandleCheckbox');
        this.sliceHandleCheckbox.addEventListener('change',this.sliceHandleToggled);

        const circleElement = document.getElementById('circle');
        let isDragging;
        circleElement.addEventListener('mousedown', function(e) {
            return isDragging = true;
        });
        document.addEventListener('mouseup', function(e) {
            return isDragging = false;
        });
        document.addEventListener('mousemove', function(e) {
        let  centerX, centerY, circle, deltaX, deltY, posX, posY, dot;
            if (isDragging) {
                circle = document.getElementById('circle');
                const boundRect = circle.getBoundingClientRect();
                centerX = boundRect.x + boundRect.width/2;
                centerY = boundRect.y + boundRect.height/2;
                posX = e.pageX;
                posY = e.pageY;
                deltaX = centerX - posX;
                deltY = centerY - posY;
                const posFromCenter = new THREE.Vector3(deltaX,deltY,0);
                posFromCenter.clampLength(0,boundRect.width/2);
                dot = document.getElementById('dot');
                const dotWidth = dot.getBoundingClientRect().width;
                dot.style.transform = 'translate(' + (boundRect.width/2 - posFromCenter.x - dotWidth) + 'px,' + (boundRect.height/2 - posFromCenter.y - dotWidth/2)+'px)';
                posFromCenter.divideScalar(50.0);
                this.lightRotation = posFromCenter.clone();
                this.lightRotation.setX(-this.lightRotation.x);
                return true;
            }
        }.bind(this));
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
            '36747136',
            '36747150',
            '36747164',
            '36747178',
            '36747192',
            '36747206',
            '36747220',
            '36747234',
            '36747248',
            '36747262',
            '36747276',
            '36747290',
            '36747304',
            '36747318',
            '36747332',
            '36747346',
            '36747360',
            '36747374',
            '36747388',
            '36747402',
            '36747416',
            '36747430',
            '36747444',
            '36747458',
            '36747472',
            '36747486',
            '36747500',
            '36747514',
            '36747528',
            '36747542',
            '36747556',
            '36747570',
            '36747584',
            '36747598',
            '36747612',
            '36747626',
            '36747640',
            '36747654',
            '36747668',
            '36747682',
            '36747696',
            '36747710',
            '36747724',
            '36747738',
            '36747752',
            '36747766',
            '36747780',
            '36747794',
            '36747808',
            '36747822',
            '36747836',
            '36747850',
            '36747864',
            '36747878',
            '36747892',
            '36747906',
            '36747920',
            '36747934',
            '36747948',
            '36747962',
            '36747976',
            '36747990',
            '36748004',
            '36748018',
            '36748032',
            '36748046',
            '36748060',
            '36748074',
            '36748088',
            '36748102',
            '36748116',
            '36748130',
            '36748144',
            '36748158',
            '36748172',
            '36748186',
            '36748578',
            '36748592',
            '36748606',
            '36748620',
            '36748634',
            '36748648',
            '36748662',
            '36748676',
            '36748690',
            '36748704',
            '36748718',
            '36748732',
            '36748746',
            '36748760',
            '36748774',
            '36748788',
            '36748802',
            '36748816',
            '36748830',
            '36748844',
            '36748858',
            '36748872',
            '36748886',
            '36748900',
            '36748914',
            '36748928',
            '36748942',
            '36748956',
            '36748970',
            '36748984',
            '36748998',
            '36749012',
            '36749026',
            '36749040',
            '36749054',
            '36749068',
            '36749082',
            '36749096',
            '36749110',
            '36749124',
            '36749138',
            '36749152',
            '36749166',
            '36749180',
            '36749194',
            '36749208',
            '36749222',
            '36749236',
            '36749250',
            '36749264',
            '36749278',
            '36749292',
            '36749306',
            '36749320',
            '36749334',
            '36749348',
            '36749362',
            '36749376',
            '36749390',
            '36749404',
            '36749418',
            '36749446',
            '36749460',
            '36749474',
            '36749488',
            '36749502',
            '36749516',
            '36749530',
            '36749544',
            '36749558',
            '36749572',
            '36749586',
            '36749600',
            '36749614',
            '36749628',
            '36749642',
            '36749656',
            '36749670',
            '36749684',
            '36749698',
            '36749712',
            '36749726',
            '36749740',
            '36749754',
            '36749768',
            '36749782',
            '36749796',
            '36749810',
            '36749824',
            '36749838',
            '36749852',
            '36749866',
            '36749880',
            '36749894',
            '36749908',
            '36749922',
            '36749936',
            '36749950',
            '36749964'
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
                if(this.storedSlicePosition) {
                    this.stackHelper.slice.planePosition.copy(this.storedSlicePosition);
                    this.stackHelper.slice.planeDirection.copy(this.storedSliceDirection);
                } else {
                    this.stackHelper.slice.planePosition.x = centerLPS.x;
                    this.stackHelper.slice.planePosition.y = centerLPS.y;
                    this.stackHelper.slice.planePosition.z = centerLPS.z;
                    this.stackHelper.slice.planeDirection = new THREE.Vector3(1, 0, 0).normalize();
                }
                this.stackHelper.slice._update();
                this.stackHelper.border.helpersSlice = this.stackHelper.slice;

                // slice manipulator
                this.sliceManipulator = new SliceManipulatorWidget(this.stackHelper,this.renderer.domElement,this.camera);
                this.scene.add(this.sliceManipulator);
                //this.sliceManipulator.visible = false;
                this.sliceManipulator.addEventListener('zoomChange',this.onSlicePlaneZoomChange);
                this.sliceManipulator.addEventListener('orientationChange',this.onSlicePlaneOrientationChange);
                this.sliceManipulator.visible = this.sliceHandleCheckbox.checked;

                if(this.storedStackVisible !== undefined) {
                    this.toggleSlice(this.storedStackVisible);
                }

                if(this.storedStackHandleVisible !== undefined) {
                    this.toggleSliceHandle(this.storedStackHandleVisible);
                }

                this.controls.initEventListeners();
            }.bind(this))
            .catch(function (error) {
                window.console.log('oops... something went wrong...');
                window.console.log(error);
            });

            // Load STL model
        const loaderSTL = new STLLoader();
        loaderSTL.load('https://cdn.rawgit.com/FNNDSC/data/master/stl/adi_brain/WM.stl', function(geometry) {
            const material = new THREE.MeshPhongMaterial({ color: 0xf44336, specular: 0x111111, shininess: 200 });
            const mesh = new THREE.Mesh(geometry, material);
            // to LPS space
            const rasToLPS = new THREE.Matrix4();
            rasToLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            mesh.applyMatrix(rasToLPS);
            this.scene.add(mesh);
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
        if(this.sliceManipulator) {
            this.sliceManipulator.enabled = interactive;
        }
    }

    setControlZoom(newOrientation: IOrientation, within: number) {
        this.controls.changeCamera(new THREE.Vector3(newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]),
            new THREE.Vector3(newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]),
            new THREE.Vector3(newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]),
            within >0? within : 1000);
    }

    setControlOrientation(newOrientation: IOrientation, within: number) {
        this.controls.changeCamera(new THREE.Vector3(newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]),
            new THREE.Vector3(newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]),
            new THREE.Vector3(newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]),
            within >0? within : 1000);
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        // update light position
        if(this.stackHelper) {
            const lightDir = this.camera.position.clone();
            lightDir.sub(this.stackHelper.stack.worldCenter());
            lightDir.normalize();

            const lightRotationTemp = this.lightRotation.clone();
            lightRotationTemp.applyQuaternion(this.camera.quaternion);

            this.directionalLight.position.set(lightDir.x,lightDir.y,lightDir.z);
            this.directionalLight.position.add(new THREE.Vector3(lightRotationTemp.x,lightRotationTemp.y,lightRotationTemp.z));
            this.directionalLight.position.normalize();
        }

        this.controls.update();

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    };

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
        if(this.stackHelper) {
            this.sliceManipulator.changeSlicePosition(new THREE.Vector3(positions.position[0],positions.position[1],positions.position[2]),
            new THREE.Vector3(positions.direction[0],positions.direction[1],positions.direction[2]), within>0?within:1000);
        } else {
            this.storedSlicePosition = new THREE.Vector3(positions.position[0],positions.position[1],positions.position[2]);
            this.storedSliceDirection = new THREE.Vector3(positions.direction[0],positions.direction[1],positions.direction[2]);
        }
    }

    toggleSlice(state){
        if(this.stackHelper){
            this.stackHelper._slice.visible = state;
            this.stackHelper._border.visible = state;
            this.sliceHandleCheckbox.disabled = !state;
            this.sliceCheckbox.checked = state;
            if(state === false){
                this.sliceManipulator.visible = state;
            } else {
                this.sliceManipulator.visible = this.sliceHandleCheckbox.checked;
            }
        } else {
            this.storedStackVisible = state;
        }
    }

    toggleSliceHandle(state){
        if(this.sliceManipulator){
            this.sliceManipulator.visible = state;
            this.sliceHandleCheckbox.checked = state;
        } else {
            this.storedStackHandleVisible = state;
        }
    }

    sliceToggled = (checkBox) => {
        this.toggleSlice(checkBox.currentTarget.checked);
        this.onSliceVisibilityChange( checkBox.currentTarget.checked);
    }
    sliceHandleToggled  = (checkBox) => {
        this.toggleSliceHandle(checkBox.currentTarget.checked);
        this.onSliceHandleVisibilityChange( checkBox.currentTarget.checked);
    }
}
