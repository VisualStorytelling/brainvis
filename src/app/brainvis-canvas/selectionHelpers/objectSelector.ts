import * as THREE from 'three';
// const { Object3D } = THREE;
import { IIntersectionListener } from './intersectionManager';

export default class ObjectSelector extends THREE.EventDispatcher implements IIntersectionListener {
    private objects: THREE.Object3D;
    private previousSelectedObject: THREE.Mesh;
    private previousColor: number;

    constructor(objects: THREE.Object3D) {
        super();
        this.objects = objects;
    }

    onMouseDown(intersection: THREE.Intersection, pointer: MouseEvent) {
        if (intersection !== undefined) {
            event.stopImmediatePropagation();
        }
        if (intersection !== undefined &&
            this.previousSelectedObject !== intersection.object &&
            intersection.object instanceof THREE.Mesh) {

            const asMesh = <THREE.Mesh>intersection.object;
            if (asMesh.material instanceof THREE.MeshPhongMaterial) {
                let previousName = '';
                let asMeshPongMaterial = null;
                if (this.previousSelectedObject) {
                    asMeshPongMaterial = this.previousSelectedObject.material as THREE.MeshPhongMaterial;
                    asMeshPongMaterial.color.setHex(this.previousColor);
                    previousName = this.previousSelectedObject.name;
                }
                asMeshPongMaterial = asMesh.material as THREE.MeshPhongMaterial;
                this.previousSelectedObject = asMesh;
                this.previousColor = asMeshPongMaterial.color.getHex();
                asMeshPongMaterial.color.setHex(0x0000ff);

                this.dispatchEvent({
                    type: 'objectSelection',
                    newObject: asMesh
                });
            }
        } else if (this.previousSelectedObject) {
            const asMeshPongMaterial = <THREE.MeshPhongMaterial>this.previousSelectedObject.material;
            asMeshPongMaterial.color.setHex(this.previousColor);

            this.dispatchEvent({
                type: 'objectSelection',
                newObject: undefined
            });
            this.previousSelectedObject = undefined;
        }
    }

    onMouseUp(intersection: THREE.Intersection, pointer: MouseEvent) {
        //
    }

    onMouseMove(intersection: THREE.Intersection, pointer: MouseEvent) {
        //
    }

    getObjects() {
        return this.objects.children;
    }
    isEnabled() {
        return this.objects.visible;
    }

    setSelection(newSelection) {
        let objectToSelect = null;

        if (newSelection instanceof Array) {
            newSelection = newSelection[0];
        }

        for (const object of this.objects.children) {
            if (newSelection && object.name === newSelection.name) {
                objectToSelect = object;
                break;
            }
        }

        if (this.previousSelectedObject) {
            const asMeshPongMaterial = <THREE.MeshPhongMaterial>this.previousSelectedObject.material;
            asMeshPongMaterial.color.setHex(this.previousColor);
            this.previousSelectedObject = undefined;
        }

        if (objectToSelect) {
            const asMesh = <THREE.Mesh>objectToSelect;
            if (asMesh.material instanceof THREE.MeshPhongMaterial) {
                const asMeshPongMaterial = <THREE.MeshPhongMaterial>asMesh.material;
                this.previousSelectedObject = asMesh;
                this.previousColor = asMeshPongMaterial.color.getHex();
                asMeshPongMaterial.color.setHex(0x0000ff);
            }
        }
    }

}
