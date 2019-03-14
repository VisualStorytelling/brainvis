import { Input, Output, EventEmitter } from '@angular/core';
import { BrainvisCanvasComponent } from '../brainvis-canvas.component';

export class Settings {
    private static instance: Settings;
    private canvas: BrainvisCanvasComponent;

    private _alignMode = false;
    private _colorMap = 'grayscale';
    private _editMode = false;
    private _editModeDisabled = true;
    private _quadView = false;
    private _quadViewDisabled = false;
    private _segmentationIsDeleting = false;
    private _segmentationSize = 3;
    private _showObjects = true;
    private _showObjectsDisabled = false;
    private _showSlice = true;
    private _showSliceDisabled = false;
    private _showSliceHandle = true;
    private _showSliceHandleDisabled = false;
    private _sliceMouseDown = false;
    private _thresholdLowerBound = 0;
    private _thresholdMaxValue = 90;
    private _thresholdMinValue = 10;
    private _thresholdUpperBound = 1426;

    get alignMode() { return Settings.instance._alignMode; }
    get colorMap() { return Settings.instance._colorMap; }
    get editMode() { return Settings.instance._editMode; }
    get editModeDisabled() { return Settings.instance._editModeDisabled; }
    get quadView() { return Settings.instance._quadView; }
    get quadViewDisabled() { return Settings.instance._quadViewDisabled; }
    get segmentationIsDeleting() { return Settings.instance._segmentationIsDeleting; }
    get segmentationSize() { return Settings.instance._segmentationSize; }
    get showObjects() { return Settings.instance._showObjects; }
    get showObjectsDisabled() { return Settings.instance._showObjectsDisabled; }
    get showSlice() { return Settings.instance._showSlice; }
    get showSliceDisabled() { return Settings.instance._showSliceDisabled; }
    get showSliceHandle() { return Settings.instance._showSliceHandle; }
    get showSliceHandleDisabled() { return Settings.instance._showSliceHandleDisabled; }
    get sliceMouseDown() { return Settings.instance._sliceMouseDown; }
    get thresholdLowerBound() { return Settings.instance._thresholdLowerBound; }
    get thresholdMaxValue() { return Settings.instance._thresholdMaxValue; }
    get thresholdMinValue() { return Settings.instance._thresholdMinValue; }
    get thresholdUpperBound() { return Settings.instance._thresholdUpperBound; }

    private constructor() { }

    @Input() set showSlice(showSlice: boolean) {
        Settings.instance._showSlice = showSlice;
        Settings.instance.showSliceChange.emit(showSlice);
    }
    @Output() showSliceChange = new EventEmitter<boolean>();

    @Input() set showSliceDisabled(showSliceDisabled: boolean) {
        Settings.instance._showSliceDisabled = showSliceDisabled;
    }

    @Input() set showSliceHandle(showSliceHandle: boolean) {
        Settings.instance._showSliceHandle = showSliceHandle;
        Settings.instance.showSliceHandleChange.emit(showSliceHandle);
    }
    @Output() showSliceHandleChange = new EventEmitter<boolean>();

    @Input() set showSliceHandleDisabled(showSliceHandleDisabled: boolean) {
        Settings.instance._showSliceHandleDisabled = showSliceHandleDisabled;
    }

    @Input() set showObjects(showObjects: boolean) {
        Settings.instance._showObjects = showObjects;
        Settings.instance.showObjectsChange.emit(showObjects);
    }
    @Output() showObjectsChange = new EventEmitter<boolean>();

    @Input() set showObjectsDisabled(showObjectsDisabled: boolean) {
        Settings.instance._showObjectsDisabled = showObjectsDisabled;
    }

    @Input() set editMode(editMode: boolean) {
        Settings.instance._editMode = editMode;
        Settings.instance.editModeChange.emit(editMode);
    }
    @Output() editModeChange = new EventEmitter<boolean>();

    @Input() set editModeDisabled(editModeDisabled: boolean) {
        Settings.instance._editModeDisabled = editModeDisabled;
    }

    @Input() set quadView(quadView: boolean) {
        Settings.instance._quadView = quadView;
        Settings.instance.quadViewChange.emit(quadView);
    }
    @Output() quadViewChange = new EventEmitter<boolean>();

    @Input() set quadViewDisabled(quadViewDisabled: boolean) {
        Settings.instance._quadViewDisabled = quadViewDisabled;
    }

    @Input() set alignMode(alignMode: boolean) {
        Settings.instance._alignMode = alignMode;
        Settings.instance.canvas.toggleAlignMode(alignMode);
        Settings.instance.alignModeChange.emit(alignMode);
    }
    @Output() alignModeChange = new EventEmitter<boolean>();

    @Input() set selectedObjects(newSelectedObjects: THREE.Object3D[]) {
        const oldSelectedObjects = Settings.instance.canvas.objectSelector.getObjects();
        Settings.instance.canvas.objectSelector.setSelection(newSelectedObjects);
        Settings.instance.selectedObjectsChange.emit([newSelectedObjects, oldSelectedObjects]);
    }
    @Output() selectedObjectsChange = new EventEmitter<[THREE.Object3D[], THREE.Object3D[]]>();

    @Input() set segmentationSize(value: number) {
        Settings.instance._segmentationSize = value;
        Settings.instance.segmentationSizeChange.emit(value);
    }
    @Output() segmentationSizeChange = new EventEmitter<number>();

    set thresholdLowerBound(value: number) {
        Settings.instance._thresholdLowerBound = value;
    }

    set thresholdUpperBound(value: number) {
        Settings.instance._thresholdUpperBound = value;
    }

    @Input() set thresholdMinValue(value: number) {
        Settings.instance._thresholdMinValue = value;
        if (Settings.instance.canvas.initialized && Settings.instance.canvas.perspectiveRenderer.stackHelper) {
            Settings.instance.canvas.perspectiveRenderer.stackHelper.slice.lowerThreshold = Settings.instance._thresholdMinValue;
            Settings.instance.canvas.perspectiveRenderer.stackHelper.slice.intensityAuto = false;
        }
        Settings.instance.thresholdMinValueChange.emit(value);
    }
    @Output() thresholdMinValueChange = new EventEmitter<number>();

    @Input() set thresholdMaxValue(value: number) {
        Settings.instance._thresholdMaxValue = value;
        if (Settings.instance.canvas.initialized && Settings.instance.canvas.perspectiveRenderer.stackHelper) {
            Settings.instance.canvas.perspectiveRenderer.stackHelper.slice.upperThreshold = Settings.instance._thresholdMaxValue;
            Settings.instance.canvas.perspectiveRenderer.stackHelper.slice.intensityAuto = false;
            // Settings.instance.stackHelper.slice.thicknessMethod = 1;
            // Settings.instance.stackHelper.slice.thickness = 2;
            // Settings.instance.stackHelper.slice.steps = 2;
        }
        Settings.instance.thresholdMaxValueChange.emit(value);
    }
    @Output() thresholdMaxValueChange = new EventEmitter<number>();

    @Input() set colorMap(value: string) {
        Settings.instance._colorMap = value;
        if (Settings.instance.canvas.initialized && Settings.instance.canvas.perspectiveRenderer.stackHelper) {
            Settings.instance.canvas.perspectiveRenderer.stackHelper.slice.colorMap = Settings.instance._colorMap;
        }
        Settings.instance.colorMapValueChange.emit(value);
    }
    @Output() colorMapValueChange = new EventEmitter<string>();

    set sliceMouseDown(value: boolean) {
        Settings.instance._sliceMouseDown = value;
    }

    set segmentationIsDeleting(value: boolean) {
        Settings.instance._segmentationIsDeleting = value;
    }

    static getInstance(canvas) {
        if (!Settings.instance) {
            Settings.instance = new Settings();

            Settings.instance.canvas = canvas;
        }

        return Settings.instance;
    }

}