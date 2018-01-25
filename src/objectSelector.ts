import * as THREE from 'three';
import { IIntersectionListener } from 'brainvis/src/intersectionManager';
import { Object3D } from 'three';

export default class ObjectSelector implements IIntersectionListener {
    private objects: THREE.Object3D;
    private previosSelectedObject: THREE.Mesh;
    private previousColor: number;

    constructor(objects: THREE.Object3D) {
        this.objects = objects;
    }

    onMouseDown(intersection: THREE.Intersection, pointer: MouseEvent) {
        if(intersection !== undefined && this.previosSelectedObject !== intersection.object && intersection.object instanceof THREE.Mesh) {
            const asMesh = <THREE.Mesh>intersection.object;
            if(asMesh.material instanceof THREE.MeshPhongMaterial) {
                if(this.previosSelectedObject ) {
                    const asMeshPongMaterial = <THREE.MeshPhongMaterial>this.previosSelectedObject.material;
                    asMeshPongMaterial.color.setHex(this.previousColor);
                }
                const asMeshPongMaterial = <THREE.MeshPhongMaterial>asMesh.material;
                this.previosSelectedObject = asMesh;
                this.previousColor = asMeshPongMaterial.color.getHex();
                asMeshPongMaterial.color.setHex(0x0000ff);
            }
        } else if(this.previosSelectedObject) {
            const asMeshPongMaterial = <THREE.MeshPhongMaterial>this.previosSelectedObject.material;
            asMeshPongMaterial.color.setHex(this.previousColor);
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

}
