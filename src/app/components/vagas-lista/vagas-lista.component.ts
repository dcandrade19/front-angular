import { VagaService } from './../../services/vaga.service';
import { Vaga } from '../../models/Vaga';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vagas-lista',
  templateUrl: './vagas-lista.component.html',
  styleUrls: ['./vagas-lista.component.css']
})
export class VagasListaComponent implements OnInit {

  public vagas: Observable<Vaga[]>;

  constructor(
    private vagaService: VagaService
  ) {
  }

  ngOnInit() {
    this.vagas = this.vagaService.listar();
  }

  deletarVaga(id: number | string): void {
    this.vagaService.deletar(id).subscribe(data => {
      if (data.id > 0) {
        this.vagas = this.vagaService.listar();
      }
    }
    );
  }

}
