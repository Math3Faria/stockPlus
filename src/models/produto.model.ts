import { RowDataPacket } from "mysql2";

export interface IProduto extends RowDataPacket {
    idProduto?: number;
    nomeProduto?: string;
    valor?: number;
    idCategoria?: number;
    idFornecedor?: number;
    imagemProduto?: string;
    dataCad?: Date;
}

export class Produto {
    private _idProduto?: number;
    private _nomeProduto: string = "";
    private _valor: number;
    private _idCategoria: number;
    private _idFornecedor: number;
    private _imagemProduto: string;
    private _dataCad?: Date;

    constructor(
        nomeProduto: string,
        valor: number,
        idCategoria: number,
        idFornecedor: number,
        imagemProduto: string,
        idProduto?: number
    ) {
        this.nomeProduto = nomeProduto;
        this._valor = valor;
        this._idCategoria = idCategoria;
        this._idFornecedor = idFornecedor;
        this._imagemProduto = imagemProduto;
        this._idProduto = idProduto;
    }

    public get idProduto(): number | undefined { return this._idProduto; }
    public get nomeProduto(): string { return this._nomeProduto; }
    public get valor(): number { return this._valor; }
    public get idCategoria(): number { return this._idCategoria; }
    public get idFornecedor(): number { return this._idFornecedor; }
    public get imagemProduto(): string { return this._imagemProduto; }
    public get dataCad(): Date | undefined { return this._dataCad; }

    public set nomeProduto(value: string) {
        this._validarNomeProduto(value);
        this._nomeProduto = value;
    }

    public static criar(
        nomeProduto: string,
        valor: number,
        idCategoria: number,
        idFornecedor: number,
        imagemProduto: string
    ): Produto {
        return new Produto(nomeProduto, valor, idCategoria, idFornecedor, imagemProduto);
    }

    public static editar(
        idProduto: number,
        nomeProduto: string,
        valor: number,
        idCategoria: number,
        idFornecedor: number,
        imagemProduto: string
    ): Produto {
        return new Produto(nomeProduto, valor, idCategoria, idFornecedor, imagemProduto, idProduto);
    }

    public static deletar(idProduto: number): number {
        if (!idProduto || idProduto <= 0) {
            throw new Error("O id do produto deve ser válido.");
        }
        return idProduto;
    }

    private _validarNomeProduto(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome do Produto deve ter pelo menos 3 caracteres");
        }
        if (value.trim().length > 100) {
            throw new Error("Nome do Produto deve ter no máximo 100 caracteres");
        }
    }
}