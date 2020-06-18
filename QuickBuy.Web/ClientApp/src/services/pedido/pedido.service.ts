import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pedido } from "src/app/model/pedido";


@Injectable({
    providedIn: "root"
  })

export class PedidoServico{
    private _baseUrl: string;
    
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string){
      baseUrl = "https://localhost:44398/"; //retirar depois   
      this._baseUrl = baseUrl;

    }


    get headers(): HttpHeaders {
        return new HttpHeaders().set('content-type', 'application/json');
      }

    public efetivarCompra(pedido: Pedido): Observable<number>{
        return this.http.post<number>(this._baseUrl + "api/pedido", JSON.stringify(pedido), {headers: this.headers })        
    }


}