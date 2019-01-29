import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ListaAvaliacoesComponent } from './lista-avaliacoes/lista-avaliacoes.component';
import { MinhasAvaliacoesComponent } from './minhas-avaliacoes/minhas-avaliacoes.component';
import { SobreComponent } from './sobre/sobre.component';
import { NovaAvaliacaoComponent } from './nova-avaliacao/nova-avaliacao.component';

const routes: Routes = [
  { path: '', redirectTo: 'avaliacoes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { animation: 'login' }  },
  { path: 'avaliacoes', component: ListaAvaliacoesComponent, data: { animation: 'avaliacoes' } },
  { path: 'minhas-avaliacoes', component: MinhasAvaliacoesComponent, canActivate: [AuthGuard], data: { animation: 'minhas-avaliacoes' } },
  { path: 'nova-avaliacao', component: NovaAvaliacaoComponent, canActivate: [AuthGuard], data: { animation: 'nova-avaliacao' } },
  { path: 'sobre', component: SobreComponent, data: { animation: 'sobre' }  },
  { path: '**', redirectTo: 'avaliacoes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
