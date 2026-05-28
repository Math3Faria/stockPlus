import { db } from "../database/connection.database";
import { ResultSetHeader } from "mysql2";
import { UsuarioDB, UsuarioCreateDTO, UsuarioUpdateDTO } from "../models/usuario.model";

export class UsuarioRepository {

  async selectAll(): Promise<UsuarioDB[]> {
    const sql = "SELECT * FROM usuarios";
    const [rows] = await db.execute<UsuarioDB[]>(sql);
    return rows;
  }


  async selectById(id: number): Promise<UsuarioDB | null> {
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
    const values = [id];
    const [rows] = await db.execute<UsuarioDB[]>(sql, values);
    return rows[0] || null;
  }

  async selectBySenha(senha: string): Promise<UsuarioDB | null> {
    const sql = "SELECT * FROM usuarios WHERE senha = ?";
    const values = [senha];
    const [rows] = await db.execute<UsuarioDB[]>(sql, values);
    return rows[0] || null;
  }

  async selectByEmail(email: string): Promise<UsuarioDB | null> {
    const sql = "SELECT * FROM usuarios WHERE email = ?";
    const values = [email];
    const [rows] = await db.execute<UsuarioDB[]>(sql, values);
    return rows[0] || null;
  }

  async selectByName(nome: string): Promise<UsuarioDB | null> {
    const sql = "SELECT * FROM usuarios WHERE nome = ?";
    const values = [nome];
    const [rows] = await db.execute<UsuarioDB[]>(sql, values);
    return rows[0];
  }

  async insert(usuario: UsuarioCreateDTO): Promise<number> {
    const sql = `INSERT INTO usuarios (nome, email, senha)VALUES (?, ?, ?)`;
    const values = [usuario.nome, usuario.email, usuario.senha];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async update(id: number, data: UsuarioUpdateDTO): Promise<ResultSetHeader> {
    const campos: string[] = [];
    const values: any[] = [];

    if (data.nome) {
      campos.push("nome = ?");
      values.push(data.nome);
    }

    if (data.email) {
      campos.push("email = ?");
      values.push(data.email);
    }

    if (data.senha) {
      campos.push("senha = ?");
      values.push(data.senha);
    }

    if (data.status) {
      campos.push("status = ?");
      values.push(data.status);
    }

    if (campos.length === 0) {
      throw new Error("Nenhum campo para atualizar");
    }

    const sql = `
      UPDATE usuarios 
      SET ${campos.join(", ")}
      WHERE id_usuario = ?
    `;

    values.push(id);

    const [result] = await db.execute<ResultSetHeader>(sql, values);
    return result;
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    const values = [id];
    const [result] = await db.execute<ResultSetHeader>(sql, values);
    return result;
  }
}