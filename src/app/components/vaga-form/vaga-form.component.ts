import { VagaService } from './../../services/vaga.service';
import { Vaga } from '../../models/Vaga';
import { Teste } from '../../models/Teste';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vaga-form',
  templateUrl: './vaga-form.component.html',
  styleUrls: ['./vaga-form.component.css']
})
export class VagaFormComponent implements OnInit {

  vagaForm: FormGroup;
  vaga: Observable<Vaga>;
  vagaTestes: Teste[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vagaService: VagaService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.vaga = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.vagaService.buscar(params.get('id')))
    );
    this.criarForm();
  }

  criarForm() {
    this.vagaForm = this.formBuilder.group({
      id: {value: '', disabled : true},
      nome: [''],
      empresa: {value: 'EmpLogado', disabled : true},
      descricao: [''],
      cidade: [''],
      estado: [''],
      data: {value: new Date().toISOString().substring(0, 10), disabled : true},
      periodo: [''],
      testes: [[]]
    });
    this.vaga.subscribe(data => {
      this.vagaForm.setValue(data);
      this.vagaTestes = data.testes;
      this.vagaForm.controls.data.setValue(new Date(data.data).toISOString().substring(0, 10));
    });
  }

  voltar() {
    this.router.navigate(['/vagas']);
  }

  salvarVaga() {
    this.vagaForm.controls.data.setValue(new Date());
    this.vagaService.salvar(this.vagaForm.getRawValue()).subscribe(() => this.voltar());
  }
}
