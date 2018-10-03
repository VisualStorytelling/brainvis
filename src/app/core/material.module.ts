import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,  MatIconModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule],
  exports: [CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule],
})
export class CustomMaterialModule { }