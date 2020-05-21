import {Component, OnInit} from '@angular/core';
import {Produto} from '../../model/produto';
import { ProdutoService } from 'src/services/produto/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: "pesquisa-produto",
  templateUrl: "./pesquisa.produto.component.html",
  styleUrls:[ "./pesquisa.produto.component.css"],
})

export class PesquisaProdutoComponent implements OnInit{
public produtos: Produto[];
public arrProdutos: Produto[];

  ngOnInit(): void{

  }
  
  constructor (private produtoService: ProdutoService, private router: Router){
    this.produtoService.obterTodosProdutos()
    .subscribe(
      produtos => {
        this.produtos = produtos;
        this.arrProdutos = produtos;
      },
      e => {
        console.log(e.error);
      }
    );
  }

  public filtrar(filter: string){    
    if(filter.length == 0){
      this.produtos = this.arrProdutos;
    }else{
      this.produtoService.obterTodosProdutos()
      .subscribe(
        produtos => {
          this.produtos = produtos.filter(prod => prod.nome.toLowerCase().includes(filter.toLowerCase()));
          console.log(this.produtos);
        },
        e => {
          console.log(e.error);
        }
      );
    }
  }

  public adicionarProduto(){
    sessionStorage.removeItem('produtoSession');
    this.router.navigate(['/produto']);
  }

  public deletarProduto(produto: Produto){
    var retorno = confirm("Deseja excluir o produto selecionado?");
    if (retorno ==  true){
      this.produtoService.deletar(produto)
      .subscribe(
        produtos => {
          this.produtos = produtos;
          this.arrProdutos = produtos;
        }
      )
    }
  }
  public editarProduto(produto: Produto){
    sessionStorage.setItem('produtoSession', JSON.stringify(produto));
    this.router.navigate(['/produto']);
  }
  


}