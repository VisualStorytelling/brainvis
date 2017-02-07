/**
 * Created by Samuel Gratzl on 27.08.2015.
 */

import * as C from 'phovea_core/src/index';
import * as prov from 'phovea_core/src/provenance';
import * as d3 from 'd3';

function addElem(inputs, parameter, graph, within) {
  return C.resolveIn(within).then(() => {
    const $main:d3.Selection<any> = inputs[0].value,
      pos = parameter.pos,
      desc_name = parameter.desc_name;


    const $div = $main.append('div').classed('block', true).datum(desc_name).style({
      left: pos.x + 'px',
      top: pos.y + 'px',
      opacity: within > 0 ? 0 : 1
    }).attr('data-anchor', desc_name);
    const $toolbar = $div.append('div').classed('toolbar', true);
    const $body = $div.append('div').classed('body', true);
    /*vis.list(data)[0].load().then((p) => {
     p.factory(data, $body.node());
     });*/
    $body.text(desc_name);
    const $divRef = prov.ref($div, desc_name, prov.cat.visual);

    $toolbar.append('i').attr('class', 'fa fa-close').on('click', () => {
      graph.push(createRemoveCmd($divRef, inputs[0]));
    });
    if (within > 0) {
      $div.transition().duration(within).style('opacity', 1);
    }
    return {
      created: [$divRef],
      inverse: createRemoveCmd($divRef, inputs[0]),
      consumed: within
    };
  });
}
function removeElem(inputs, parameter, graph, within) {
  return C.resolveIn(within).then(() => {
    const $div:d3.Selection<any> = inputs[0].value,
      inv = createAddCmd(inputs[1], $div.datum(), {
        x: parseInt($div.style('left'), 10),
        y: parseInt($div.style('top'), 10)
      });

    if (within > 0) {
      $div.transition().duration(within).style('opacity', 0).remove();
    } else {
      $div.remove();
    }

    return {
      removed: [inputs[0]],
      inverse: inv,
      consumed: within
    };
  });
}

declare type ID3Ref = prov.IObjectRef<d3.Selection<any>>;

export function createAddCmd($mainRef:ID3Ref, descName: string, pos:{x: number; y:number}) {
  return prov.action(prov.meta(descName, prov.cat.data, prov.op.create), 'addClueElem', addElem, [$mainRef], {
    pos,
    desc_name: descName
  });
}
export function createRemoveCmd($divRef:ID3Ref, $mainRef:ID3Ref) {
  return prov.action(prov.meta($divRef.name, prov.cat.data, prov.op.remove), 'removeClueElem', removeElem, [$divRef, $mainRef]);
}

export function createCmd(id) {
  switch (id) {
    case 'addClueElem' :
      return addElem;
    case 'removeClueElem':
      return removeElem;
  }
  return null;
}
