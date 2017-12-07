import * as THREE from 'three';
import * as AMI from 'ami.js';
import { Orientation } from './brainvisTypes';


export default class BrainvisCanvas extends THREE.EventDispatcher {
    private width:number;
    private height:number;
    private elem:Element;
    private scene = new THREE.Scene();
    private camera:THREE.PerspectiveCamera;
    private renderer = new THREE.WebGLRenderer();
    private controls:AMI.TrackballControl;

    constructor(elem, width, height) {
        super();
        this.width = width;
        this.height = height;
        this.elem = elem;

        this.scene.background = new THREE.Color('black');
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        this.renderer.setSize(width, height);
        this.elem.appendChild(this.renderer.domElement);

        // Setup controls
        this.controls = new AMI.TrackballControl(this.camera, this.elem);

        //Initial camera position
        this.controls.position0.set(0,0,5);
        this.controls.reset();

        //Store camera matrix so we can manipulate it in the provenance graph
        // this.cameraMatrix = this.camera.matrix.toArray();

        this.initScene();
        this.addEventListeners();
        this.animate();
    }

    initScene() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);

        this.scene.add(cube);
    }

    addEventListeners() {
        this.controls.addEventListener('start', (event) => {
            const position = this.controls.object.position.toArray();
            const target = this.controls.target.toArray();
            const up = this.controls.object.up.toArray();
            const orientation = { position, target, up };

            this.dispatchEvent({
                type: 'cameraStart',
                orientation
            });
        });

        this.controls.addEventListener('end', (event) => {
            const position = this.controls.object.position.toArray();
            const target = this.controls.target.toArray();
            const up = this.controls.object.up.toArray();
            const orientation = { position, target, up };

            this.dispatchEvent({
                type: 'cameraEnd',
                orientation
            });
        });
    }

    setSize(width:number, height:number) {
        this.camera.aspect = width/height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width,height);
    }

    setInteractive(interactive:boolean) {
        this.controls.enabled = interactive;
    }

    setControlOrientation(newOrientation:Orientation) { //:Orientation {
        const oldPosition = this.controls.object.position;
        const oldTarget = this.controls.target;
        const oldUp = this.controls.object.up;

        this.controls.position0.set( newOrientation.position[0], newOrientation.position[1], newOrientation.position[2] );
        this.controls.target0.set( newOrientation.target[0], newOrientation.target[1], newOrientation.target[2] );
        this.controls.up0.set( newOrientation.up[0], newOrientation.up[1], newOrientation.up[2] );
        this.controls.reset();

        // return {position:oldPosition, target:oldTarget, up:oldUp};
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.controls.update();

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    };
}
