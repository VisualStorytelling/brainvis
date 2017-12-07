import * as THREE from 'three';
import * as AMI from 'ami.js';

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
        this.camera.position.z = 5;

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
            const matrix = this.camera.matrix.toArray();
            this.dispatchEvent({
                type: 'cameraStart',
                matrix
            });
        });

        this.controls.addEventListener('end', (event) => {
            const matrix = this.camera.matrix.toArray();
            this.dispatchEvent({
                type: 'cameraEnd',
                matrix
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

    setCameraMatrix(matrix:number[]) {
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3();

        const oldMatrix = this.camera.matrix.toArray();
        const c = this.camera;
        const newMatrix = new THREE.Matrix4().fromArray(matrix);

        newMatrix.decompose(position, quaternion, scale);
        c.position.copy(position);
        c.quaternion.copy(quaternion);
        c.scale.copy(scale);

        c.updateMatrixWorld( true );

        return oldMatrix;
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
