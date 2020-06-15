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
     public total: number;

    ngOnInit(): void {
        this.carrinhoCompras = new LojaCarrinhoCompras();
        this.produtos = this.carrinhoCompras.obterProdutos();
        this.atualizarTotal();
    }

    public atualizarPreco(produto: Produto, quantidade: number){
        if (!produto.precoOriginal){
            produto.precoOriginal = produto.preco;
        }

        if(quantidade <= 0){
            var retorno = confirm("Deseja retirar o produto do carrinho?");
            if (retorno ==  true){           
                this.remover(produto);
            }
        }

        produto.preco = produto.precoOriginal * quantidade;
        this.carrinhoCompras.atualizar(this.produtos);
        this.atualizarTotal();
    }

    public remover(produto: Produto){
        var retorno = confirm("Deseja retirar o produto do carrinho?");
        if (retorno ==  true){           
            this.carrinhoCompras.removerProduto(produto);
            this.produtos = this.carrinhoCompras.obterProdutos();
            this.atualizarTotal();
        }
    }

    public atualizarTotal(){
        this.total = this.produtos.reduce((x, produto) => x + produto.preco, 0);
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