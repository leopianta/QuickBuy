import {Component, OnInit} from "@angular/core";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.";
import { Produto } from "src/app/model/produto";
import { Pedido } from "src/app/model/pedido";
import { UsuarioService } from "src/services/usuario/usuario.service";
import { ItemPedido } from "src/app/model/ItemPedido";
import { PedidoServico } from "src/services/pedido/pedido.service";
import { Router } from "@angular/router";
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

    constructor(private usuarioServico: UsuarioService, private pedidoServico: PedidoServico, private router: Router){

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

    public efetivarCompra(){
        let pedido = new Pedido();      
        this.pedidoServico.efetivarCompra(this.criarPedido())
            .subscribe(
                pedidoId => {
                    console.log(pedidoId);
                    sessionStorage.setItem("pedidoId",pedidoId.toString());
                    this.produtos = [];
                    this.carrinhoCompras.limparCarrinhoCompras();
                    this.router.navigate(["/compra-realizada-sucesso"]);
                },
                e => {
                    alert("Houve um erro ao realizar o pedido!");
                })
    }

    public criarPedido(): Pedido{
        let pedido = new Pedido();      

        pedido.usuarioId = this.usuarioServico.usuario.id;
        pedido.cep = "36000-000";
        pedido.cidade = "Juiz de Fora";
        pedido.dataPedido = new Date();
        pedido.estado = "Minas Gerais";
        pedido.dataPrevisaoEntrega = new Date();
        pedido.formaPagamentoId = 2;
        pedido.numeroEndereco = 958;
        pedido.enderecoCompleto = "Avenida Rio Branco";

        this.produtos = this.carrinhoCompras.obterProdutos();

        for(let prod of this.produtos){
            let itemPedido = new ItemPedido();
            itemPedido.produtoId = prod.id;

            if (!prod.quantidade)
            prod.quantidade = 1;
            itemPedido.quantidade = prod.quantidade;

            pedido.itensPedido.push(itemPedido);

            console.log(itemPedido);
            console.log(pedido);
            

        }
        return pedido;
    }
}