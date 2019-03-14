import { View } from './utils/types';

import * as AMI from 'ami.js';
import * as THREE from 'three';

export class AMIRenderer {
    protected _initialized = false;

    protected _color = 0x121212;
    protected _targetID = 1;

    protected _domElement: HTMLElement;
    protected _renderer: THREE.WebGLRenderer;
    protected _camera: any;
    protected _controls: any;
    protected _scene: THREE.Scene;
    protected _light: THREE.Light;

    protected _sliceOrientation: string;
    protected _sliceColor: number;

    protected _stackHelper: AMI.HelpersStack;
    protected _localizerHelper: AMI.HelpersLocalizer;
    protected _localizerScene: THREE.Scene;

    constructor(view: View) {
        this._domElement = document.getElementById(view.domId);
        this._color = view.color; // 0x121212
        this._targetID = view.targetID; // 1
    }

    public get camera() {
        return this._camera;
    }

    public get controls() {
        return this._controls;
    }

    public get scene(): THREE.Scene {
        return this._scene;
    }

    public get domElement(): HTMLElement {
        return this._domElement;
    }

    public get stackHelper(): AMI.HelpersStack {
        return this._stackHelper;
    }

    public get localizerHelper(): AMI.HelpersLocalizer {
        return this._localizerHelper;
    }
}
