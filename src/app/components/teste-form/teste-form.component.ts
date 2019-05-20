import { TesteService } from './../../services/teste.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaga } from 'src/app/models/Vaga';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Teste } from 'src/app/models/Teste';

@Component({
  selector: 'app-teste-form',
  templateUrl: './teste-form.component.html',
  styleUrls: ['./teste-form.component.css']
})
export class TesteFormComponent implements OnInit {

  testeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private testeService: TesteService
  ) { }

  @Input() teste: Observable<Teste>;

  ngOnInit() {
    this.criarForm();
  }

  criarForm() {
    this.testeForm = this.formBuilder.group({
      id: {value: '0', disabled : true},
      titulo: [''],
      vaga: {value: '', disabled : true},
      questoes: [[]]
    });
    if (this.teste) {
      this.teste.subscribe(data => {
        this.testeForm.setValue(data);
      });
    }
  }
  salvarTeste() {
    this.testeService.salvar(this.testeForm.getRawValue()).subscribe();
  }
}
