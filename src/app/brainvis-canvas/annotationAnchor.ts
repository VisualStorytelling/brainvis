import * as THREE from 'three';
import { IntersectionManager, IIntersectionListener } from './intersectionManager';
import { Vector3 } from 'three';
import DragControls from 'three-dragcontrols';

export default class AnnotationAnchor extends THREE.Object3D implements IIntersectionListener {
    private camera: THREE.Camera;
    private domElement: Element;

    private raycaster = new THREE.Raycaster();
    // private startIntersection = new THREE.Vector3();
    private isDragging = false;

    private sphere: THREE.Mesh;
    private previousSelection;

    private changeTimeout = undefined;
    public enabled = true;

    private oldPosition: THREE.Vector3 = new THREE.Vector3(2.0, 2.0, 2.0);
    private newPosition: THREE.Vector3;

    private dragControls: DragControls;

    constructor(domElement, camera) {
        super();

        this.domElement = domElement;
        this.camera = camera;
        this.visible = true;

        const geometrySphere = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        this.sphere = new THREE.Mesh(geometrySphere, material);
        this.sphere.position.copy(this.oldPosition);

        this.add(this.sphere);

        this.dragControls = new DragControls( this.sphere, camera, domElement );
        this.sphere.addEventListener( 'dragstart', function ( event ) { this.dragControls.enabled = false; } );
        this.sphere.addEventListener( 'dragend', function ( event ) { this.dragControls.enabled = true; } );
    }

    onMouseDown(intersection: THREE.Intersection, pointer: MouseEvent) {
        if (!this.visible || !this.enabled) {
            return;
        }
        if (intersection !== undefined) {
            event.stopImmediatePropagation();
        }
        if (this.previousSelection) {
            console.log('previously selected');
            this.previousSelection.material.color.set(0x00ffff);
            this.oldPosition = this.sphere.position.clone();
            this.isDragging = true;

            this.setUpRaycaster(pointer);
            // this.raycaster.ray.intersectPlane(this.plane, this.startIntersection);
        } else {
            console.log('hit');
        }
    }

    onMouseUp(intersection: THREE.Intersection, pointer: MouseEvent) {
        if (!this.visible || !this.enabled) {
            return;
        }
        if (this.previousSelection && this.isDragging) {
            event.stopImmediatePropagation();
            this.previousSelection.material.color.set(0x00ff00);
            this.isDragging = false;

            this.dispatchEvent({
                type: 'annotationAnchorPositionChange',
                position: this.sphere.position.clone(),
                oldPosition: this.oldPosition
            });
        }
    }

    onMouseMove(intersection: THREE.Intersection, pointer: MouseEvent) {
        if (!this.visible || !this.enabled) {
            return;
        }
        if (intersection !== undefined) {
            event.stopImmediatePropagation();
        }
        if (!this.isDragging) {
            if (intersection === undefined) {
                this.clearSelection();
                return;
            }
        } else {
            this.setUpRaycaster(event);
            const intersectionPoint = new THREE.Vector3();
            // TODO
            this.updateWidget();
        }
    }

    getObjects() {
        return this.children;
    }

    isEnabled() {
        return this.visible;
    }

    updateWidget() {
        // TODO
        // update sphere
        // this.sphere.position.copy(endPosition);
    }

    // highlight a object and returns previous highlighted object to original color
    highLightObject(newObject, newColor) {
        // store object previous color if we haven't done so
        if (this.previousSelection !== newObject) {
            if (this.previousSelection) {
                this.previousSelection.material.color = this.previousSelection.previousColor.clone();
            }
            this.previousSelection = newObject;
        }
        if (!newObject.previousColor) {
            newObject.previousColor = newObject.material.color.clone();
        }
        newObject.material.color.set(newColor);
    }

    clearSelection() {
        if (this.previousSelection) {
            this.previousSelection.material.color = this.previousSelection.previousColor.clone();
        }
        this.previousSelection = null;
    }

    setUpRaycaster(pointer) {
        const rect = this.domElement.getBoundingClientRect();
        const x = (pointer.clientX - rect.left) / rect.width;
        const y = (pointer.clientY - rect.top) / rect.height;

        const pointerVector = new THREE.Vector2((x * 2) - 1, - (y * 2) + 1);
        this.raycaster.setFromCamera(pointerVector, this.camera);
    }
}
