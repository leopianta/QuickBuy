import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../model/usuario";
import { UsuarioService } from "../../../services/usuario/usuario.service";

@Component({
  selector: "cadastro-usuario",
  templateUrl: "./cadastro.usuario.component.html",
  styleUrls: ["./cadastro.usuario.component.css"]
})

export class CadastroUsuarioComponent implements OnInit {
  public usuario: Usuario;
  public ativar_spinner: boolean;
  public mensagem: string;
  public usuarioCadastrado: boolean;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.usuario = new Usuario();
  }

  public cadastrar() {
    alert("Nome:" + this.usuario.nome + " Sobrenome:" + this.usuario.sobrenome + " Email:" + this.usuario.email + " Senha:" + this.usuario.senha);
    this.usuarioService.cadastrarUsuario(this.usuario)
     .subscribe(
     usuarioJson => { 
       this.usuarioCadastrado = true;
       this.mensagem = "";
     },
     e => { 
      this.mensagem = e.error;    
     }
    );
  }
}
