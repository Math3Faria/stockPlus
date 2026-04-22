import { db } from "../database/connection.database";
import { iMovimentacaoEstoque } from "../models/movimentacaoEstoque.model";
import { ResultSetHeader } from "mysql2";

export class MovimentacaoRepository {

  async insert(dados: iMovimentacaoEstoque): Promise<number> {
    const sql = `INSERT INTO MovimentacaoEstoque (idProduto, tipo, quantidade)VALUES (?, ?, ?)`;
    const values = [dados.idProduto, dados.tipo, dados.quantidade];
    const [result] = await db.execute<ResultSetHeader>(sql, values);
    return result.insertId;
  }

  async selectAll(): Promise<iMovimentacaoEstoque[]> {
    const [rows] = await db.execute<iMovimentacaoEstoque[]>(
      "SELECT * FROM MovimentacaoEstoque"
    );
    return rows;
  }

  async selectById(id: number): Promise<iMovimentacaoEstoque | null> {
    const [rows] = await db.execute<iMovimentacaoEstoque[]>(
      "SELECT * FROM MovimentacaoEstoque WHERE idMovimentacao = ?",
      [id]
    );
    return rows[0] || null;
  }
}