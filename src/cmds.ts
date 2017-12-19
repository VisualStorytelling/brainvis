import * as prov from 'phovea_core/src/provenance';

// Camera zoom
export function setControlZoom(ref: prov.IObjectRef<any>, orientations) {
    return prov.action(
        prov.meta(
            'ZoomChanged=' +
            prov.cat.visual, prov.op.update
        ),

        'setControlZoom',setControlZoomImpl, [ref], orientations
    );
}

export function setControlZoomImpl(inputs, parameter, graph, within) {
    const brainvis: any = inputs[0].value;
    const orientations = parameter;
    brainvis.setControlZoomImpl(orientations.new, within);
    const inverseOrientations = {
        old: orientations.new,
        new: orientations.old
    };

    return {
        inverse: setControlZoom(inputs[0], inverseOrientations),
        consumed: within
    };
};

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

// Slice zoom
export function setSliceZoom(ref: prov.IObjectRef<any>, positions) {
    return prov.action(
        prov.meta(
            'SliceZoomChanged=' +
            prov.cat.visual, prov.op.update
        ),

        'setSliceZoom',setSliceZoomImpl, [ref], positions
    );
}

export function setSliceZoomImpl(inputs, parameter, graph, within) {
    const brainvis: any = inputs[0].value;
    const positions = parameter;
    brainvis.setSliceZoomImpl(positions.new, within);
    const inversePositions = {
        old: positions.new,
        new: positions.old
    };

    return {
        inverse: setSliceZoom(inputs[0], inversePositions),
        consumed: within
    };
};

//slice orientation
export function setSliceOrientation(ref: prov.IObjectRef<any>, positions) {
    return prov.action(
        prov.meta(
            'SliceOrientationChanged=' +
            prov.cat.visual, prov.op.update
        ),

        'setSliceOrientation',setSliceOrientationImpl, [ref], positions
    );
}

export function setSliceOrientationImpl(inputs, parameter, graph, within) {
    const brainvis: any = inputs[0].value;
    const positions = parameter;
    brainvis.setSliceOrientationImpl(positions.new, within);
    const inversePositions = {
        old: positions.new,
        new: positions.old
    };

    return {
        inverse: setSliceOrientation(inputs[0], inversePositions),
        consumed: within
    };
};


//commands
export function createCmd(id) {
    switch (id) {
        case 'setControlOrientation':
            return setControlOrientationImpl;
        case 'setControlZoom':
            return setControlZoomImpl;
        case 'setSliceZoom':
            return setSliceZoomImpl;
        case 'setSliceOrientation':
            return setSliceOrientationImpl;
    }
    return null;
};
