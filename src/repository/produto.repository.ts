import { db } from "../database/connection.database";
import { IProduto, IProdutoCreate } from "../models/produto.model";
import { ResultSetHeader } from "mysql2/promise";

export class ProdutoRepository {

    async findAll(): Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>("SELECT * FROM Produtos");
        return rows;
    }

    async create(dados: IProdutoCreate, idUsuarioLogado: number): Promise<ResultSetHeader> {
        const sql = "INSERT INTO Produtos (idCategoria, idFornecedor, nomeProduto, valor, imagemProduto, quantidade, qtdMax, qtdMin, dataVencimento, login_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values: (string | number | Date)[] = [dados.idCategoria, dados.idFornecedor, dados.nomeProduto, dados.valor, dados.imagemProduto, dados.quantidade, dados.qtdMax, dados.qtdMin, dados.dataVencimento, idUsuarioLogado];
        return (await db.execute<ResultSetHeader>(sql, values))[0];
    }

    async update(idProduto: number, dados: IProdutoCreate, idUsuarioLogado: number): Promise<ResultSetHeader> {
        const sql = "UPDATE Produtos SET idCategoria=?, idFornecedor=?, nomeProduto=?, valor=?, imagemProduto=?, quantidade=?, qtdMax=?, qtdMin=?, dataVencimento=? WHERE idProduto=? AND login_id=?";
        const values: (string | number | Date)[] = [dados.idCategoria, dados.idFornecedor, dados.nomeProduto, dados.valor, dados.imagemProduto, dados.quantidade, dados.qtdMax, dados.qtdMin, dados.dataVencimento, idProduto, idUsuarioLogado];
        return (await db.execute<ResultSetHeader>(sql, values))[0];
    }

    async delete(idProduto: number, idUsuarioLogado: number): Promise<ResultSetHeader> {
        return (await db.execute<ResultSetHeader>("DELETE FROM Produtos WHERE idProduto=? AND login_id=?", [idProduto, idUsuarioLogado]))[0];
    }

    async findById(idProduto: number, idUsuarioLogado: number): Promise<IProduto | undefined> {
        const [rows] = await db.execute<IProduto[]>("SELECT * FROM Produtos WHERE idProduto=? AND login_id=?", [idProduto, idUsuarioLogado]);
        return rows[0];
    }
}
