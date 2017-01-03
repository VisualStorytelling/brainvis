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

const elems = template.create(document.body, {
  app: 'CLUE',
  application: '/clue_dummy',
  id: 'clue_dummy'
});

{
  $(`<aside class="left" style="width: 12vw">
    <section id="selectioninfo">
      <div><h2>Selection Info</h2></div>
    </section>
    <section id="databrowser">
      <div><h2>Data Browser</h2></div>
    </section>
    </aside>`).prependTo('div.content');

  selection.create(document.querySelector('#selectioninfo'), {
    useNames: true,
    filter: (idtype) => {
      return idtype && idtype.name[0] !== '_';
    }
  });

  databrowser.create(document.querySelector('#databrowser'));

  elems.$main.classed('clue_demo',true);
  const $left = $('aside.left');

  var updateMode = (new_) => {
    if (new_.exploration < 0.8) {
      $left.hide(); //({width: 'hide'});
    } else {
      $left.show(); //({width: 'show'});
    }
  };

  elems.on('modeChanged', (event, new_) => {
    updateMode(new_);
  });
  updateMode(cmode.getMode());

  databrowser.makeDropable(<Element>elems.$main.node(), (data, op, pos) => {
    elems.graph.then((graph) => {
      graph.push(cmds.createAddCmd(elems.$main_ref, data.desc.name, pos));
    });
  });
  elems.jumpToStored();
}
