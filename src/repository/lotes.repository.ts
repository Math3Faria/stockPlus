import { db } from "../database/connection.database";
import { ILote } from "../models/lotes.model";
import { ResultSetHeader } from "mysql2/promise";

export class LotesRepository {
    async findAll(): Promise<ILote[]> {
        const [rows] = await db.execute<ILote[]>(
            "SELECT * FROM Lotes;"
        );
        return rows;
    }

    async create(dados: Omit<ILote, 'idLote'>): Promise<ResultSetHeader> {
        const sql = `
            INSERT INTO Lotes
            (idProduto, quantidadeEntrada, dataValidade)
            VALUES (?, ?, ?)
        `;

        const values = [
            dados.idProduto,
            dados.quantidadeEntrada,
            dados.dataValidade
        ];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(
        idLote: number,
        dados: Omit<ILote, 'idLote'>
    ): Promise<ResultSetHeader> {
        const sql = `
            UPDATE Lotes
            SET idProduto = ?, quantidadeEntrada = ?, dataValidade = ?
            WHERE idLote = ?
        `;

        const values = [
            dados.idProduto,
            dados.quantidadeEntrada,
            dados.dataValidade,
            idLote
        ];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(idLote: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM Lotes WHERE idLote = ?;";
        const [rows] = await db.execute<ResultSetHeader>(sql, [idLote]);
        return rows;
    }

    async findById(idLote: number): Promise<ILote | undefined> {
        const sql = "SELECT * FROM Lotes WHERE idLote = ?;";
        const [rows] = await db.execute<ILote[]>(sql, [idLote]);
        return rows[0];
    }
}