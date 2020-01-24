import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/services/usuario/usuario.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private router: Router, private usuarioServico: UsuarioService){

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public usuarioLogado(): boolean{    
    return this.usuarioServico.usuario_autenticado();
  }

  sair(){
    this.usuarioServico.limpar_sessao();
    this.router.navigate(['/']);
  }

}
