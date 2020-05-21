import {Component, OnInit} from "@angular/core";
import { ProdutoService } from "src/services/produto/produto.service";
import { Produto } from "src/app/model/produto";

@Component({
    selector: "app-loja",
    templateUrl: "./loja.pesquisa.component.html",
    styleUrls: ["./loja.pesquisa.component.css"]
})


export class LojaPesquisaComponent implements OnInit{
    public produtos: Produto[];

    ngOnInit(): void {
        
    }

    constructor(private produtoServico: ProdutoService){
        this.produtoServico.obterTodosProdutos()
        .subscribe(
          produtos => {
            this.produtos = produtos;
          },
          e => {
            console.log(e.error);
          }
        );
    }

    public abrirProduto(produto: Produto){
        alert(produto.nome);
    }

}