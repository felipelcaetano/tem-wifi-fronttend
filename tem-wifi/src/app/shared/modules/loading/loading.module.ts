import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { CustomMaterialModule } from '../custom-material-module/custom-material.module';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class LoadingModule { }
