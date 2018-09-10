/**
 * Original author: Pjotr Svetachov
 */

import * as AMI from 'ami.js';
import * as THREE from 'three';
import { IntersectionManager, IIntersectionListener } from './intersectionManager';

export default class SliceManipulatorWidget extends THREE.Object3D implements IIntersectionListener {
    private camera: THREE.Camera;
    private domElement: Element;
    private stackHelper: AMI.StackHelper;
    private plane = new THREE.Plane();
    private raycaster = new THREE.Raycaster();
    private startIntersection = new THREE.Vector3();
    private isDragging = false;

    private geometryLine: THREE.Geometry;
    private line: THREE.Line;
    private cylinder: THREE.Mesh;
    private arrowUp: THREE.Mesh;
    private arrowDown: THREE.Mesh;
    private originalSlicePosition: THREE.Vector3;
    private sphere: THREE.Mesh;
    private previousSelection;

    private oldPosition: THREE.Vector3;
    private oldDirection: THREE.Vector3;

    private changeTimeout = undefined;
    public enabled = true;

    // values we are transitioning too
    private toPosition: THREE.Vector3;
    private toDirection: THREE.Vector3;

    constructor(stackHelper, domElement, camera) {
        super();

        this.stackHelper = stackHelper;
        this.domElement = domElement;
        this.camera = camera;
        this.visible = true;

        // ray casting stuff
        this.originalSlicePosition = stackHelper.slice.planeDirection.clone();

        // make the geometry
        stackHelper.slice.updateMatrixWorld();
        const endPosition = stackHelper.slice.planeDirection.clone();
        endPosition.multiplyScalar(80.0);
        endPosition.add(stackHelper.slice.planePosition);
        const middlePosition = stackHelper.slice.planeDirection.clone();
        middlePosition.multiplyScalar(40.0);
        middlePosition.add(stackHelper.slice.planePosition);

        // line

        const geometryCylinder = new THREE.CylinderGeometry(1.5, 1.5, 40, 8);
        let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.cylinder = new THREE.Mesh(geometryCylinder, material);
        this.cylinder.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        this.cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), stackHelper.slice.planeDirection);
        this.add(this.cylinder);

        const arrow = new THREE.ConeBufferGeometry(3.5, 10);
        this.arrowUp = new THREE.Mesh(arrow, material);
        this.arrowUp.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        this.arrowUp.position.addScaledVector(stackHelper.slice.planeDirection, 25);
        this.arrowUp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), stackHelper.slice.planeDirection);
        this.add(this.arrowUp);

        this.arrowDown = new THREE.Mesh(arrow, material);
        this.arrowDown.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        this.arrowDown.position.addScaledVector(stackHelper.slice.planeDirection, -25);
        this.arrowDown.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), stackHelper.slice.planeDirection);
        this.add(this.arrowDown);


        const materialLine = new THREE.LineBasicMaterial();
        this.geometryLine = new THREE.Geometry();
        this.geometryLine.vertices.push(stackHelper.slice.planePosition.clone());
        this.geometryLine.vertices.push(endPosition);
        this.geometryLine.verticesNeedUpdate = true;
        this.line = new THREE.Line(this.geometryLine, materialLine);
        this.add(this.line);

        // sphre
        const geometrySphere = new THREE.SphereGeometry(5, 32, 32);
        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        this.sphere = new THREE.Mesh(geometrySphere, material);
        this.sphere.position.copy(endPosition);
        this.add(this.sphere);
    }

    onMouseDown(intersection: THREE.Intersection, pointer: MouseEvent) {
        if (!this.visible || !this.enabled) {
            return;
        }
        if (intersection !== undefined) {
            event.stopImmediatePropagation();
        }
        if (this.previousSelection) {
            this.previousSelection.material.color.set(0x00ff00);
            this.oldPosition = this.stackHelper.slice.planePosition.clone();
            this.oldDirection = this.stackHelper.slice.planeDirection.clone();
            this.isDragging = true;
            this.setUpRaycaster(pointer);
            this.originalSlicePosition = this.stackHelper.slice.planePosition.clone();
            this.raycaster.ray.intersectPlane(this.plane, this.startIntersection);
        }
    }

    onMouseUp(intersection: THREE.Intersection, pointer: MouseEvent) {
        if (!this.visible || !this.enabled) {
            return;
        }
        if (this.previousSelection && this.isDragging) {
            event.stopImmediatePropagation();
            this.previousSelection.material.color.set(0xff0000);
            this.isDragging = false;
            if (this.previousSelection === this.line) {
                this.dispatchEvent({
                    type: 'zoomChange',
                    position: this.stackHelper.slice.planePosition.clone(),
                    direction: this.stackHelper.slice.planeDirection.clone(),
                    oldPosition: this.oldPosition,
                    oldDirection: this.oldDirection
                });
            } else {
                this.dispatchEvent({
                    type: 'orientationChange',
                    position: this.stackHelper.slice.planePosition.clone(),
                    direction: this.stackHelper.slice.planeDirection.clone(),
                    oldPosition: this.oldPosition,
                    oldDirection: this.oldDirection
                });
            }
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
            if (intersection.object !== this.line) {
                this.highLightObject(intersection.object, 0xff0000);
            }

            // move intersection plane to intersection location
            this.plane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(this.plane.normal), intersection.object.position);
        } else {
            this.setUpRaycaster(event);
            const intersectionPoint = new THREE.Vector3();
            this.raycaster.ray.intersectPlane(this.plane, intersectionPoint);
            const intersectionDirection = new THREE.Vector3();
            intersectionDirection.copy(intersectionPoint).sub(this.startIntersection);
            const distance = intersectionDirection.dot(this.stackHelper.slice.planeDirection);
            event.stopImmediatePropagation();
            // move the slice
            if (this.previousSelection === this.line || this.previousSelection === this.cylinder
                || this.previousSelection === this.arrowUp || this.previousSelection === this.arrowDown) {
                const offset = this.stackHelper.slice.planeDirection.clone();
                offset.multiplyScalar(distance);
                offset.add(this.originalSlicePosition);
                // we need to find the position where the stack intersects the bounding box
                // push the start of the ray a little back this helps with cases where ray
                // starts at the edge of the volume and does not intersect it at all
                const beginOffset = this.originalSlicePosition.clone();
                beginOffset.sub(offset);
                const interSetionPoint = this.intersectStackHelper(beginOffset, offset);
                this.stackHelper.slice.planePosition.copy(interSetionPoint);
            } else if (this.previousSelection === this.sphere) {
                const direction = intersectionPoint.clone();
                direction.sub(this.stackHelper.slice.planePosition);
                this.stackHelper.slice.planeDirection.copy(direction);
                this.stackHelper.slice.planeDirection.normalize();
            }
            this.stackHelper.slice._update();
            this.stackHelper.border.helpersSlice = this.stackHelper.slice;
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
        // update line
        this.geometryLine.vertices[0] = this.stackHelper.slice.planePosition.clone();

        // update arrow
        const middlePosition = this.stackHelper.slice.planeDirection.clone();
        middlePosition.multiplyScalar(40.0);
        middlePosition.add(this.stackHelper.slice.planePosition);
        this.cylinder.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        this.cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), this.stackHelper.slice.planeDirection);
        this.arrowUp.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        this.arrowUp.position.addScaledVector(this.stackHelper.slice.planeDirection, 25);
        this.arrowUp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), this.stackHelper.slice.planeDirection);
        this.arrowDown.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        this.arrowDown.position.addScaledVector(this.stackHelper.slice.planeDirection, -25);
        this.arrowDown.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), this.stackHelper.slice.planeDirection);

        const endPosition = this.stackHelper.slice.planeDirection.clone();
        endPosition.multiplyScalar(80.0);
        endPosition.add(this.stackHelper.slice.planePosition);
        this.geometryLine.vertices[1] = endPosition;
        this.geometryLine.verticesNeedUpdate = true;
        this.geometryLine.computeBoundingBox();
        this.geometryLine.computeBoundingSphere();

        // update sphere
        this.sphere.position.copy(endPosition);
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

    // gives intersection with the inside of the bounding box
    // of the bounding box
    intersectStackHelper(beginpoint, endpoint) {
        const direction = endpoint.clone();
        direction.sub(beginpoint);
        const length = direction.length();
        direction.normalize();
        this.raycaster.set(beginpoint, direction);
        // ray cast against bouding box
        const geometry = new THREE.Object3D();
        const mesh = this.stackHelper.children[0]._meshStack.clone();
        mesh.material = new THREE.MeshBasicMaterial({
            wireframe: false,
            side: THREE.BackSide,
        });
        geometry.add(mesh);
        const intersections = this.raycaster.intersectObjects(geometry.children, true);
        if (intersections[0] && intersections[0].distance <= length) {
            return intersections[0].point;
        } else {
            return endpoint;
        }
    }

    finishCurrentTransition() {
        if (this.changeTimeout !== undefined) {
            clearInterval(this.changeTimeout);
            this.changeTimeout = undefined;
            this.changeSlicePosition(this.toPosition, this.toDirection, 0);
        }
    }

    /**
     * Changes the slice to a new position
     * @param newPosition new position of the slice
     * @param newDirection of the slice
     * @param milliseconds transition time
     */
    changeSlicePosition(newPosition: THREE.Vector3, newDirection: THREE.Vector3, milliseconds: number) {
        if (this.stackHelper.slice.planePosition.equals(newPosition) && this.stackHelper.slice.planeDirection.equals(newDirection)) {
            return;
        }
        if (milliseconds <= 0) {
            this.stackHelper.slice.planePosition.copy(newPosition);
            this.stackHelper.slice.planeDirection.copy(newDirection);
            this.stackHelper.slice._update();
            this.stackHelper.border.helpersSlice = this.stackHelper.slice;
            this.updateWidget();
        } else {
            // cancel previous animation
            if (this.changeTimeout !== undefined) {
                clearInterval(this.changeTimeout);
                this.changeTimeout = undefined;
            }
            let changeTime = 0;
            const delta = 30 / milliseconds;
            this.toPosition = newPosition;
            this.toDirection = newDirection;
            this.changeTimeout = setInterval((fromPosition, fromDirection, toPosition, toDirection) => {
                this.enabled = false;
                const t = changeTime;
                const interPolateTime = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in/out function

                const nextPosition = fromPosition.clone();
                const distancePosition = toPosition.clone();
                distancePosition.sub(fromPosition);
                nextPosition.addScaledVector(distancePosition, interPolateTime);

                const nextDirection = fromDirection.clone();
                const distanceUp = toDirection.clone();
                distanceUp.sub(fromDirection);
                nextDirection.addScaledVector(distanceUp, interPolateTime);
                nextDirection.normalize();

                this.changeSlicePosition(nextPosition, nextDirection, 0);
                changeTime += delta;
                if (changeTime > 1.0) {
                    this.changeSlicePosition(toPosition, toDirection, 0);
                    clearInterval(this.changeTimeout);
                    this.changeTimeout = undefined;
                    this.enabled = true;
                }
            }, 30, this.stackHelper.slice.planePosition, this.stackHelper.slice.planeDirection, newPosition, newDirection);
        }
    }
}
