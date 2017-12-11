/**
 * Original author: Pjotr Svetachov
 */

import * as AMI from 'ami.js';
import * as THREE from 'three';

 export default class SliceManipulatorWidget extends THREE.Object3D {
    private camera: THREE.Camera;
    private domElement: Element;
    private stackHelper: AMI.StackHelper;
    private plane = new THREE.Plane();
    private raycaster =  new THREE.Raycaster();
    private startIntersection = new THREE.Vector3();
    private isDragging: boolean = false;

    private geometryLine: THREE.Geometry;
    private line: THREE.Line;
    private originalSlicePosition: THREE.Vector3;
    private sphere: THREE.Mesh;
    private previousSelection;

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
        let endPosition = stackHelper.slice.planeDirection.clone();
        endPosition.multiplyScalar(80.0);
        endPosition.add(stackHelper.slice.planePosition);
        let middlePosition = stackHelper.slice.planeDirection.clone();
        middlePosition.multiplyScalar(40.0);
        middlePosition.add(stackHelper.slice.planePosition);

        // line

        var geometryCylinder = new THREE.CylinderGeometry( 1, 1, 80, 8 );
        var material = new THREE.MeshBasicMaterial( {color: 0xff00ff} );
        var cylinder = new THREE.Mesh( geometryCylinder, material );
        cylinder.position.set(middlePosition.x,middlePosition.y,middlePosition.z);
        cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),stackHelper.slice.planeDirection);
        //this.add( cylinder );

        let materialLine = new THREE.LineBasicMaterial();
        this.geometryLine = new THREE.Geometry();
        this.geometryLine.vertices.push(stackHelper.slice.planePosition.clone());
        this.geometryLine.vertices.push(endPosition);
        this.geometryLine.verticesNeedUpdate = true;
        this.line = new THREE.Line(this.geometryLine, materialLine);
        this.add(this.line );

        // sphre
        var geometrySphere = new THREE.SphereGeometry( 5, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        this.sphere = new THREE.Mesh( geometrySphere, material );
        this.sphere.position.copy(endPosition);
        this.add( this.sphere );

        // add event listeners
        domElement.addEventListener("mousemove",(event) => {
            this.onMouseMove(event);
        },false);
        domElement.addEventListener("mousedown",(event) => {
            this.onMouseDown(event);
        },false);
        domElement.addEventListener("mouseup",(event) => {
            this.onMouseUp(event);
        },false);
    }

    onMouseMove(event){
        if(!this.visible){
            return;
        }
        if(!this.isDragging){
            var intersection = this.intersectObjects(event,this.children);
            if(intersection === false){
                this.clearSelection();
                return;
            }
            this.highLightObject(intersection.object,0xff0000);

            // move intersection plane to intersection location
            this.plane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(this.plane.normal),intersection.object.position);
        } else {
            this.setUpRaycaster(event);
            var intersectionPoint = new THREE.Vector3();
            this.raycaster.ray.intersectPlane(this.plane,intersectionPoint);
            var intersectionDirection = new THREE.Vector3();
            intersectionDirection.copy(intersectionPoint).sub(this.startIntersection);
            var distance = intersectionDirection.dot(this.stackHelper.slice.planeDirection);
            event.stopImmediatePropagation();
            // move the slice
            if(this.previousSelection === this.line){
                var offset = this.stackHelper.slice.planeDirection.clone();
                offset.multiplyScalar(distance);
                offset.add(this.originalSlicePosition);
                // push the start of the ray a little back this helps with cases where ray
                // starts at the edge of the volume and does not intersect it at all
                var beginOffset = this.originalSlicePosition.clone();
                beginOffset.sub(offset);
                var interSetionPoint = this.intersectStackHelper(beginOffset,offset);
                this.stackHelper.slice.planePosition.copy( interSetionPoint);
            } else if(this.previousSelection == this.sphere) {
                var direction = intersectionPoint.clone();
                direction.sub(this.stackHelper.slice.planePosition);
                this.stackHelper.slice.planeDirection.copy(direction);
                this.stackHelper.slice.planeDirection.normalize();
            }
            this.stackHelper.slice._update();
            this.stackHelper.border.helpersSlice = this.stackHelper.slice;
            // update line
            this.geometryLine.vertices[0] = this.stackHelper.slice.planePosition.clone();
            
            let endPosition = this.stackHelper.slice.planeDirection.clone();
            endPosition.multiplyScalar(80.0);
            endPosition.add(this.stackHelper.slice.planePosition);
            this.geometryLine.vertices[1] = endPosition;
            this.geometryLine.verticesNeedUpdate = true;
            this.geometryLine.computeBoundingBox();
            this.geometryLine.computeBoundingSphere();

            // update sphere
            this.sphere.position.copy(endPosition);
        }
    }

    // highlight a object and returns previous highlighted object to original color
    highLightObject(newObject, newColor){
        // store object previous color if we haven't done so
        if(!newObject.previousColor){
            newObject.previousColor = newObject.material.color.clone();
        }
        newObject.material.color.set(newColor);
        if(this.previousSelection !== newObject){
            if(this.previousSelection){
                this.previousSelection.material.color = this.previousSelection.previousColor.clone();
            }
            this.previousSelection = newObject;
        }
    }

    clearSelection(){
        if(this.previousSelection){
            this.previousSelection.material.color = this.previousSelection.previousColor.clone();
        }
        this.previousSelection = null;
    }

    onMouseDown(event){
        if(!this.visible){
            return;
        }
        if(this.previousSelection){
            event.stopImmediatePropagation();
            this.previousSelection.material.color.set(0x00ff00);
            this.isDragging = true;
            this.setUpRaycaster(event);
            this.originalSlicePosition = this.stackHelper.slice.planePosition.clone();
            this.raycaster.ray.intersectPlane(this.plane,this.startIntersection);
        }
    }

    onMouseUp(Event){
        if(!this.visible){
            return;
        }
        if(this.previousSelection){
            event.stopImmediatePropagation();
            this.previousSelection.material.color.set(0xff0000);
            this.isDragging = false;
            this.dispatchEvent( {type: 'change', position: this.stackHelper.slice.planePosition.clone(), direction: this.stackHelper.slice.planeDirection.clone()})
        }
    }

    setUpRaycaster(pointer){
        var rect = this.domElement.getBoundingClientRect();
        var x = ( pointer.clientX - rect.left ) / rect.width;
        var y = ( pointer.clientY - rect.top ) / rect.height;

        var pointerVector = new THREE.Vector2( ( x * 2 ) - 1, - ( y * 2 ) + 1 );
        this.raycaster.setFromCamera( pointerVector, this.camera );
    }

    intersectObjects( pointer, objects ) {
        this.setUpRaycaster(pointer);

        var intersections = this.raycaster.intersectObjects( objects, true );
        return intersections[ 0 ] ? intersections[ 0 ] : false;
    }
    
    intersectStackHelper(beginpoint, endpoint){
        var direction = endpoint.clone();
        direction.sub(beginpoint);
        var length = direction.length();
        direction.normalize();
        this.raycaster.set(beginpoint,direction);
        // ray cast against bouding box
        var geometry = new THREE.Object3D();
        //var mesh = this.stackHelper.children[0].children[0].clone();
      /*  this.stackHelper.children[0].children[0].material = new THREE.MeshBasicMaterial({
            wireframe: false,
          });*/
        //mesh._material
        //var stack = this.stackHelper.children[0].meshStack;;
        geometry.add(this.stackHelper.children[0]._meshStack.clone());
       /* geometry.children[0].material = new THREE.MeshBasicMaterial({
            wireframe: false,
            side:THREE.BackSide,
          });*/
        var intersections = this.raycaster.intersectObjects( geometry.children, true );
        if(intersections[0] && intersections[0].distance <= length){
            return intersections[0].point;
        } else {
            return endpoint;
        }
    }
 }