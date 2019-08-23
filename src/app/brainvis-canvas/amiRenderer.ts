import { View } from './utils/types';

import * as AMI from 'ami.js';
import * as THREE from 'three';
import { BrainvisCanvasComponent } from './brainvis-canvas.component';

export class AMIRenderer {
    protected _initialized = false;
    protected _canvas: BrainvisCanvasComponent;

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

    constructor(view: View, canvas: BrainvisCanvasComponent) {
        this._canvas = canvas;
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

    public get renderer() {
        return this._renderer;
    }

    addEventListeners() {
        this._controls.addEventListener('mousewheel', this.onScroll.bind(this));
        this._controls.addEventListener('OnScroll', this.onScroll.bind(this));
        this.domElement.addEventListener('dblclick', this.onDoubleClick.bind(this));
    }

    protected onClick(event) {
        if (this._initialized) {
            const canvas = event.target.parentElement;
            //   const id = event.target.id;
            const mouse = {
                x: ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1,
                y: -((event.clientY - canvas.offsetTop) / canvas.clientHeight) * 2 + 1,
            };

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, this._camera);

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
    }
    // r0.domElement.addEventListener('click', onClick);

    protected onScroll(event) {
        if (this._initialized) {
            // if (event.delta > 0) {
            //     if (this._stackHelper.index >= this._stackHelper.orientationMaxIndex - 1) {
            //         return;
            //     }
            //     this._stackHelper.index += 1;
            // } else {
            //     if (this._stackHelper.index <= 0) {
            //         return;
            //     }
            //     this._stackHelper.index -= 1;
            // }

            this._canvas.onAxialChanged();
            this._canvas.onCoronalChanged();
            this._canvas.onSagittalChanged();
        }
    }

    protected onDoubleClick(event) {
        if (this._initialized) {
            const canvas = event.target.parentElement;
            const id = event.target.id;
            const mouse = {
                x: ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1,
                y: -((event.clientY - canvas.offsetTop) / canvas.clientHeight) * 2 + 1,
            };

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, this._camera);

            const intersects = raycaster.intersectObjects(this._scene.children, true);

            if (intersects.length > 0) {
                const ijk = AMI.UtilsCore.worldToData(this._stackHelper.stack.lps2IJK, intersects[0].point);
                this._canvas.adjustLocalizersOnDoubleClick(ijk);
            }
        }
    }
}
