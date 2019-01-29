import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaAvaliacaoComponent } from './nova-avaliacao.component';
import { CustomMaterialModule } from '../shared/modules/custom-material-module/custom-material.module';
import { GooglePlacesDirective } from '../directives/google-places.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxViacepModule } from '@brunoc/ngx-viacep';

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
    NgxViacepModule
  ],
  exports: [NovaAvaliacaoComponent]
})
export class NovaAvaliacaoModule { }
