import { Empresa } from './../models/Empresa';
import { Candidato } from './../models/Candidato';
import { EmpresaService } from '../services/empresa.service';
import { CandidatoService } from '../services/candidato.service';
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
  @Input() candidatoLogado: Candidato;
  @Input() empresaLogado: Empresa;


  constructor(
    private candidatoService: CandidatoService,
    private empresaService: EmpresaService,
    private router: Router,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.candidatoService.logout();
    this.empresaService.logout();
    this.router.navigate(['/login']);
    this.alertasService.success('Usuario deslogado!');
  }

}
