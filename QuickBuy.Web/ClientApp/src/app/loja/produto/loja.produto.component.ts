import {Component, OnInit} from "@angular/core";
import { ProdutoService } from "src/services/produto/produto.service";
import { Produto } from "src/app/model/produto";

@Component({
    selector: "loja-app-produto",
    templateUrl: "./loja.produto.component.html",
    styleUrls: ["./loja.produto.component.css"]
})


export class LojaProdutoComponent implements OnInit{
    // public produtos: Produto[];

    ngOnInit(): void {
        
    }

    constructor(private produtoServico: ProdutoService){
       
    }

}