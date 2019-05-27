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
    private router: Router
  ) { }

  ngOnInit() {
  }

  deletarVaga(id: number | string): void {
    this.vagaService.deletar(id).subscribe();
  }
  editarVaga(id: number | string): void {
     this.router.navigate([`vaga/${id}`]);
  }
}
