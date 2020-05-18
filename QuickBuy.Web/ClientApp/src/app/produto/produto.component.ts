import { Component, OnInit } from "@angular/core";
import { Produto } from "../model/produto";
import { ProdutoService } from "../../services/produto/produto.service";

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


  constructor(private produtoServico: ProdutoService) {
  }

  ngOnInit(): void {
    this.produto = new Produto();
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
