import * as THREE from 'three';
import * as AMI from 'ami.js';

import { IOrientation, ISlicePosition } from './types';

import Trackball from './trackball';
import SliceManipulatorWidget from './sliceManipulatorWidget';

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

    // store slice position values in case AMI is not ready with loading data
    private storedSlicePosition: THREE.Vector3;
    private storedSliceDirection: THREE.Vector3;

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
        this.controls = new Trackball(this.camera, this.elem);

        //Initial camera position
        this.controls.position0.set(0, 0, 5);
        this.controls.reset();

        this.initScene();
        this.addEventListeners();
        this.animate();

        // TWEEN.autoPlay(true);
    }

    initScene() {

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
                this.sliceManipulator.addEventListener('change',this.onSlicePlaneChange);

            }.bind(this))
            .catch(function (error) {
                window.console.log('oops... something went wrong...');
                window.console.log(error);
            });
    }

    addEventListeners() {
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
    }

    setInteractive(interactive: boolean) {
        this.controls.enabled = interactive;
    }

    // setControlOrientation(newOrientation: IOrientation, within: number) {
    //     if (within < 0) {
    //         this.controls.position0.set(newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]);
    //         this.controls.target0.set(newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]);
    //         this.controls.up0.set(newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]);
    //         this.controls.reset();
    //     } else {
    //         const oldPosition = this.controls.object.position;
    //         const oldTarget = this.controls.target;
    //         const oldUp = this.controls.object.up;

    //         const newPosition = this.controls.object.position;
    //         const newTarget = this.controls.target;
    //         const newUp = this.controls.object.up;

    //         const tweenOrigin = {
    //             positionX: oldPosition.x, positionY: oldPosition.y, positionZ: oldPosition.z,
    //             targetX: oldTarget.x, targetY: oldTarget.y, targetZ: oldTarget.z,
    //             upX: oldUp.x, upY: oldUp.y, upZ: oldUp.z
    //         };
    //         const tweenTarget = {
    //             positionX: newPosition.x, positionY: newPosition.y, positionZ: newPosition.z,
    //             targetX: newTarget.x, targetY: newTarget.y, targetZ: newTarget.z,
    //             upX: newUp.x, upY: newUp.y, upZ: newUp.z
    //         };

    //         const controlTween = new TWEEN.Tween(tweenOrigin)
    //             .to(tweenTarget, within)
    //             .onUpdate(({
    //                 positionX, positionY, positionZ,
    //                 targetX, targetY, targetZ,
    //                 upX, upY, upZ }) => {
    //                 console.log(positionX);
    //             });
    //         controlTween.start();
    //     }
    // }

    setControlOrientation(newOrientation: IOrientation, within: number) {
        this.controls.changeCamera(new THREE.Vector3(newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]),
            new THREE.Vector3(newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]),
            new THREE.Vector3(newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]),
            true);
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        // TWEEN.update();

        this.controls.update();

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    };

    onSlicePlaneChange = (event) => {
        const position = event.position.toArray();
        const direction = event.direction.toArray();
        const oldPosition = event.oldPosition.toArray();
        const oldDirection = event.oldDirection.toArray();
        const changes = { position, direction, oldPosition, oldDirection };

        this.dispatchEvent({
            type: 'sliceChanged',
            changes
        });
    }

    setSlicePlanePosition(positions: ISlicePosition) {
        if(this.stackHelper) {
            this.stackHelper.slice.planePosition.set(positions.position[0],positions.position[1],positions.position[2]);
            this.stackHelper.slice.planeDirection.set(positions.direction[0],positions.direction[1],positions.direction[2]);
            this.stackHelper.slice._update();
            this.stackHelper.border.helpersSlice = this.stackHelper.slice;
            this.sliceManipulator.updateWidget();
        } else {
            this.storedSlicePosition = new THREE.Vector3(positions.position[0],positions.position[1],positions.position[2]);
            this.storedSliceDirection = new THREE.Vector3(positions.direction[0],positions.direction[1],positions.direction[2]);
        }
    }
}
