/*
Special class to manage intersection with goemtry.
Subsystems can register to be tested for intersections.
All subsytems gets mouse up/down/move messages but the substem with the closest hitpoint will get intersection information.
*/

import * as THREE from 'three';
import { Event, Object3D } from 'three';
import { list } from 'phovea_core/src/plugin';

export interface IIntersectionListener {
    onMouseDown: (intersection: THREE.Intersection, pointer : MouseEvent) => void;
    onMouseUp: (intersection: THREE.Intersection, pointer : MouseEvent) => void;
    onMouseMove: (intersection: THREE.Intersection, pointer : MouseEvent) => void;
    getObjects: () => THREE.Object3D[];
    isEnabled: () => boolean;
}

export class StaticGeometryListener implements IIntersectionListener {
    object: THREE.Object3D;

    constructor(object: THREE.Object3D) {
        this.object = object;
    }

    onMouseDown(intersection: THREE.Intersection, pointer: MouseEvent) {
        //
    }

    onMouseUp(intersection: THREE.Intersection, pointer: MouseEvent) {
        //
    }

    onMouseMove(intersection: THREE.Intersection, pointer: MouseEvent) {
        //
    }

    getObjects() {
        return this.object.children;
    }

    isEnabled() {
        return this.object.visible;
    }

}

export class IntersectionManager {
    private camera: THREE.Camera;
    private domElement: Element;
    private listeners: IIntersectionListener[] = [];
    private raycaster = new THREE.Raycaster();

    constructor(domElement, camera) {
        this.camera = camera;
        this.domElement = domElement;

        domElement.addEventListener('mousemove', this.onMouseMove, false);
        domElement.addEventListener('mousedown', this.onMouseDown, false);
        domElement.addEventListener('mouseup', this.onMouseUp, false);
    }

    addListener(listener: IIntersectionListener) {
        this.listeners.push(listener);
    }

    removeListener(listener: IIntersectionListener) {
        const index = this.listeners.indexOf(listener);
        if(index > -1) {
            this.listeners.splice(index,1);
        }
    }

    setUpRaycaster(pointer : MouseEvent) {
        const rect = this.domElement.getBoundingClientRect();
        const x = (pointer.clientX - rect.left) / rect.width;
        const y = (pointer.clientY - rect.top) / rect.height;

        const pointerVector = new THREE.Vector2((x * 2) - 1, - (y * 2) + 1);
        this.raycaster.setFromCamera(pointerVector, this.camera);
    }

    intersectObjects(pointer : MouseEvent, objects : THREE.Object3D[]) {
        this.setUpRaycaster(pointer);

        const intersections = this.raycaster.intersectObjects(objects, true);
        return intersections[0] ? intersections[0] : false;
    }

    getClosestObject(event : MouseEvent) : [IIntersectionListener, THREE.Intersection] {
        this.setUpRaycaster(event);
        let closestListener : IIntersectionListener;
        let closestIntersection : THREE.Intersection;
        for(const listener of this.listeners) {
            if(listener.isEnabled()) {
                const intersection = this.intersectObjects(event, listener.getObjects());
                if(intersection !== false) {
                    if(closestIntersection === undefined || (intersection.distance < closestIntersection.distance)) {
                        closestIntersection = intersection;
                        closestListener = listener;
                    }
                }
            }
        }
        return [closestListener, closestIntersection];
    }

    onMouseDown = (event : MouseEvent) => {
        const intersection = this.getClosestObject(event);
        for(const listener of this.listeners) {
            if(intersection[0] === listener) {
                listener.onMouseDown(intersection[1],event);
            } else {
                listener.onMouseDown(undefined,event);
            }
        }
    }

    onMouseMove = (event) => {
        const intersection = this.getClosestObject(event);
        for(const listener of this.listeners) {
            if(intersection[0] === listener) {
                listener.onMouseMove(intersection[1],event);
            } else {
                listener.onMouseMove(undefined,event);
            }
        }
    }

    onMouseUp = (event) => {
        const intersection = this.getClosestObject(event);
        for(const listener of this.listeners) {
            if(intersection[0] === listener) {
                listener.onMouseUp(intersection[1],event);
            } else {
                listener.onMouseUp(undefined,event);
            }
        }
    }
}
