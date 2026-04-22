import { RowDataPacket } from "mysql2";

export interface iItemFornecedorDTO {
  idProduto: number;
  idFornecedor: number;
}

export interface iItemFornecedor extends RowDataPacket {
  idProduto: number;
  idFornecedor: number;
}

export class ItemFornecedor {
  private _idProduto!: number;
  private _idFornecedor!: number;

  constructor(idProduto: number, idFornecedor: number) {
    this.IdProduto = idProduto;
    this.IdFornecedor = idFornecedor;
  }

  get IdProduto() { return this._idProduto; }
  get IdFornecedor() { return this._idFornecedor; }

  set IdProduto(value: number) {
    if (value <= 0) {
      throw new Error("IdProduto inválido");
    }
    this._idProduto = value;
  }

  set IdFornecedor(value: number) {
    if (value <= 0) {
      throw new Error("IdFornecedor inválido");
    }
    this._idFornecedor = value;
  }

  static criar(idProduto: number, idFornecedor: number) {
    return new ItemFornecedor(idProduto, idFornecedor);
  }
}