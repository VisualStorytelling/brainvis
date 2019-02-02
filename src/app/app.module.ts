import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ProvenanceService } from './provenance.service';
import { BrainvisCanvasComponent } from './brainvis-canvas/brainvis-canvas.component';
import { BrainvisCanvasControlsComponent } from './brainvis-canvas-controls/brainvis-canvas-controls.component';

import { MatIconModule, MatSidenavModule, MatSlideToggleModule, MatSliderModule, MatButtonModule, MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProvenanceVisualizationComponent } from './provenance-visualization/provenance-visualization.component';
import { ProvenanceSlidesComponent } from './provenance-slides/provenance-slides.component';
import { SlideAnnotationsComponent } from './slide-annotations/slide-annotations.component';

import { Ng5SliderModule } from 'ng5-slider';
import { StyledSliderComponent } from './brainvis-canvas-controls/styled-slider/styled-slider.component';


@NgModule({
  declarations: [
    AppComponent,
    BrainvisCanvasComponent,
    BrainvisCanvasControlsComponent,
    ProvenanceVisualizationComponent,
    ProvenanceSlidesComponent,
    SlideAnnotationsComponent, 
    StyledSliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatIconModule,
    Ng5SliderModule
  ],
  providers: [ProvenanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
