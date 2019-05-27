import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { VagaService } from '../services/vaga.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vaga } from '../models/Vaga';
import { Teste } from '../models/Teste';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vaga-form',
  templateUrl: './vaga-form.component.html',
  styleUrls: ['./vaga-form.component.css']
})
export class VagaFormComponent implements OnInit {

  vagas: FormGroup;
  vaga: Vaga = new Vaga();

  constructor(
    private vagaService: VagaService,
    private router: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.vagas = new FormGroup({
      id: new FormControl({ value: '', disabled: 'true' }),
      nome: new FormControl(''),
      empresa: new FormControl(''),
      descricao: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      data: new FormControl({ value: '', disabled: 'true' }),
      periodo: new FormControl(''),
      testes: new FormArray([
        this.initTestes()
      ])
    });

    this.router.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.vagaService.buscar(params.get('id')).subscribe(vaga => {

          let testes = this.getTestes(this.vagas);
          let questoesForm = [];
          let questoes = [];

          while (testes.length < vaga.testes.length) {
            testes.push(this.initTestes())
          }

          testes.forEach(teste => {
            questoesForm.push(this.getQuestoes(teste))
          })

          vaga.testes.forEach(teste => {
            questoes.push(teste.questoes)
          })

          for(let i =0; i < questoes.length; i++) {
            while (questoesForm[i].length < questoes[i].length) {
              questoesForm[i].push(this.initQuestoes())
            }
          }

          this.vagas.patchValue(vaga)
        });
      }

    });

  }

  initTestes() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: 'true' }),
      titulo: new FormControl(''),
      questoes: new FormArray([
        this.initQuestoes()
      ])
    });
  }
  initQuestoes() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: 'true' }),
      descricao: new FormControl(''),
      respostas: new FormArray([
        this.initRespostas(),
        this.initRespostas(),
        this.initRespostas(),
        this.initRespostas(),
        this.initRespostas(),
      ])
    });
  }

  initRespostas() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: 'true' }),
      descricao: new FormControl(''),
      certa: new FormControl('')
    });
  }

  addTeste() {
    const control = this.vagas.get('testes') as FormArray;
    control.push(this.initTestes());
  }

  addQuestao(j) {
    console.log(j);
    const control = this.vagas.get('testes')['controls'][j].get('questoes') as FormArray;

    control.push(this.initQuestoes());

  }

  add(i, j) {

    const control = this.vagas.get('testes')['controls'][i].get('questoes').controls[j].get('respostas') as FormArray;

    control.push(this.initRespostas());
  }

  getTestes(form) {
    return form.controls.testes.controls;
  }
  getQuestoes(form) {
    return form.controls.questoes.controls;
  }
  getRespostas(form) {
    return form.controls.respostas.controls;
  }

  removerQuestoes(j) {
    const control = this.vagas.get('testes')['controls'][j].get('questoes') as FormArray;
    control.removeAt(j);
  }

  removerTestes(i) {
    const control = this.vagas.get('testes') as FormArray;
    control.removeAt(i);

  }

  removerResposta(i, j, k) {
    console.log(i, j, k);
    const control = this.vagas.get(['testes', i, 'questoes', j, 'respostas']) as FormArray;
    control.removeAt(k);
  }

  remover(i, j) {
    const control = this.vagas.get(['testes', i, 'questoes', j, 'respostas']) as FormArray;
    control.removeAt(0);
    control.controls = [];
  }

  salvarVaga() {
    this.vagas.controls.data.setValue(new Date());
    this.vagaService.salvar(this.vagas.getRawValue()).subscribe();
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  print(teste: any) {
    console.log(teste);
  }
}
