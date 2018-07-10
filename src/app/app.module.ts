import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ProvenanceService } from './provenance.service';
import { BrainvisCanvasComponent } from './brainvis-canvas/brainvis-canvas.component';
import { BrainvisCanvasControlsComponent } from './brainvis-canvas-controls/brainvis-canvas-controls.component';

import {MatSlideToggleModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    BrainvisCanvasComponent,
    BrainvisCanvasControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  providers: [ProvenanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
