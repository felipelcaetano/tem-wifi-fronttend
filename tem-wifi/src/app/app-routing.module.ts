import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ListaAvaliacoesComponent } from './lista-avaliacoes/lista-avaliacoes.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard],  data: { animation: 'home' } },
  { path: 'avaliacoes', component: ListaAvaliacoesComponent, data: { animation: 'avaliacoes' } },
  { path: 'login', component: LoginComponent, data: { animation: 'login' }  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
