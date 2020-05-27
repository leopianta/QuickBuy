import {Component, OnInit} from "@angular/core";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.";
import { Produto } from "src/app/model/produto";
// import { ProdutoService } from "src/services/produto/produto.service";
// import { Router } from "@angular/router";    


@Component({
    selector: "loja-efetivar",
    templateUrl: "./loja.efetivar.component.html",
    styleUrls: ["./loja.efetivar.component.css"]
})


export class LojaEfetivarComponent implements OnInit{
     public produtos: Produto[];
     public carrinhoCompras: LojaCarrinhoCompras;

    ngOnInit(): void {
        this.carrinhoCompras = new LojaCarrinhoCompras();
        this.produtos = this.carrinhoCompras.obterProdutos();
    }

    // constructor(private produtoServico: ProdutoService, private router: Router){
    //     this.produtoServico.obterTodosProdutos()
    //     .subscribe(
    //       produtos => {
    //         this.produtos = produtos;
    //       },
    //       e => {
    //         console.log(e.error);
    //       }
    //     );
    // }

    // public abrirProduto(produto: Produto){
    //     sessionStorage.setItem('produtoDetalhe', JSON.stringify(produto));
    //     this.router.navigate(['/loja-produto']);
    // }

}