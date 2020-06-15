import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/services/usuario/usuario.service';
import { LojaCarrinhoCompras } from "../loja/carrinho-compras/loja.carrinho.compras.";


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public carrinhoCompras: LojaCarrinhoCompras;

  ngOnInit(): void {
    this.carrinhoCompras = new LojaCarrinhoCompras();
  }

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

  public usuario_administrador(): boolean {
    return this.usuarioServico.usuario_administrador();
  }

  sair(){
    this.usuarioServico.limpar_sessao();
    this.router.navigate(['/']);
  }

  get usuario(){
    return this.usuarioServico.usuario;
  }

  public temItensCarrinho(): boolean{
    return this.carrinhoCompras.temItensCarrinho();
  }

}
