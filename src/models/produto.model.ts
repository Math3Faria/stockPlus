import { RowDataPacket } from "mysql2";

export interface IProduto extends RowDataPacket {
    idProduto: number;
    nomeProduto: string;
    valor: number;
    idCategoria: number;
    idFornecedor: number;
    imagemProduto: string;
    quantidade: number;
    qtdMax: number;
    qtdMin: number;
    dataCad: Date;
}

export interface IProdutoCreate {
    nomeProduto: string;
    valor: number;
    idCategoria: number;
    idFornecedor: number;
    imagemProduto: string;
    quantidade: number;
    qtdMax: number;
    qtdMin: number;
}

export class Produto {
    private _idProduto?: number;
    private _nomeProduto: string;
    private _valor: number;
    private _idCategoria: number;
    private _idFornecedor: number;
    private _imagemProduto: string;
    private _quantidade: number;
    private _qtdMax: number;
    private _qtdMin: number;

    constructor(nomeProduto: string, valor: number, idCategoria: number, idFornecedor: number, imagemProduto: string, quantidade: number, qtdMax: number, qtdMin: number, idProduto?: number) {
        if (valor <= 0) throw new Error("Valor deve ser maior que zero");
        if (quantidade < 0) throw new Error("Quantidade não pode ser negativa");
        if (qtdMax < 0 || qtdMin < 0) throw new Error("Limites de estoque não podem ser negativos");
        if (qtdMin > qtdMax) throw new Error("Quantidade mínima não pode ser maior que a máxima");
        this._nomeProduto = nomeProduto;
        this._valor = valor;
        this._idCategoria = idCategoria;
        this._idFornecedor = idFornecedor;
        this._imagemProduto = imagemProduto;
        this._quantidade = quantidade;
        this._qtdMax = qtdMax;
        this._qtdMin = qtdMin;
        this._idProduto = idProduto;
    }

    get idProduto() { return this._idProduto; }
    get nomeProduto() { return this._nomeProduto; }
    get valor() { return this._valor; }
    get idCategoria() { return this._idCategoria; }
    get idFornecedor() { return this._idFornecedor; }
    get imagemProduto() { return this._imagemProduto; }
    get quantidade() { return this._quantidade; }
    get qtdMax() { return this._qtdMax; }
    get qtdMin() { return this._qtdMin; }

    static criar(nomeProduto: string, valor: number, idCategoria: number, idFornecedor: number, imagemProduto: string, quantidade: number, qtdMax: number, qtdMin: number) {
        return new Produto(nomeProduto, valor, idCategoria, idFornecedor, imagemProduto, quantidade, qtdMax, qtdMin);
    }

    static editar(idProduto: number, nomeProduto: string, valor: number, idCategoria: number, idFornecedor: number, imagemProduto: string, quantidade: number, qtdMax: number, qtdMin: number) {
        return new Produto(nomeProduto, valor, idCategoria, idFornecedor, imagemProduto, quantidade, qtdMax, qtdMin, idProduto);
    }
}
