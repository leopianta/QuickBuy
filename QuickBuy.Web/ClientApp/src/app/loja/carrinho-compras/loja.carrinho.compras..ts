import {  Produto} from "../../model/produto";

export class LojaCarrinhoCompras{
    public produtos: Produto[] = [];


    public adicionar(produto: Produto){
        var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");

        if(!produtoLocalStorage){
            //se não existir nada dentro do localStorage
            this.produtos.push(produto);
        }else{
            //se já existir pelo menos um unico item armazenado na sessão(localStorage)
            this.produtos = JSON.parse(produtoLocalStorage);
            this.produtos.push(produto);
        }

        localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));
    }

    public obterProdutos() : Produto[]{
        var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");
        
        if(produtoLocalStorage)
           return JSON.parse(produtoLocalStorage);
        
    }

    public removerProduto(produto: Produto){
        var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");
        
        if(produtoLocalStorage){            
            this.produtos = JSON.parse(produtoLocalStorage);
            this.produtos = this.produtos.filter(p => p.id != produto.id);
            localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos)); 
        }
    }

    public atualizar(produtos: Produto[]) {
        localStorage.setItem("produtoLocalStorage", JSON.stringify(produtos)); 
    }

    public temItensCarrinho(): boolean{
        var itens = this.obterProdutos();
        return (itens.length > 0);
    }

}