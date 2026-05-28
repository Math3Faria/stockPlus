import { db } from "../database/connection.database";
import { iMovimentacaoEstoque } from "../models/movimentacaoEstoque.model";
import { ResultSetHeader } from "mysql2";

export class MovimentacaoRepository {

  async insert(dados: iMovimentacaoEstoque, idUsuarioLogado: number): Promise<number> {
    const sql = `INSERT INTO MovimentacaoEstoque(idProduto, tipo, quantidade, dataValidade, descricao, login_id) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [dados.idProduto, dados.tipo, dados.quantidade, dados.dataValidade ?? null, dados.descricao ?? null, idUsuarioLogado];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async selectAll(idUsuarioLogado: number): Promise<iMovimentacaoEstoque[]> {
    const sql = "SELECT * FROM MovimentacaoEstoque WHERE login_id = ?;";
    const [rows] = await db.execute<iMovimentacaoEstoque[]>(sql, [idUsuarioLogado]);
    return rows;
  }

  async selectById(id: number, idUsuarioLogado: number): Promise<iMovimentacaoEstoque | null> {
    const sql = "SELECT * FROM MovimentacaoEstoque WHERE idMovimentacao = ? AND login_id = ?;";
    const values = [id, idUsuarioLogado];
    const [rows] = await db.execute<iMovimentacaoEstoque[]>(sql, values);
    return rows[0] || null;
  }
}
