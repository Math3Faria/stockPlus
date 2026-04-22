import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iCategoria } from "../models/categoria.model";

export class CategoriaRepository {

  async selectAll(): Promise<iCategoria[]> {
    const sql = "SELECT * FROM categorias";
    const [rows] = await db.execute<iCategoria[]>(sql);
    return rows;
  }

  async selectById(id: number): Promise<iCategoria | null> {
    const sql = "SELECT * FROM categorias WHERE idCategoria = ?";
    const [rows] = await db.execute<iCategoria[]>(sql, [id]);
    return rows[0];
  }

  async insert(
    descricao: string
  ): Promise<number> {
    const sql = "INSERT INTO categorias (descricao) VALUES (?)";
    const values = [descricao];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async update(
    id: number,
    descricao: string
  ): Promise<ResultSetHeader> {
    const sql = "UPDATE categorias SET descricao = ? WHERE idCategoria = ?";
    const values = [descricao, id];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM categorias WHERE idCategoria = ?";
    const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
    return rows;
  }
}