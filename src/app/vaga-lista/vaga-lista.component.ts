import { VagaService } from '../services/vaga.service';
import { Vaga } from '../models/Vaga';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../models/Empresa';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-vaga-lista',
  templateUrl: './vaga-lista.component.html',
  styleUrls: ['./vaga-lista.component.css']
})
export class VagaListaComponent implements OnInit {

  public vagas: Observable<Vaga[]>;
  empresaLogado: Empresa;
  constructor(
    private vagaService: VagaService,
    private empresaService: EmpresaService
  ) {
    this.empresaService.empresaLogado.subscribe(x => this.empresaLogado = x);
  }

  ngOnInit() {
    if (this.empresaLogado) {
      this.empresaService.Refresh.subscribe(() => {
        this.empresaService.buscar(this.empresaLogado.idUsuario).subscribe(data => {
          this.vagas = this.vagaService.listarPorEmpresa(data.idUsuario);
        });
      });
      this.empresaService.buscar(this.empresaLogado.idUsuario).subscribe(data => {
        this.vagas = this.vagaService.listarPorEmpresa(data.idUsuario);
      });
    } else {
      this.vagaService.Refresh.subscribe(() => {
        this.vagas = this.vagaService.listar();

      });
      this.vagas = this.vagaService.listar();
    }

  }

}
