import { Input, Output, EventEmitter } from '@angular/core';
import { BrainvisCanvasComponent } from '../brainvis-canvas.component';

export class Settings {
    private static instance: Settings;
    private canvas: BrainvisCanvasComponent;

    private _colorMap = 'grayscale';
    private _thresholdLowerBound = 0;
    private _thresholdMaxValue = 90;
    private _thresholdMinValue = 10;
    private _thresholdUpperBound = 1426;
    private _measurementMode = false;

    get colorMap() { return Settings.instance._colorMap; }
    get thresholdLowerBound() { return Settings.instance._thresholdLowerBound; }
    get thresholdMaxValue() { return Settings.instance._thresholdMaxValue; }
    get thresholdMinValue() { return Settings.instance._thresholdMinValue; }
    get thresholdUpperBound() { return Settings.instance._thresholdUpperBound; }
    get measurementMode() { return Settings.instance._measurementMode; }

    private constructor() { }

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

    @Input() set measurementMode(measurementMode: boolean) {
        Settings.instance._measurementMode = measurementMode;
        Settings.instance.measurementModeChange.emit(measurementMode);
    }
    @Output() measurementModeChange = new EventEmitter<boolean>();

    static getInstance(canvas) {
        if (!Settings.instance) {
            Settings.instance = new Settings();

            Settings.instance.canvas = canvas;
        }

        return Settings.instance;
    }

}
