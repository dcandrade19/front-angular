import { TesteService } from './../../services/teste.service';
import { Component, OnInit, Input } from '@angular/core';
import { Teste } from 'src/app/models/Teste';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-testes-lista',
  templateUrl: './testes-lista.component.html',
  styleUrls: ['./testes-lista.component.css']
})
export class TestesListaComponent implements OnInit {


  constructor(
    private testeService: TesteService
  ) {
  }

  @Input() testes: Observable<Teste[]>;

  ngOnInit() {
  }

  deletarTeste(id: number | string): void {
    this.testeService.deletar(id).subscribe();
  }
}
