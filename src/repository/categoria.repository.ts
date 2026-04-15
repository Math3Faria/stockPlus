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
        const sql = "SELECT * FROM categorias WHERE id_categoria=?";
        const values = [id];
        const [rows] = await db.execute<iCategoria[]>(sql, values);
        return rows[0];
    }


    async insert(nome: string): Promise<number> {
        const sql = "INSERT INTO categorias (nome) VALUES (?)";
        const values = [nome];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows.insertId;
    }


    async update(id: number, nome: string): Promise<ResultSetHeader> {
        const sql = "UPDATE categorias SET nome=? WHERE id_categoria=?";
        const values = [nome, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }


    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM categorias WHERE id_categoria=?";
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}
