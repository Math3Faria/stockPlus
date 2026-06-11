import { db } from "../database/connection.database";
import { IEstoque } from "../models/estoque.model";
import { ResultSetHeader } from "mysql2/promise";

export class EstoqueRepository {
    async findAll(): Promise<IEstoque[]> {
        const [rows] = await db.execute<IEstoque[]>("SELECT * FROM Estoque;");
        return rows;
    }

    async create(dados: Omit<IEstoque, 'idEstoque'>, idUsuarioLogado: number): Promise<ResultSetHeader> {
        const sql = `
            INSERT INTO Estoque
            (idProduto, qtdAtual, qtdMinima, qtdMaxima, login_id)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [dados.idProduto, dados.qtdAtual, dados.qtdMinima, dados.qtdMaxima, idUsuarioLogado];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(
        idEstoque: number,
        dados: Omit<IEstoque, 'idEstoque'>,
        idUsuarioLogado: number
    ): Promise<ResultSetHeader> {
        const sql = `
            UPDATE Estoque
            SET idProduto = ?, qtdAtual = ?, qtdMinima = ?, qtdMaxima = ?
            WHERE idEstoque = ? AND login_id = ?
        `;

        const values = [dados.idProduto, dados.qtdAtual, dados.qtdMinima, dados.qtdMaxima, idEstoque, idUsuarioLogado];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(idEstoque: number, idUsuarioLogado: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM Estoque WHERE idEstoque = ? AND login_id = ?;";
        const [rows] = await db.execute<ResultSetHeader>(sql, [idEstoque, idUsuarioLogado]);
        return rows;
    }

    async findById(idEstoque: number, idUsuarioLogado: number): Promise<IEstoque | undefined> {
        const sql = "SELECT * FROM Estoque WHERE idEstoque = ? AND login_id = ?;";
        const [rows] = await db.execute<IEstoque[]>(sql, [idEstoque, idUsuarioLogado]);
        return rows[0];
    }
}
