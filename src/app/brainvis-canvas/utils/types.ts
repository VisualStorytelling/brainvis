import { Camera } from 'three';

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
    domId: string;

    left: number;
    top: number;
    width: number;
    height: number;
    // background: THREE.Color;
    // eye: THREE.Vector3;
    // up: THREE.Vector3;
    // fov: number;
    // camera: THREE.PerspectiveCamera;
    color: number;
    sliceOrientation: string;
    sliceColor: number;
    targetID: number;
}

export interface IAMIRenderer {
    camera: THREE.Camera;
    controls;
    scene: THREE.Scene;
    domElement: HTMLElement;
    init();
    render();
}
