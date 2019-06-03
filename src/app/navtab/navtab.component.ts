import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { Router } from '@angular/router';
import { AlertasService } from '../services/alertas.service';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.component.html',
  styleUrls: ['./navtab.component.css']
})
export class NavtabComponent implements OnInit {

  opened = true;
  @Input() usuarioLogado: Usuario;


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
    this.alertasService.success('Usuario deslogado!');
  }

}
