import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt';
import { httpInterceptorProviders } from './interceptors';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { registerLocaleData } from '@angular/common';
import { CustomMaterialModule } from './shared/modules/custom-material-module/custom-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ListaAvaliacoesModule } from './lista-avaliacoes/lista-avaliacoes.module';
import { LoginModule } from './login/login.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { MinhasAvaliacoesModule } from './minhas-avaliacoes/minhas-avaliacoes.module';
import { SobreModule } from './sobre/sobre.module';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDdAo0u0fjp65YlbvEwPHuWuqdOizErAys",
      libraries: ["places"]
    }),
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule,
    ReactiveFormsModule, FormsModule,
    FlexLayoutModule,
    ListaAvaliacoesModule,
    LoginModule,
    MinhasAvaliacoesModule,
    SobreModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LOCALE_ID, 
      useValue: 'pt'
    },
    AuthGuardService,
    AuthService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
