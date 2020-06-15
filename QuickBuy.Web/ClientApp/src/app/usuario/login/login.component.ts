import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../model/usuario";
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioService } from "src/services/usuario/usuario.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {
    public usuario;
    public returnUrl: string;
    public mensagem: string;
    public ativar_spinner: boolean;

    constructor(private router: Router, private activatedRouter: ActivatedRoute, private usuarioServico: UsuarioService) {        
    }
    
    ngOnInit(): void {
        this.returnUrl = this.activatedRouter.snapshot.queryParams["returnUrl"];
        this.usuario = new Usuario();
    }

    entrar() {
        this.ativar_spinner = true;
        this.usuarioServico.verificarUsuario(this.usuario)
        .subscribe(
            usuario_json => {
                this.usuarioServico.usuario = usuario_json
                if(this.returnUrl == null){
                    this.router.navigate(['/']);
                }else{
                    this.router.navigate([this.returnUrl]);
                }
            },
            err => {
                console.log(err.error);
                this.mensagem = err.error;
                this.ativar_spinner = false;
            }
        );            
    }
}
