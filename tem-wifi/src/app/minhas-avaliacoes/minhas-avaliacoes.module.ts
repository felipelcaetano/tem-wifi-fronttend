import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhasAvaliacoesComponent } from './minhas-avaliacoes.component';
import { CustomMaterialModule } from '../shared/modules/custom-material-module/custom-material.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';

@NgModule({
  declarations: [
    MinhasAvaliacoesComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    LoadingModule
  ],
  exports: [
    MinhasAvaliacoesComponent
  ]
})
export class MinhasAvaliacoesModule { }
