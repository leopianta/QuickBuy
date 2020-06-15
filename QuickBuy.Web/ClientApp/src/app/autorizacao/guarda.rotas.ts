import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UsuarioService } from "src/services/usuario/usuario.service";

@Injectable({
    providedIn:'root'
})

export class GuardaRotas implements CanActivate {   

    constructor(private router: Router, private usuarioServico: UsuarioService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {        
        //Se usuário autenticado, retorna verdadeiro    
                
        if (this.usuarioServico.usuario_autenticado()) {      
            return true;
            // if (this.usuarioServico.usuario.administradorSN){
            //     return true;
            // }
            // else{
            //     if (this.router.url.includes("home-produto")){
            //         this.router.navigate(["/"], { queryParams: { returnUrl: state.url } });
            //         return true;
            //     }                                               
            // }      
        }
        this.router.navigate(["/entrar"], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
