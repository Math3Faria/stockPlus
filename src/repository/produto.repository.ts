import { db } from "../database/connection.database";
import { IProduto, IProdutoCreate } from "../models/produto.model";
import { ResultSetHeader } from "mysql2/promise";

export class ProdutoRepository {

    async findAll(): Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>("SELECT * FROM Produtos");
        return rows;
    }

    async create(dados: IProdutoCreate): Promise<ResultSetHeader> {
        const sql = "INSERT INTO Produtos (idCategoria, idFornecedor, nomeProduto, valor, imagemProduto, quantidade, qtdMax, qtdMin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values: (string | number)[] = [dados.idCategoria, dados.idFornecedor, dados.nomeProduto, dados.valor, dados.imagemProduto, dados.quantidade, dados.qtdMax, dados.qtdMin];
        return (await db.execute<ResultSetHeader>(sql, values))[0];
    }

    async update(idProduto: number, dados: IProdutoCreate): Promise<ResultSetHeader> {
        const sql = "UPDATE Produtos SET idCategoria=?, idFornecedor=?, nomeProduto=?, valor=?, imagemProduto=?, quantidade=?, qtdMax=?, qtdMin=? WHERE idProduto=?";
        const values: (string | number)[] = [dados.idCategoria, dados.idFornecedor, dados.nomeProduto, dados.valor, dados.imagemProduto, dados.quantidade, dados.qtdMax, dados.qtdMin, idProduto];
        return (await db.execute<ResultSetHeader>(sql, values))[0];
    }

    async delete(idProduto: number): Promise<ResultSetHeader> {
        return (await db.execute<ResultSetHeader>("DELETE FROM Produtos WHERE idProduto=?", [idProduto]))[0];
    }

    async findById(idProduto: number): Promise<IProduto | undefined> {
        const [rows] = await db.execute<IProduto[]>("SELECT * FROM Produtos WHERE idProduto=?", [idProduto]);
        return rows[0];
    }
}
