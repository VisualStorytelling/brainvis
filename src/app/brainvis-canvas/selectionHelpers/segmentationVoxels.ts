import * as THREE from 'three';

export default class SegmentationVoxels extends THREE.Object3D {
    public enabled = true;

    private _position: THREE.Vector3 = new THREE.Vector3(0.0, 0.0, 0.0);
    private _grid: boolean[];
    private _geometry: THREE.BoxGeometry;
    private _material: THREE.MeshBasicMaterial;
    private _voxels: {[key: string]: THREE.Mesh};
    private _gridSize: number;
    private _height: number;
    private _width: number
    private _depth: number;

    constructor(height, width, depth, gridSize) {
        super();

        this.visible = true;

        this._grid = new Array<boolean>(height * width * depth);
        this._voxels = {};
        this._gridSize = gridSize;
        this._height = height;
        this._width = width;
        this._depth = depth;

        this._geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
        this._material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent:true, opacity:0.5 });
    }

    private hash(xyz: Array<number>): string {
        return (xyz[0] * 31 + xyz[1] * 43 + xyz[2]*71).toString();
    }

    private roundPoint(location: THREE.Vector3) {
        let X = Math.round(location.x / this._gridSize);
        let Y = Math.round(location.y / this._gridSize);
        let Z = Math.round(location.z / this._gridSize);

        return [X, Y, Z];
    }

    private gridIndex(xyz: Array<number>) {
        return ((this._height * this._width) * xyz[2]) + (this._height * xyz[1]) + xyz[0];
    }

    paintAt(location: THREE.Vector3, segmentationSize: number, value: boolean) {
        let xyz = this.roundPoint(location)

        if (segmentationSize == 1) {
            this.setGridPoint(xyz, value);
        } else if (segmentationSize == 3) {
            for (let u = -1; u <= 1; u ++) {
                for (let v = -1; v <= 1; v ++) {
                    for (let w = -1; w <= 1; w ++) {
                        let newxyz = [(xyz[0]+u), (xyz[1]+v), (xyz[2]+w)];
                        this.setGridPoint(newxyz, value);
                    }
                } 
            }
        }
    }

    setGridPoint(xyz: Array<number>, value: boolean): boolean {
        let gridIndex = this.gridIndex(xyz);
        let oldValue = this._grid[gridIndex];

        if (value) {
            if (!oldValue) {
                let voxel = new THREE.Mesh(this._geometry, this._material);
                voxel.position.copy(new THREE.Vector3(xyz[0] * this._gridSize, xyz[1] * this._gridSize, xyz[2] * this._gridSize));
                this._voxels[this.hash(xyz)] = voxel;
                this.add(voxel);
            }
        } else {
            if (oldValue) {
                let oldVoxel = this._voxels[this.hash(xyz)];
                this.remove(oldVoxel);
            }
        }
        this._grid[gridIndex] = value;

        return oldValue;
    }

    getGridPoint(location: THREE.Vector3) {
        let xyz = this.roundPoint(location)
        let gridIndex = this.gridIndex(xyz);
        return this._grid[gridIndex];
    }

    getObjects() {
        return this.children;
    }

    isEnabled() {
        return this.visible;
    }
}
