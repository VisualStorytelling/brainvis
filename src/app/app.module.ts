import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ProvenanceService } from './provenance.service';
import { BrainvisCanvasComponent } from './brainvis-canvas/brainvis-canvas.component';
import { BrainvisCanvasControlsComponent } from './brainvis-canvas-controls/brainvis-canvas-controls.component';

import {CustomMaterialModule} from "./core/material.module";
import { FormsModule } from '@angular/forms';
import { ProvenanceVisualizationComponent } from './provenance-visualization/provenance-visualization.component';
import { ProvenanceSlidesComponent } from './provenance-slides/provenance-slides.component';
import { SidenavComponent } from './ui/sidenav/sidenav.component';
import { SlidesContainerComponent } from './ui/slides-container/slides-container.component';




@NgModule({
  declarations: [
    AppComponent,
    BrainvisCanvasComponent,
    BrainvisCanvasControlsComponent,
    ProvenanceVisualizationComponent,
    ProvenanceSlidesComponent,
    SidenavComponent,
    SlidesContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  entryComponents: [SlidesContainerComponent],
  providers: [ProvenanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
