import { AlertasService } from './../services/alertas.service';
import { UsuarioService } from './../services/usuario.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  hide = true;

  usuario: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    this.usuario = new FormGroup({
      nome: new FormControl(''),
      senha: new FormControl(''),
      tipo: new FormControl('')
    });
  }

  logar() {
    this.usuarioService.logar(this.usuario.getRawValue()).subscribe(data => {
      this.alertasService.success('Login realizado com sucesso!', data.nome);
    },
      error => {
        this.alertasService.error(error);
      });
  }
  salvarUsuario() {
    this.usuarioService.salvar(this.usuario.getRawValue()).subscribe(data => {
      this.alertasService.success('Conta criada com sucesso!', data.nome);
    });
  }
}
