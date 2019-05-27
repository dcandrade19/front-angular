import { VagaFormComponent } from './vaga-form/vaga-form.component';
import { VagaListaComponent } from './vaga-lista/vaga-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TesteFormComponent } from './components/teste-form/teste-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: 'vagas' },
  { path: 'vagas', component: VagaListaComponent },
  { path: 'vaga/:id', component: VagaFormComponent },
  { path: 'vaga', component: VagaFormComponent },
  { path: 'teste', component: TesteFormComponent },
  { path: 'nova', component: VagaFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
