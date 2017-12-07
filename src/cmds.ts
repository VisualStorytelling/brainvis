import * as prov from 'phovea_core/src/provenance';

export function setControlOrientation(ref: prov.IObjectRef<any>, orientations) {
    return prov.action(
        prov.meta(
            'OrientationChanged=' +
            prov.cat.visual, prov.op.update
        ),

        'setControlOrientation',setControlOrientationImpl, [ref], orientations
    );
}

export function setControlOrientationImpl(inputs, parameter, graph, within) {
    const brainvis: any = inputs[0].value;
    const orientations = parameter;
    brainvis.setControlOrientationImpl(orientations.new);
    const inverseOrientations = {
        old: orientations.new,
        new: orientations.old
    };

    return {
        inverse: setControlOrientation(inputs[0], inverseOrientations),
        consumed: within
    };
};

export function createCmd(id) {
    switch (id) {
        case 'setControlOrientation':
            return setControlOrientationImpl;
    }
    return null;
};
