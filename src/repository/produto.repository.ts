import { db } from "../database/connection.database";
import { IProduto } from "../models/produto.model";
import { ResultSetHeader } from "mysql2/promise";

export class ProdutoRepository {

    async findAll(): Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>(
            'SELECT * FROM produtos;'
        );
        return rows;
    }


    
    //omite os campos discriminados
    async create(dados: Omit<IProduto, 'id'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO produtos (nomeProd, valor, idCategoria) VALUES (?,?,?);';
        const values = [dados._nomeProd, dados._valor, dados._idCategoria];
        console.log('Teste TIMEOUT: ', values)
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<IProduto, 'id'>): Promise<ResultSetHeader> {
        const sql = 'UPDATE produtos SET nomeProd=?, valor=?, idCategoria=? WHERE id=?;';
        const values = [dados._nomeProd, dados._valor, dados._idCategoria, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values)
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM produtos WHERE id = ?;';
        const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
        return rows;
    }

    async findById(id: number): Promise<IProduto | undefined> {
        const sql = 'SELECT * FROM produtos WHERE id = ?;';
        const [rows] = await db.execute<IProduto[]>(sql, [id]);
        return rows[0];
    }

    async findByName(nomeProd: string): Promise<IProduto> {
        const sql = 'SELECT * FROM produtos WHERE nomeProd = ?;';
        const [rows] = await db.execute<IProduto[]>(sql, [nomeProd]);
        return rows[0];
    }

    async findAlfabetic(): Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>(
            'SELECT * FROM produtos ORDER BY nomeProd ASC;');
        return rows;
    }



}