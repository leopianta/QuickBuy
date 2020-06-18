import { ItemPedido } from "./ItemPedido";

export class Pedido{

    id: number;
    usuarioId: number;
    dataPedido: Date;
    dataPrevisaoEntrega: Date;
    cep: string;
    estado: string;
    cidade: string;
    enderecoCompleto: string;
    numeroEndereco: number;
    formaPagamentoId: number;    
    itensPedido: ItemPedido[];

    constructor(){
        this.itensPedido = [];
    }
}