import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { iFornecedor } from "../models/fornecedores.model";

export class FornecedorRepository {

  async selectAll(): Promise<iFornecedor[]> {
    const sql = "SELECT * FROM fornecedores";
    const [rows] = await db.execute<iFornecedor[]>(sql);
    return rows;
  }

  async selectById(id: number): Promise<iFornecedor | null> {
    const sql = "SELECT * FROM fornecedores WHERE idFornecedor = ?";
    const [rows] = await db.execute<iFornecedor[]>(sql, [id]);
    return rows[0];
  }

  async insert(
    empresa: string,
    email: string,
    cnpj: string
  ): Promise<number> {
    const sql = "INSERT INTO fornecedores (empresa, email, cnpj) VALUES (?, ?, ?)";
    const values = [empresa, email, cnpj];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async update(
    id: number,
    empresa: string,
    email: string,
    cnpj:string
  ): Promise<ResultSetHeader> {
    const sql = "UPDATE fornecedores SET empresa = ?, email = ?, cnpj = ? WHERE idFornecedor = ?";
    const values = [empresa, email, cnpj, id];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM fornecedores WHERE idFornecedor = ?";
    const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
    return rows;
  }
}