import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iCategoria } from "../models/categoria.model";

export class CategoriaRepository {

  async selectAll(): Promise<iCategoria[]> {
    const sql = "SELECT * FROM categorias";
    const [rows] = await db.execute<iCategoria[]>(sql, []);
    return rows;
  }

  async selectById(id: number, idUsuarioLogado: number): Promise<iCategoria | null> {
    const sql = "SELECT * FROM categorias WHERE idCategoria = ? AND login_id = ?";
    const [rows] = await db.execute<iCategoria[]>(sql, [id, idUsuarioLogado]);
    return rows[0] || null;
  }

  async insert(descricao: string, idUsuarioLogado: number): Promise<number> {
    const sql = "INSERT INTO categorias (descricao, login_id) VALUES (?, ?)";
    const values = [descricao, idUsuarioLogado];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async update(id: number, descricao: string, idUsuarioLogado: number): Promise<ResultSetHeader> {
    const sql = "UPDATE categorias SET descricao = ? WHERE idCategoria = ? AND login_id = ?";
    const values = [descricao, id, idUsuarioLogado];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async delete(id: number, idUsuarioLogado: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM categorias WHERE idCategoria = ? AND login_id = ?";
    const [rows] = await db.execute<ResultSetHeader>(sql, [id, idUsuarioLogado]);
    return rows;
  }
}
