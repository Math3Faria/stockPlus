import { RowDataPacket } from "mysql2";

export interface iMovimentacaoEstoque extends RowDataPacket {
  idMovimentacao?: number;
  idProduto: number;
  tipo: "ENTRADA" | "SAIDA";
  quantidade: number;
  dataValidade: Date | null;
  descricao?: string | null;
  dataMovimentacao?: Date;
}

export class MovimentacaoEstoque {
  private _id?: number;
  private _idProduto!: number;
  private _tipo!: string;
  private _quantidade!: number;
  private _dataValidade: Date | null = null;
  private _descricao: string | null = null;

  constructor(
    idProduto: number,
    tipo: string,
    quantidade: number,
    dataValidade?: Date | null,
    descricao?: string | null,
    id?: number
){
    this._idProduto = idProduto;
    this._tipo = tipo;
    this._quantidade = quantidade;
    this._dataValidade = dataValidade ?? null;
    this._descricao = descricao ?? null;
    this._id = id;
  }

  get Id() { return this._id; }
  get IdProduto() { return this._idProduto; }
  get Tipo() { return this._tipo; }
  get Quantidade() { return this._quantidade; }
  get DataValidade() { return this._dataValidade; }
  get Descricao() { return this._descricao; }

  set Tipo(value: string) {
    const tiposValidos = ["ENTRADA", "SAIDA"];
    if (!tiposValidos.includes(value)) {
      throw new Error("Tipo inválido");
    }
    this._tipo = value;
  }

  set Quantidade(value: number) {
    if (value <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }
    this._quantidade = value;
  }

  set DataValidade(value: Date | null) {

    if (this._tipo === "ENTRADA" && !value) {
      throw new Error(
        "Data de validade é obrigatória para entradas."
      );
    }

    this._dataValidade = value;
  }

  set Descricao(value: string | null) {
    this._descricao = value;
  }
}