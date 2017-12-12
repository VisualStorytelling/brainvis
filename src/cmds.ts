import * as prov from 'phovea_core/src/provenance';

// Camera orientation
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
    brainvis.setControlOrientationImpl(orientations.new, within);
    const inverseOrientations = {
        old: orientations.new,
        new: orientations.old
    };

    return {
        inverse: setControlOrientation(inputs[0], inverseOrientations),
        consumed: within
    };
};

// Slice orientation
export function setSlicePosition(ref: prov.IObjectRef<any>, positions) {
    return prov.action(
        prov.meta(
            'SliceChanged=' +
            prov.cat.visual, prov.op.update
        ),

        'setSlicePosition',setSlicePositionImpl, [ref], positions
    );
}

export function setSlicePositionImpl(inputs, parameter, graph, within) {
    const brainvis: any = inputs[0].value;
    const positions = parameter;
    brainvis.setSlicePositionImpl(positions.new, within);
    const inversePositions = {
        old: positions.new,
        new: positions.old
    };

    return {
        inverse: setSlicePosition(inputs[0], inversePositions),
        consumed: within
    };
};

export function createCmd(id) {
    switch (id) {
        case 'setControlOrientation':
            return setControlOrientationImpl;
        case 'setSlicePosition':
            return setSlicePositionImpl;
    }
    return null;
};
