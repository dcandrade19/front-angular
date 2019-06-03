import { LoginFormComponent } from './login-form/login-form.component';
import { VagaFormComponent } from './vaga-form/vaga-form.component';
import { VagaListaComponent } from './vaga-lista/vaga-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: 'login' },
  { path: 'login', component: LoginFormComponent },
  { path: 'vagas', component: VagaListaComponent },
  { path: 'vaga/:id', component: VagaFormComponent },
  { path: 'vaga', component: VagaFormComponent },
  { path: 'nova', component: VagaFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
