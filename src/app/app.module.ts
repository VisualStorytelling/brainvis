import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ProvenanceService } from './provenance.service';
import { BrainvisCanvasComponent } from './brainvis-canvas/brainvis-canvas.component';
import { BrainvisCanvasControlsComponent } from './brainvis-canvas-controls/brainvis-canvas-controls.component';

import { MatIconModule, MatSidenavModule, MatSlideToggleModule, MatButtonModule, MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProvenanceVisualizationComponent } from './provenance-visualization/provenance-visualization.component';
import { ProvenanceSlidesComponent } from './provenance-slides/provenance-slides.component';
import { SlideAnnotationsComponent } from './slide-annotations/slide-annotations.component';


@NgModule({
  declarations: [
    AppComponent,
    BrainvisCanvasComponent,
    BrainvisCanvasControlsComponent,
    ProvenanceVisualizationComponent,
    ProvenanceSlidesComponent,
    SlideAnnotationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [ProvenanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
