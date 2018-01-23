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

// slice visibility
export function setSliceVisibility(ref: prov.IObjectRef<any>, visibility) {
    return prov.action(
        prov.meta(
            'SliceVisibilityChanged=' +
            prov.cat.visual, prov.op.update
        ),

        'setSliceVisibility',setSliceVisibilityImpl, [ref], visibility
    );
}

export function setSliceVisibilityImpl(inputs, parameter, graph, within) {
    const brainvis: any = inputs[0].value;
    const visibility = parameter;
    brainvis.setSliceVisibilityImpl(visibility.new, within);
    const inverseVisibilities = {
        old: visibility.new,
        new: visibility.old
    };

    return {
        inverse: setSliceVisibility(inputs[0], inverseVisibilities),
        consumed: within
    };
}

// slice handle visibility
export function setSliceHandleVisibility(ref: prov.IObjectRef<any>, visibility) {
    return prov.action(
        prov.meta(
            'SliceHandleVisibilityChanged=' +
            prov.cat.visual, prov.op.update
        ),

        'setSliceHandleVisibility',setSliceHandleVisibilityImpl, [ref], visibility
    );
}

export function setSliceHandleVisibilityImpl(inputs, parameter, graph, within) {
    const brainvis: any = inputs[0].value;
    const visibility = parameter;
    brainvis.setSliceHandleVisibilityImpl(visibility.new, within);
    const inverseVisibilities = {
        old: visibility.new,
        new: visibility.old
    };

    return {
        inverse: setSliceHandleVisibility(inputs[0], inverseVisibilities),
        consumed: within
    };
}

// 2D slice switching
export function setSliceMode(ref: prov.IObjectRef<any>, mode) {
    return prov.action(
        prov.meta(
            'SliceModeChanged=' +
            prov.cat.visual, prov.op.update
        ),

        'setSliceMode',setSliceModeImpl, [ref], mode
    );
}

export function setSliceModeImpl(inputs, parameter, graph, within) {
    const brainvis: any = inputs[0].value;
    const mode = parameter;
    brainvis.setSliceModeImpl(mode.new, within);
    const inverseModes = {
        old: mode.new,
        new: mode.old
    };

    return {
        inverse: setSliceMode(inputs[0], inverseModes),
        consumed: within
    };
}

// objects visibility
export function setObjectsVisibility(ref: prov.IObjectRef<any>, visibility) {
    return prov.action(
        prov.meta(
            'ObjectsVisibilityChanged=' +
            prov.cat.visual, prov.op.update
        ),

        'setObjectsVisibility',setObjectsVisibilityImpl, [ref], visibility
    );
}

export function setObjectsVisibilityImpl(inputs, parameter, graph, within) {
    const brainvis: any = inputs[0].value;
    const visibility = parameter;
    brainvis.setObjectsVisibilityImpl(visibility.new, within);
    const inverseVisibilities = {
        old: visibility.new,
        new: visibility.old
    };

    return {
        inverse: setObjectsVisibility(inputs[0], inverseVisibilities),
        consumed: within
    };
}

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
        case 'setSliceVisibility':
            return setSliceVisibilityImpl;
        case 'setSliceHandleVisibility':
            return setSliceHandleVisibilityImpl;
        case 'setSliceMode':
            return setSliceModeImpl;
        case 'setObjectsVisibility':
            return setObjectsVisibilityImpl;
    }
    return null;
};
