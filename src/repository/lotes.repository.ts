import { db } from "../database/connection.database";
import { ILote } from "../models/lotes.model";
import { ResultSetHeader } from "mysql2/promise";

export class LotesRepository {
    async findAll(idUsuarioLogado: number): Promise<ILote[]> {
        const [rows] = await db.execute<ILote[]>(
            "SELECT * FROM Lotes WHERE login_id = ?;",
            [idUsuarioLogado]
        );
        return rows;
    }

    async create(dados: Omit<ILote, 'idLote'>, idUsuarioLogado: number): Promise<ResultSetHeader> {
        const sql = `
            INSERT INTO Lotes
            (idProduto, quantidadeEntrada, dataValidade, login_id)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            dados.idProduto,
            dados.quantidadeEntrada,
            dados.dataValidade,
            idUsuarioLogado
        ];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(
        idLote: number,
        dados: Omit<ILote, 'idLote'>,
        idUsuarioLogado: number
    ): Promise<ResultSetHeader> {
        const sql = `
            UPDATE Lotes
            SET idProduto = ?, quantidadeEntrada = ?, dataValidade = ?
            WHERE idLote = ? AND login_id = ?
        `;

        const values = [
            dados.idProduto,
            dados.quantidadeEntrada,
            dados.dataValidade,
            idLote,
            idUsuarioLogado
        ];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(idLote: number, idUsuarioLogado: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM Lotes WHERE idLote = ? AND login_id = ?;";
        const [rows] = await db.execute<ResultSetHeader>(sql, [idLote, idUsuarioLogado]);
        return rows;
    }

    async findById(idLote: number, idUsuarioLogado: number): Promise<ILote | undefined> {
        const sql = "SELECT * FROM Lotes WHERE idLote = ? AND login_id = ?;";
        const [rows] = await db.execute<ILote[]>(sql, [idLote, idUsuarioLogado]);
        return rows[0];
    }
}
