/**
 * Created by Samuel Gratzl on 27.08.2015.
 */


import 'file-loader?name=index.html!extract-loader!html-loader!./index.html';
import 'file-loader?name=404.html!./404.html';
import 'file-loader?name=robots.txt!./robots.txt';
import 'phovea_ui/src/_bootstrap';
import './style.scss';
import * as template from 'phovea_clue/src/template';
import * as cmds from './cmds';
import * as databrowser from 'phovea_d3/src/databrowser';
import * as selection from 'phovea_d3/src/selectioninfo';
import * as cmode from 'phovea_clue/src/mode';
import * as $ from 'jquery';
import * as THREE from 'three';
import * as AMI from 'ami.js';
import * as prov from 'phovea_core/src/provenance';
import * as C from 'phovea_core/src/index';

const elems = template.create(document.body, {
  app: 'CLUE',
  application: '/clue_dummy',
  id: 'clue_dummy'
});

{
  const container = $('div.content');
  // const width = container.innerWidth();
  // const height = container.innerHeight();
  const width = 1400;
  const height = 900;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('white');
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  container.append(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  this.camera = camera;

  // Setup controls
  const controls = new AMI.TrackballControl(camera, renderer.domElement);

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  const meta = prov.meta('camera position changed', 'layout');
  this.cameraMoved = (oldmatrix, newmatrix) => {
    const action = prov.action(meta, 'camera position changed', (inputs, parameter, graph, within) => {
      return {
        inverse: () => 1 as any as prov.IAction,
        consumed: within
      };
    }, [], { oldmatrix, newmatrix });;
    elems.graph.then((graph) => {
      graph.push(action);
    });
  };

  controls.addEventListener('start', (event) => {
    this.oldmatrix = this.camera.matrix.toArray();
  });

  controls.addEventListener('end', (event) => {
    const newmatrix = this.camera.matrix.toArray();
    this.cameraMoved(this.oldmatrix, newmatrix);
  });

  // --------------------


  elems.$main.classed('clue_demo', true);

  const updateMode = (newMode) => {
    if (newMode.exploration < 0.8) {
      controls.enabled = false;
    } else {
      controls.enabled = true;
    }
  };

  elems.on('modeChanged', (event, newMode) => {
    updateMode(newMode);
  });

  updateMode(cmode.getMode());

  // elems.jumpToStored();
}
