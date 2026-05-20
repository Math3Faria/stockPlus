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
    dataVencimento: Date;
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
    dataVencimento: Date;
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
    private _dataVencimento: Date;

    constructor(nomeProduto: string, valor: number, idCategoria: number, idFornecedor: number, imagemProduto: string, quantidade: number, qtdMax: number, qtdMin: number, dataVencimento: Date, idProduto?: number) {
        if (valor <= 0) throw new Error("Valor deve ser maior que zero");
        if (quantidade < 0) throw new Error("Quantidade não pode ser negativa");
        if (qtdMax < 0 || qtdMin < 0) throw new Error("Limites de estoque não podem ser negativos");
        if (qtdMin > qtdMax) throw new Error("Quantidade mínima não pode ser maior que a máxima");
        if (!dataVencimento || isNaN(dataVencimento.getTime())) throw new Error("Data de vencimento inválida");
        this._nomeProduto = nomeProduto;
        this._valor = valor;
        this._idCategoria = idCategoria;
        this._idFornecedor = idFornecedor;
        this._imagemProduto = imagemProduto;
        this._quantidade = quantidade;
        this._qtdMax = qtdMax;
        this._qtdMin = qtdMin;
        this._dataVencimento = dataVencimento;
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
    get dataVencimento() { return this._dataVencimento; }

    static criar(nomeProduto: string, valor: number, idCategoria: number, idFornecedor: number, imagemProduto: string, quantidade: number, qtdMax: number, qtdMin: number, dataVencimento: Date) {
        return new Produto(nomeProduto, valor, idCategoria, idFornecedor, imagemProduto, quantidade, qtdMax, qtdMin, dataVencimento);
    }

    static editar(idProduto: number, nomeProduto: string, valor: number, idCategoria: number, idFornecedor: number, imagemProduto: string, quantidade: number, qtdMax: number, qtdMin: number, dataVencimento: Date) {
        return new Produto(nomeProduto, valor, idCategoria, idFornecedor, imagemProduto, quantidade, qtdMax, qtdMin, dataVencimento, idProduto);
    }
}
