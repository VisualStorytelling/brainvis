import * as THREE from 'three';

export default class SegmentationPoint extends THREE.Object3D {
    private isDragging = false;

    private _voxel: THREE.Mesh;
    public enabled = true;

    private _position: THREE.Vector3 = new THREE.Vector3(0.0, 0.0, 0.0);

    constructor(position) {
        super();

        this.visible = true;

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        this._voxel = new THREE.Mesh(geometry, material);
        this._voxel.position.copy(position);

        this.add(this._voxel);
    }

    getObjects() {
        return this.children;
    }

    isEnabled() {
        return this.visible;
    }
}
