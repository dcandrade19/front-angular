import { TesteService } from './../../services/teste.service';
import { VagaService } from './../../services/vaga.service';
import { Vaga } from '../../models/Vaga';
import { Teste } from '../../models/Teste';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-vaga-form',
  templateUrl: './vaga-form.component.html',
  styleUrls: ['./vaga-form.component.css']
})
export class VagaFormComponent implements OnInit {

  vagaForm: FormGroup;
  testes: FormArray;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vagaService: VagaService,
    private testeService: TesteService,
    private formBuilder: FormBuilder,
  ) { }

  @Input() vaga: Observable<Vaga>;

  ngOnInit() {
    this.criarForm();
  }

  criarForm() {
    this.vagaForm = this.formBuilder.group({
      id: { value: '', disabled: true },
      nome: [''],
      empresa: { value: 'EmpLogado', disabled: true },
      descricao: [''],
      cidade: [''],
      estado: [''],
      data: { value: '', disabled: true },
      periodo: [''],
      testes: this.formBuilder.array([
        this.criarTeste()
      ])
    });
    if (this.vaga) {

      const vaga = new Vaga().deserialize(this.vaga);
      const testes = this.vagaForm.get('testes') as FormArray;
      while (testes.length) {
        testes.removeAt(0);
      }
      this.vagaForm.patchValue(this.vaga);
      vaga.testes.forEach(teste => {
        testes.push(this.criarTeste(teste));
      });
      this.vagaForm.controls.data.setValue(new Date(vaga.data).toISOString().substring(0, 10));
    }
  }

  voltar() {
    this.router.navigate(['/vagas']);
  }

  criarTeste(teste: Teste = new Teste()): FormGroup {
    return this.formBuilder.group({
      id: { value: teste.id, disabled: true },
      titulo: teste.titulo,
      questoes: teste.questoes
    });
  }

  addTeste(): void {
    this.testes = this.vagaForm.get('testes') as FormArray;
    this.testes.push(this.criarTeste());
  }
  removerTeste(index: number): void {
    this.testes = this.vagaForm.get('testes') as FormArray;
    this.testes.removeAt(index);
  }
  salvarVaga() {
    this.vagaForm.controls.data.setValue(new Date());
    this.vagaService.salvar(this.vagaForm.getRawValue()).subscribe();
  }

}
