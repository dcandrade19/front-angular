import { AlertasService } from './../services/alertas.service';
import { VagaService } from './../services/vaga.service';
import { Component, OnInit, Input } from '@angular/core';
import { Vaga } from '../models/Vaga';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaga-card',
  templateUrl: './vaga-card.component.html',
  styleUrls: ['./vaga-card.component.css']
})
export class VagaCardComponent implements OnInit {
  @Input() vaga: Vaga;

  constructor(
    private vagaService: VagaService,
    private router: Router,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
  }

  deletarVaga(id: number | string): void {
    this.vagaService.deletar(id).subscribe(data => {
      this.alertasService.error('Vaga deletada!', data.nome);
    }, error => {
      this.alertasService.error(error);
    });
  }
  editarVaga(id: number | string): void {
     this.router.navigate([`vaga/${id}`]);
  }
}
