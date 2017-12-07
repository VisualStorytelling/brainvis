import * as prov from 'phovea_core/src/provenance';

export function setCameraMatrix(ref: prov.IObjectRef<any>, matrices) {
    return prov.action(
        prov.meta(
            'CameraViewChanged=' +
            matrices.newMatrix[0] + ' ' + matrices.newMatrix[1] + ' ' + matrices.newMatrix[2],
            prov.cat.visual, prov.op.update
        ),

        'setCameraMatrix', setCameraMatrixImpl, [ref], matrices
    );
}

export function setCameraMatrixImpl(inputs, parameter, graph, within) {
    const brainvis: any = inputs[0].value;
    const matrices = parameter;
    brainvis.setCameraMatrixImpl(matrices.newMatrix);
    const inverseMatrices = {
        oldMatrix: matrices.newMatrix,
        newMatrix: matrices.oldMatrix
    };

    return {
        inverse: setCameraMatrix(inputs[0], inverseMatrices),
        consumed: within
    };
};

export function createCmd(id) {
    switch (id) {
        case 'setCameraMatrix':
            return setCameraMatrixImpl;
    }
    return null;
};
