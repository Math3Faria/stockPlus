import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iFornecedor } from "../models/fornecedores.model";

export class FornecedorRepository {

  async selectAll(idUsuarioLogado: number): Promise<iFornecedor[]> {
    const sql = "SELECT * FROM fornecedores WHERE login_id = ?";
    const [rows] = await db.execute<iFornecedor[]>(sql, [idUsuarioLogado]);
    return rows;
  }

  async selectById(id: number, idUsuarioLogado: number): Promise<iFornecedor | null> {
    const sql = "SELECT * FROM fornecedores WHERE idFornecedor = ? AND login_id = ?";
    const [rows] = await db.execute<iFornecedor[]>(sql, [id, idUsuarioLogado]);
    return rows[0] || null;
  }

  async insert(
    empresa: string,
    email: string,
    cnpj: string,
    idUsuarioLogado: number
  ): Promise<number> {
    const sql = "INSERT INTO fornecedores (empresa, email, cnpj, login_id) VALUES (?, ?, ?, ?)";
    const values = [empresa, email, cnpj, idUsuarioLogado];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async update(
    id: number,
    empresa: string,
    email: string,
    cnpj: string,
    idUsuarioLogado: number
  ): Promise<ResultSetHeader> {
    const sql = "UPDATE fornecedores SET empresa = ?, email = ?, cnpj = ? WHERE idFornecedor = ? AND login_id = ?";
    const values = [empresa, email, cnpj, id, idUsuarioLogado];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async delete(id: number, idUsuarioLogado: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM fornecedores WHERE idFornecedor = ? AND login_id = ?";
    const [rows] = await db.execute<ResultSetHeader>(sql, [id, idUsuarioLogado]);
    return rows;
  }
}
