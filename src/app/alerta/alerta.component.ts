import { AlertasService } from './../services/alertas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  mensagem: any;

  constructor(private alertasService: AlertasService) { }

  ngOnInit() {
    this.subscription = this.alertasService.getMensagem().subscribe(mensagem => {
      this.mensagem = mensagem;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  limparMensagem() {
    this.alertasService.clear();
  }

}
