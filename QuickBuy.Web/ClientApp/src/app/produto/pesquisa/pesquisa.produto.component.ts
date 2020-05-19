import {Component, OnInit} from '@angular/core';
import {Produto} from '../../model/produto';
import { ProdutoService } from 'src/services/produto/produto.service';

@Component({
  selector: "pesquisa-produto",
  templateUrl: "./pesquisa.produto.component.html",
  styleUrls:[ "./pesquisa.produto.component.css"],
})

export class PesquisaProdutoComponent implements OnInit{
public produtos: Produto[];

  ngOnInit(): void{

  }
  
  constructor (private produtoService: ProdutoService){
    this.produtoService.obterTodosProdutos()
    .subscribe(
      produtos => {
        this.produtos = produtos
      },
      e => {
        console.log(e.error);
      }
    );
  }

  public filtrar(filter: string){
    if(filter.length == 0){
      window.location.reload();
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

}