import { ProdutoRepository } from "../repository/produto.repository";
import { Produto } from "../models/produto.model";

export class ProdutoService {
    constructor(private _repository = new ProdutoRepository()) {}

    async selecionarTodos() {
        return this._repository.findAll();
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

        return this._repository.create({
            nomeProduto: produto.nomeProduto,
            valor: produto.valor,
            idCategoria: produto.idCategoria,
            idFornecedor: produto.idFornecedor,
            imagemProduto: produto.imagemProduto
        });
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

        return this._repository.update(idProduto, {
            nomeProduto: produto.nomeProduto,
            valor: produto.valor,
            idCategoria: produto.idCategoria,
            idFornecedor: produto.idFornecedor,
            imagemProduto: produto.imagemProduto
        });
    }

    async deletar(idProduto: number) {
        return this._repository.delete(idProduto);
    }

    async selecionaById(idProduto: number) {
        return this._repository.findById(idProduto);
    }

    async selecionaByNome(nomeProduto: string) {
        return this._repository.findByName(nomeProduto);
    }

    async selecionaAbc() {
        return this._repository.findAlfabetic();
    }
}