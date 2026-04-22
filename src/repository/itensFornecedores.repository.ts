import { db } from "../database/connection.database";
import { iItemFornecedor } from "../models/itensFornecedores.model";
import { ResultSetHeader } from "mysql2";

export class ItensFornecedoresRepository {

  async insert(idProduto: number, idFornecedor: number): Promise<ResultSetHeader> {
    const sql = `
      INSERT INTO Itens_Fornecedores (idProduto, idFornecedor)
      VALUES (?, ?)
    `;

    const values = [idProduto, idFornecedor];

    const [result] = await db.execute<ResultSetHeader>(sql, values);
    return result;
  }

  async selectAll(): Promise<iItemFornecedor[]> {
    const [rows] = await db.execute<iItemFornecedor[]>(
      "SELECT * FROM Itens_Fornecedores"
    );
    return rows;
  }

  async selectByProduto(idProduto: number): Promise<iItemFornecedor[]> {
    const [rows] = await db.execute<iItemFornecedor[]>(
      "SELECT * FROM Itens_Fornecedores WHERE idProduto = ?",
      [idProduto]
    );
    return rows;
  }

  async selectByFornecedor(idFornecedor: number): Promise<iItemFornecedor[]> {
    const [rows] = await db.execute<iItemFornecedor[]>(
      "SELECT * FROM Itens_Fornecedores WHERE idFornecedor = ?",
      [idFornecedor]
    );
    return rows;
  }

  async selectByProdutoFornecedor(
    idProduto: number,
    idFornecedor: number
  ): Promise<iItemFornecedor | null> {

    const [rows] = await db.execute<iItemFornecedor[]>(
      "SELECT * FROM Itens_Fornecedores WHERE idProduto = ? AND idFornecedor = ?",
      [idProduto, idFornecedor]
    );

    return rows[0] || null;
  }

  async update(
    idProduto: number,
    idFornecedorAntigo: number,
    idFornecedorNovo: number
  ): Promise<ResultSetHeader> {

    const sql = `
      UPDATE Itens_Fornecedores
      SET idFornecedor = ?
      WHERE idProduto = ? AND idFornecedor = ?
   `;

    const values = [idFornecedorNovo, idProduto, idFornecedorAntigo];

    const [result] = await db.execute<ResultSetHeader>(sql, values);
    return result;
  }

  async delete(
    idProduto: number,
    idFornecedor: number
  ): Promise<ResultSetHeader> {

    const sql = `
      DELETE FROM Itens_Fornecedores
      WHERE idProduto = ? AND idFornecedor = ?
    `;

    const values = [idProduto, idFornecedor];

    const [result] = await db.execute<ResultSetHeader>(sql, values);
    return result;
  }
}