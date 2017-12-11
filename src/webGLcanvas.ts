import * as THREE from 'three';
import * as AMI from 'ami.js';
import { Orientation } from './types';
import Trackball from './trackball';
import SliceManipulatorWidget from './sliceManipulatorWidget';


export default class BrainvisCanvas extends THREE.EventDispatcher {
    private width: number;
    private height: number;
    private elem: Element;
    private scene = new THREE.Scene();
    private camera: THREE.PerspectiveCamera;
    private renderer = new THREE.WebGLRenderer();
    private controls: Trackball;
    private stackHelper: AMI.StackHelper;
    private sliceManipulator: SliceManipulatorWidget;

    constructor(elem, width, height) {
        super();
        this.width = width;
        this.height = height;
        this.elem = elem;

        this.scene.background = new THREE.Color('black');
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);

        this.renderer.setSize(width, height);
        this.elem.appendChild(this.renderer.domElement);

        // Setup controls
        this.controls = new Trackball(this.camera, this.elem);

        //Initial camera position
        this.controls.position0.set(0, 0, 5);
        this.controls.reset();

        this.initScene();
        this.addEventListeners();
        this.animate();
    }

    initScene() {

        // Setup loader
        var loader = new AMI.VolumeLoader(this.renderer.domElement);

        var t1 = [
            '36747136',
            '36747150',
            '36747164',
            '36747178',
            '36747192',
            '36747206',
            '36747220',
            '36747234',
            '36747248',
            '36747262',
            '36747276',
            '36747290',
            '36747304',
            '36747318',
            '36747332',
            '36747346',
            '36747360',
            '36747374',
            '36747388',
            '36747402',
            '36747416',
            '36747430',
            '36747444',
            '36747458',
            '36747472',
            '36747486',
            '36747500',
            '36747514',
            '36747528',
            '36747542',
            '36747556',
            '36747570',
            '36747584',
            '36747598',
            '36747612',
            '36747626',
            '36747640',
            '36747654',
            '36747668',
            '36747682',
            '36747696',
            '36747710',
            '36747724',
            '36747738',
            '36747752',
            '36747766',
            '36747780',
            '36747794',
            '36747808',
            '36747822',
            '36747836',
            '36747850',
            '36747864',
            '36747878',
            '36747892',
            '36747906',
            '36747920',
            '36747934',
            '36747948',
            '36747962',
            '36747976',
            '36747990',
            '36748004',
            '36748018',
            '36748032',
            '36748046',
            '36748060',
            '36748074',
            '36748088',
            '36748102',
            '36748116',
            '36748130',
            '36748144',
            '36748158',
            '36748172',
            '36748186',
            '36748578',
            '36748592',
            '36748606',
            '36748620',
            '36748634',
            '36748648',
            '36748662',
            '36748676',
            '36748690',
            '36748704',
            '36748718',
            '36748732',
            '36748746',
            '36748760',
            '36748774',
            '36748788',
            '36748802',
            '36748816',
            '36748830',
            '36748844',
            '36748858',
            '36748872',
            '36748886',
            '36748900',
            '36748914',
            '36748928',
            '36748942',
            '36748956',
            '36748970',
            '36748984',
            '36748998',
            '36749012',
            '36749026',
            '36749040',
            '36749054',
            '36749068',
            '36749082',
            '36749096',
            '36749110',
            '36749124',
            '36749138',
            '36749152',
            '36749166',
            '36749180',
            '36749194',
            '36749208',
            '36749222',
            '36749236',
            '36749250',
            '36749264',
            '36749278',
            '36749292',
            '36749306',
            '36749320',
            '36749334',
            '36749348',
            '36749362',
            '36749376',
            '36749390',
            '36749404',
            '36749418',
            '36749446',
            '36749460',
            '36749474',
            '36749488',
            '36749502',
            '36749516',
            '36749530',
            '36749544',
            '36749558',
            '36749572',
            '36749586',
            '36749600',
            '36749614',
            '36749628',
            '36749642',
            '36749656',
            '36749670',
            '36749684',
            '36749698',
            '36749712',
            '36749726',
            '36749740',
            '36749754',
            '36749768',
            '36749782',
            '36749796',
            '36749810',
            '36749824',
            '36749838',
            '36749852',
            '36749866',
            '36749880',
            '36749894',
            '36749908',
            '36749922',
            '36749936',
            '36749950',
            '36749964'
        ];

        var files = t1.map(function(v) {
            return 'https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/' + v;
        });

        let this_ = this;

        loader
        .load(files)
        .then(function() {
            // merge files into clean series/stack/frame structure
            var series = loader.data[0].mergeSeries(loader.data);
            loader.free();
            loader = null;
    
            // be carefull that series and target stack exist!
            this_.stackHelper = new AMI.StackHelper(series[0].stack[0]);
            this_.stackHelper.border.color = 0xffeb3b;
            this_.scene.add(this_.stackHelper);
   
            // setup slice
            var centerLPS = this_.stackHelper.stack.worldCenter();
            this_.stackHelper.slice.aabbSpace = 'LPS';
            this_.stackHelper.slice.planePosition.x = centerLPS.x;
            this_.stackHelper.slice.planePosition.y = centerLPS.y;
            this_.stackHelper.slice.planePosition.z = centerLPS.z;
            this_.stackHelper.slice.planeDirection = new THREE.Vector3(1,0,0).normalize();
            this_.stackHelper.border.helpersSlice = this_.stackHelper.slice;
    
            // slice manipulator
            //this_.sliceManipulator = new SliceManipulatorWidget(this_.stackHelper,this_.elem,this_.camera);
            //this_.scene.add(this_.sliceManipulator);
            //this_.sliceManipulator.visible = false;
            //this_.sliceManipulator.addEventListener('change',this_.onPlaneChange);
    
            // initialize controls last so it's event handelers will fire last
            //this_.controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
        })
        .catch(function(error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
    }

    addEventListeners() {
        this.controls.addEventListener('start', (event) => {
            const position = this.controls.camera.position.toArray();
            const target = this.controls.target.toArray();
            const up = this.controls.camera.up.toArray();
            const orientation = { position, target, up };

            this.dispatchEvent({
                type: 'cameraStart',
                orientation
            });
        });

        this.controls.addEventListener('end', (event) => {
            const position = this.controls.camera.position.toArray();
            const target = this.controls.target.toArray();
            const up = this.controls.camera.up.toArray();
            const orientation = { position, target, up };

            this.dispatchEvent({
                type: 'cameraEnd',
                orientation
            });
        });
    }

    setSize(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    setInteractive(interactive: boolean) {
        this.controls.enabled = interactive;
    }

    setControlOrientation(newOrientation: Orientation) {
        this.controls.changeCamera(new THREE.Vector3(newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]),
            new THREE.Vector3(newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]),
            new THREE.Vector3(newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]),
            true);
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.controls.update();

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    };

    onPlaneChange(event){
        console.log('plane position: ' + event.position.x + " " + event.position.y + " " + event.position.z);
        console.log('plane direction: ' + event.direction.x + " " + event.direction.y + " " + event.direction.z);
    }
}
