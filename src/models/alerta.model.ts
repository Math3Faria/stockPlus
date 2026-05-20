import { RowDataPacket } from "mysql2";

export interface iAlerta extends RowDataPacket {
    idAlerta?: number;
    tipo: string;
    idProduto: number;
    mensagem: string;
    dataGeracao?: Date;
    foiVisualizado?: boolean;
}

export class Alerta {
    private _idAlerta?: number;
    private _tipo: string;
    private _idProduto: number;
    private _mensagem: string;
    private _dataGeracao?: Date;
    private _foiVisualizado?: boolean;

    constructor(dados: iAlerta) {
        this._idAlerta = dados.idAlerta;
        this._tipo = dados.tipo;
        this._idProduto = dados.idProduto;
        this._mensagem = dados.mensagem;
        this._dataGeracao = dados.dataGeracao;
        this._foiVisualizado = dados.foiVisualizado;
    }
    
    public get IdAlerta() { return this._idAlerta; }
    public get Tipo() { return this._tipo; }
    public get IdProduto() { return this._idProduto; }
    public get Mensagem() { return this._mensagem; }
    public get DataGeracao() { return this._dataGeracao; }
    public get FoiVisualizado() { return this._foiVisualizado; }
}
