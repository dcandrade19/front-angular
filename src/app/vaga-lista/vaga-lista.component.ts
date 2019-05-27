import { VagaService } from '../services/vaga.service';
import { Vaga } from '../models/Vaga';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vaga-lista',
  templateUrl: './vaga-lista.component.html',
  styleUrls: ['./vaga-lista.component.css']
})
export class VagaListaComponent implements OnInit {

  public vagas: Observable<Vaga[]>;

  constructor(
    private vagaService: VagaService,
  ) {
  }

  ngOnInit() {

    this.vagaService.Refresh.subscribe(() => {
      this.vagas = this.vagaService.listar();

    });
    this.vagas = this.vagaService.listar();
  }

}
