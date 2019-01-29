import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAvaliacoesComponent } from './lista-avaliacoes.component';
import { CustomMaterialModule } from '../shared/modules/custom-material-module/custom-material.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ListaAvaliacoesComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    AppRoutingModule
  ],
  exports: [
    ListaAvaliacoesComponent
  ]
})
export class ListaAvaliacoesModule { }
