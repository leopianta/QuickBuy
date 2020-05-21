import { Component } from '@angular/core';
import { UsuarioService } from 'src/services/usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private usuarioServico: UsuarioService){    
  }

  public usuarioLogado(): boolean{    
    return this.usuarioServico.usuario_autenticado();
  }
}
