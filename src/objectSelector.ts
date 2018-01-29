import * as THREE from 'three';
import { IIntersectionListener } from 'brainvis/src/intersectionManager';
import { Object3D } from 'three';

export default class ObjectSelector  extends THREE.EventDispatcher implements IIntersectionListener {
    private objects: THREE.Object3D;
    private previosSelectedObject: THREE.Mesh;
    private previousColor: number;

    constructor(objects: THREE.Object3D) {
        super();
        this.objects = objects;
    }

    onMouseDown(intersection: THREE.Intersection, pointer: MouseEvent) {
        if(intersection !== undefined) {
            event.stopImmediatePropagation();
        }
        if(intersection !== undefined && this.previosSelectedObject !== intersection.object && intersection.object instanceof THREE.Mesh) {
            const asMesh = <THREE.Mesh>intersection.object;
            if(asMesh.material instanceof THREE.MeshPhongMaterial) {
                let previousName: string = '';
                if(this.previosSelectedObject ) {
                    const asMeshPongMaterial = <THREE.MeshPhongMaterial>this.previosSelectedObject.material;
                    asMeshPongMaterial.color.setHex(this.previousColor);
                    previousName = this.previosSelectedObject.name;
                }
                const asMeshPongMaterial = <THREE.MeshPhongMaterial>asMesh.material;
                this.previosSelectedObject = asMesh;
                this.previousColor = asMeshPongMaterial.color.getHex();
                asMeshPongMaterial.color.setHex(0x0000ff);
                this.dispatchEvent({
                    type: 'objectSelection',
                    newObjectName: asMesh.name,
                    previousObjectName: previousName
                });
            }
        } else if(this.previosSelectedObject) {
            const asMeshPongMaterial = <THREE.MeshPhongMaterial>this.previosSelectedObject.material;
            asMeshPongMaterial.color.setHex(this.previousColor);
            this.dispatchEvent({
                type: 'objectSelection',
                newObjectName: '',
                previousObjectName: this.previosSelectedObject.name
            });
            this.previosSelectedObject = undefined;
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
        let objectToSelect = undefined;
        for(const object of this.objects.children) {
            if(object.name === newSelection) {
                objectToSelect = object;
                break;
            }
        }
        if(this.previosSelectedObject) {
            const asMeshPongMaterial = <THREE.MeshPhongMaterial>this.previosSelectedObject.material;
            asMeshPongMaterial.color.setHex(this.previousColor);
            this.previosSelectedObject = undefined;
        }
        if(objectToSelect) {
            const asMesh = <THREE.Mesh>objectToSelect;
            if(asMesh.material instanceof THREE.MeshPhongMaterial) {
                const asMeshPongMaterial = <THREE.MeshPhongMaterial>asMesh.material;
                this.previosSelectedObject = asMesh;
                this.previousColor = asMeshPongMaterial.color.getHex();
                asMeshPongMaterial.color.setHex(0x0000ff);
            }
        }
    }

}
