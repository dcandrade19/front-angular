import { VagaService } from './../../services/vaga.service';
import { Vaga } from '../../models/Vaga';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vaga-form',
  templateUrl: './vaga-form.component.html',
  styleUrls: ['./vaga-form.component.css']
})
export class VagaFormComponent implements OnInit {

  vaga: Observable<Vaga>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vagaService: VagaService
  ) { }

  ngOnInit() {
    this.vaga = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.vagaService.buscarVaga(params.get('id')))
    );
  }

}
