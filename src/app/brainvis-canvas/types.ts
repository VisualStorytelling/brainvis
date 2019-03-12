export interface IOrientation {
    position: number[];
    target: number[];
    up: number[];
}

export interface ISlicePosition {
    position: number[];
    direction: number[];
}

export interface View {
    left: number;
    top: number;
    width: number;
    height: number;
    background: THREE.Color;
    eye: THREE.Vector3;
    up: THREE.Vector3;
    fov: number;
    camera: THREE.PerspectiveCamera;
}