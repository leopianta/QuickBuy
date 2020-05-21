import { Component, OnInit } from "@angular/core";
import { Produto } from "../model/produto";
import { ProdutoService } from "../../services/produto/produto.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-produto",
  templateUrl: "./produto.component.html",
  styleUrls: ["produto.component.css"]
})

export class ProdutoComponent implements OnInit {
  public produto: Produto
  public arquivoSelecionado: File;
  public mensagemArquivo: string;
  public mensagem: string;
  public arquivoEnviado: boolean;
  public produtoCadastrado: boolean;
  public ativar_spinner_file: boolean;
  public ativar_spinner: boolean;


  constructor(private produtoServico: ProdutoService, private router: Router) {
  }

  ngOnInit(): void {
    
    var produtoSession = sessionStorage.getItem('produtoSession');

    if (produtoSession){
      this.produto = JSON.parse(produtoSession);
    }else{
      this.produto = new Produto();
    }
  }

  public inputChange(files: FileList){
    if(files.length > 0){
    this.arquivoSelecionado = files.item(0);
    this.loadingFile(true);
    this.produtoServico.enviarArquivo(this.arquivoSelecionado)
    .subscribe(
      nomeArquivo => {
        this.arquivoEnviado = true
        this.produto.nomeArquivo = nomeArquivo;
        console.log(nomeArquivo);
        this.loadingFile(false);
      }, e => {
        this.mensagemArquivo = e.error;
        this.loadingFile(false);
        console.log(e);
      });      
  }
}


  public cadastrar() {
    this.loadingCadastro(true);
    this.produtoServico.cadastrar(this.produto)
      .subscribe(
        produtoJson => {
          this.produtoCadastrado = true;
          this.mensagemArquivo = "";
          console.log(produtoJson);
          this.loadingCadastro(false);
          this.router.navigate(['/home-produto'])
        },
        e => {
          console.log(e.error);
          this.mensagem = e.error;
          this.loadingCadastro(false);
        }
      );
  }

  get fileName(){
    if (this.arquivoSelecionado != null){
      return this.arquivoSelecionado.name;
    }else{
      return "";
    } 
  }
  public fecharMsgCadastro(produtoCadastrado){
    if(produtoCadastrado ){
      this.produtoCadastrado = false;
    }else{
    this.mensagem = "";
  }
}
  public fecharMsgArquivo(arquivoEnviado){
    if (arquivoEnviado){
      this.arquivoEnviado = false;
    }else{
        this.mensagemArquivo = "";
    }
  }

  public loadingCadastro(show: boolean){
     this.ativar_spinner = show;    
  }

  public loadingFile(show: boolean){
    this.ativar_spinner_file = show;
  }
}
