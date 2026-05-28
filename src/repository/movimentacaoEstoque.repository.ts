import { db } from "../database/connection.database";
import { iMovimentacaoEstoque } from "../models/movimentacaoEstoque.model";
import { ResultSetHeader } from "mysql2";

export class MovimentacaoRepository {
  async insert(dados: any, idUsuarioLogado: number): Promise<number> {
    const sql = `INSERT INTO MovimentacaoEstoque(idProduto, tipo, quantidade, dataValidade, descricao, login_id, idFornecedor) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      dados.idProduto ?? null,
      dados.tipo ?? null,
      dados.quantidade ?? null,
      dados.dataValidade ? new Date(dados.dataValidade) : null,
      dados.descricao ?? null,
      idUsuarioLogado,
      dados.idFornecedor ?? null
    ];

    const [rows] = await db.execute<ResultSetHeader>(sql, values as any[]);
    return rows.insertId;
  }

  async selectAll(idUsuarioLogado: number): Promise<iMovimentacaoEstoque[]> {
    const sql = "SELECT * FROM MovimentacaoEstoque WHERE login_id = ?;";
    const [rows] = await db.execute<any>(sql, [idUsuarioLogado] as any[]);
    return rows as iMovimentacaoEstoque[];
  }

  async selectById(id: number, idUsuarioLogado: number): Promise<iMovimentacaoEstoque | null> {
    const sql = "SELECT * FROM MovimentacaoEstoque WHERE idMovimentacao = ? AND login_id = ?;";
    const values = [id, idUsuarioLogado];
    const [rows] = await db.execute<any>(sql, values as any[]);
    return (rows[0] as iMovimentacaoEstoque) || null;
  }
}
