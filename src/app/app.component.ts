import { UsuarioService } from './services/usuario.service';
import { Component } from '@angular/core';
import { Usuario } from './models/Usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto-vaga';
  usuarioLogado: Usuario;

    constructor(
        private usuarioService: UsuarioService
    ) {
        this.usuarioService.usuarioLogado.subscribe(x => this.usuarioLogado = x);
    }

}
