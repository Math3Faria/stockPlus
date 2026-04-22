import { ProdutoRepository } from "../repository/produto.repository";
import { Produto } from "../models/produto.model";

export class ProdutoService {
    constructor(private _repository = new ProdutoRepository()) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(
        nomeProduto: string,
        valor: number,
        idCategoria: number,
        idFornecedor: number,
        imagemProduto: string
    ) {
        const produto = Produto.criar(
            nomeProduto,
            valor,
            idCategoria,
            idFornecedor,
            imagemProduto
        );

        return await this._repository.create(produto);
    }

    async editar(
        idProduto: number,
        nomeProduto: string,
        valor: number,
        idCategoria: number,
        idFornecedor: number,
        imagemProduto: string
    ) {
        const produto = Produto.editar(
            idProduto,
            nomeProduto,
            valor,
            idCategoria,
            idFornecedor,
            imagemProduto
        );

        return await this._repository.update(idProduto, produto);
    }

    async deletar(idProduto: number) {
        return await this._repository.delete(idProduto);
    }

    async selecionaById(idProduto: number) {
        return await this._repository.findById(idProduto);
    }

    async selecionaByNome(nomeProduto: string) {
        return await this._repository.findByName(nomeProduto);
    }

    async selecionaAbc() {
        return await this._repository.findAlfabetic();
    }
}