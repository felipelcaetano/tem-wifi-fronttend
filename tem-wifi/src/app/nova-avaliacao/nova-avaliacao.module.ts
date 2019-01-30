import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaAvaliacaoComponent } from './nova-avaliacao.component';
import { CustomMaterialModule } from '../shared/modules/custom-material-module/custom-material.module';
import { GooglePlacesDirective } from '../directives/google-places.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { LoadingModule } from '../shared/modules/loading/loading.module';

@NgModule({
  declarations: [ 
    NovaAvaliacaoComponent, 
    GooglePlacesDirective
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxViacepModule,
    LoadingModule
  ],
  exports: [NovaAvaliacaoComponent]
})
export class NovaAvaliacaoModule { }
