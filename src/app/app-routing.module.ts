import { VagaFormComponent } from './components/vaga-form/vaga-form.component';
import { VagasListaComponent } from './components/vagas-lista/vagas-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: 'vagas' },
  { path: 'vagas', component: VagasListaComponent },
  { path: 'vaga/:id', component: VagaFormComponent },
  { path: 'vaga', component: VagaFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
