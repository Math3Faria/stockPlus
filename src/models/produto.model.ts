import { RowDataPacket } from "mysql2";

export interface IProduto extends RowDataPacket {
    id?: number;
    nomeProd?: string;
    valor?: number;
    idcategoria?: number;
    dataCad?: Date;
}

export class Produto {
    private _id?: number;
    private _nomeProd: string = "";
    private _valor: number;
    private _idCategoria?: number;
    private _dataCad?: Date;

    constructor(nomeProd: string, valor: number, idCategoria: number, id?: number) {
        this.nomeProd = nomeProd;
        this._valor = valor;
        this._idCategoria = idCategoria;
        this._id = id;
    }

    public get id(): number | undefined { return this._id; }

    public get nomeProd(): string { return this._nomeProd; }

    public get idCategoria(): number | undefined { return this._idCategoria; }
    
    public get valor(): number { return this._valor; }

    public set nomeProd(value: string) {
        this._validarnomeProd(value);
        this._nomeProd = value;
    }

    public static criar(nomeProd: string, valor: number, idCategoria: number): Produto {
        return new Produto(nomeProd, valor, idCategoria);
    }

    public static editar(id: number, nomeProd: string, valor: number, idCategoria: number): Produto {
        return new Produto(nomeProd, valor, idCategoria, id);
    }

    private _validarnomeProd(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome do Produto deve ter pelo menos 3 caracteres");
        }
        if (value.trim().length > 45) {
            throw new Error("Nome do Produto deve ter no máximo 45 caracteres");
        }
    }

    public static deletar(id: number): number {
        if (!id || id <= 0) {
            throw new Error("O id deve ser um número válido.");
        }
        return id;
    }
}
