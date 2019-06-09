import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { VagaService } from '../services/vaga.service';
import { ActivatedRoute } from '@angular/router';
import { Vaga } from '../models/Vaga';
import { AlertasService } from '../services/alertas.service';

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
    private alertasService: AlertasService
  ) {

  }

  ngOnInit() {
    this.vagas = new FormGroup({
      idVaga: new FormControl({ value: 0, disabled: 'true' }),
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

          const testes = this.getTestes(this.vagas);
          const questoesForm = [];
          const questoes = [];

          while (testes.length < vaga.testes.length) {
            testes.push(this.initTestes());
          }

          testes.forEach(teste => {
            questoesForm.push(this.getQuestoes(teste));
          });

          vaga.testes.forEach(teste => {
            questoes.push(teste.questoes);
          });

          for (let i = 0; i < questoes.length; i++) {
            while (questoesForm[i].length < questoes[i].length) {
              questoesForm[i].push(this.initQuestoes());
            }
          }

          this.vagas.patchValue(vaga);
          this.alertasService.success('Editando vaga!', vaga.nome);
        });
      }

    });

  }

  initTestes() {
    return new FormGroup({
      idTeste: new FormControl({ value: 0, disabled: 'true' }),
      titulo: new FormControl(''),
      questoes: new FormArray([
        this.initQuestoes()
      ])
    });
  }
  initQuestoes() {
    return new FormGroup({
      idQuestao: new FormControl({ value: 0, disabled: 'true' }),
      descricao: new FormControl(''),
      respostas: new FormArray([
        this.initRespostas(),
        this.initRespostas(),
        this.initRespostas(),
        this.initRespostas(),
        this.initRespostas()
      ])
    });
  }

  initRespostas() {
    return new FormGroup({
      idResposta: new FormControl({ value: 0, disabled: 'true' }),
      descricao: new FormControl(''),
      certa: new FormControl('')
    });
  }

  addTeste() {
    const control = this.vagas.get('testes') as FormArray;
    control.push(this.initTestes());
    this.alertasService.success('Teste adicionado!');
  }

  addQuestao(j) {
    console.log(j);
    const control = this.vagas.get('testes')['controls'][j].get('questoes') as FormArray;

    control.push(this.initQuestoes());
    this.alertasService.success('Questão adicionada!');
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
    this.alertasService.error('Questão removida!');
  }

  removerTestes(i) {
    const control = this.vagas.get('testes') as FormArray;
    control.removeAt(i);
    this.alertasService.error('Teste removido!');
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
    this.vagaService.salvar(this.vagas.getRawValue()).subscribe(data => {
      this.alertasService.success('Vaga salva!', data.nome);
    }, error => {
      this.alertasService.error(error);
    });
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  print(teste: any) {
    console.log(teste);
  }
}
