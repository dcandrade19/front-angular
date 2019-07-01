import { Candidato } from './models/Candidato';
import { EmpresaService } from './services/empresa.service';
import { CandidatoService } from './services/candidato.service';
import { Component } from '@angular/core';
import { Usuario } from './models/Usuario';
import { Empresa } from './models/Empresa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto-vaga';
  candidatoLogado: Candidato;
  empresaLogado: Empresa;
    constructor(
        private candidatoService: CandidatoService,
        private empresaService: EmpresaService
    ) {
        this.candidatoService.candidatoLogado.subscribe(x => this.candidatoLogado = x);
        this.empresaService.empresaLogado.subscribe(x => this.empresaLogado = x);
    }

}
