import { db } from "../database/connection.database";
import { iMovimentacaoEstoque } from "../models/movimentacaoEstoque.model";
import { ResultSetHeader } from "mysql2";

export class MovimentacaoRepository {

  async insert(dados: iMovimentacaoEstoque): Promise<number> {
    const sql = `INSERT INTO MovimentacaoEstoque (idProduto, tipo, quantidade)VALUES (?, ?, ?)`;
    const values = [dados.idProduto, dados.tipo, dados.quantidade];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async selectAll(): Promise<iMovimentacaoEstoque[]> {
    const sql = "SELECT * FROM MovimentacaoEstoque;";
    const [rows] = await db.execute<iMovimentacaoEstoque[]>(sql);
    return rows;
  }

  async selectById(id: number): Promise<iMovimentacaoEstoque | null> {
    const sql =  "SELECT * FROM MovimentacaoEstoque WHERE idMovimentacao = ?;";
    const values = [id];
    const [rows] = await db.execute<iMovimentacaoEstoque[]>(sql, values);
    return rows[0];
  }
}