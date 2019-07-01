import { CandidatoService } from './../services/candidato.service';
import { EmpresaService } from './../services/empresa.service';
import { AlertasService } from './../services/alertas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  hide = true;
  tipo: string;
  usuario: FormGroup;

  constructor(
    private empresaService: EmpresaService,
    private candidatoService: CandidatoService,
    private alertasService: AlertasService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.usuario = new FormGroup({
      nome: new FormControl(''),
      razaoSocial: new FormControl(''),
      senha: new FormControl('')
    });
  }

  logar() {
    if (this.tipo === "Candidato") {
      this.candidatoService.logar(this.usuario.getRawValue()).subscribe(data => {
        this.router.navigate(['/vagas']);
        this.alertasService.success('Login realizado com sucesso!', data.nome);
      },
        error => {
          this.alertasService.error(error);
        });
    } else if (this.tipo === "Empresa") {
      this.empresaService.logar(this.usuario.getRawValue()).subscribe(data => {
        this.router.navigate(['/vagas']);
        this.alertasService.success('Login realizado com sucesso!', data.nome);
      },
        error => {
          this.alertasService.error(error);
        });
    }
  }
  salvarUsuario() {
    if (this.tipo === "Candidato") {
      this.candidatoService.salvar(this.usuario.getRawValue()).subscribe(data => {
        this.alertasService.success('Conta criada com sucesso!', data.nome);
      });
    } else if (this.tipo === "Empresa") {
      this.empresaService.salvar(this.usuario.getRawValue()).subscribe(data => {
        this.alertasService.success('Conta criada com sucesso!', data.nome);
      });
    }
  }
}
