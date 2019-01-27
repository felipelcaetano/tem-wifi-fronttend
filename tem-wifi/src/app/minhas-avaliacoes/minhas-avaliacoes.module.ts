import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhasAvaliacoesComponent } from './minhas-avaliacoes.component';
import { CustomMaterialModule } from '../shared/modules/custom-material-module/custom-material.module';

@NgModule({
  declarations: [
    MinhasAvaliacoesComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  exports: [
    MinhasAvaliacoesComponent
  ]
})
export class MinhasAvaliacoesModule { }
