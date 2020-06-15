import {Injectable, Inject} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { Usuario } from "src/app/model/usuario";

@Injectable({
    providedIn:"root"
})
export class UsuarioService{
    
    private baseURL: string;
    private _usuario: Usuario;

    set usuario(usuario: Usuario){
        sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
        this._usuario = usuario;
    }


    get usuario(): Usuario{
        let usuario_json = sessionStorage.getItem("usuario-autenticado");
        this._usuario = JSON.parse(usuario_json);
        return this._usuario;
    }
    

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string){
        baseUrl = "https://localhost:44398/"; //retirar depois       
        this.baseURL = baseUrl;              
    }    

    public verificarUsuario(usuario: Usuario): Observable<Usuario>{
        const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
            email: usuario.email,
            senha: usuario.senha
        }          
        return this.http.post<Usuario>(this.baseURL + "api/usuario/VerificarUsuario", body, { headers });
    }    

    public usuario_autenticado():boolean{
        return this._usuario != null && this._usuario.email != "" && this._usuario.senha != "";
    }


    public usuario_administrador(): boolean{
        return this.usuario_autenticado() && this.usuario.administradorSN;
    }


    public limpar_sessao(){
        sessionStorage.setItem("usuario-autenticado", "");
        this._usuario = null;
    }

  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      email: usuario.email,
      senha: usuario.senha,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome
    }
     return this.http.post<Usuario>(this.baseURL + "api/usuario", body, { headers });
  }

  public nomeUsuario():string{
    return this._usuario.nome;
  }
  
}
