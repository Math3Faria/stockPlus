import { EstoqueRepository } from "../repository/estoque.repository";
import { Estoque } from "../models/estoque.model";

export class EstoqueService {
    constructor(private _repository = new EstoqueRepository()) {}

    async selecionarTodos(idUsuarioLogado: number) {
        return await this._repository.findAll(idUsuarioLogado);
    }

    async criar(
        idProduto: number,
        qtdAtual: number,
        qtdMinima: number,
        qtdMaxima: number,
        idUsuarioLogado: number
    ) {
        const estoque = Estoque.criar(
            idProduto,
            qtdAtual,
            qtdMinima,
            qtdMaxima
        );

        return await this._repository.create(estoque, idUsuarioLogado);
    }

    async editar(
        idEstoque: number,
        idProduto: number,
        qtdAtual: number,
        qtdMinima: number,
        qtdMaxima: number,
        idUsuarioLogado: number
    ) {
        const estoque = Estoque.editar(
            idEstoque,
            idProduto,
            qtdAtual,
            qtdMinima,
            qtdMaxima
        );

        return await this._repository.update(idEstoque, estoque, idUsuarioLogado);
    }

    async deletar(idEstoque: number, idUsuarioLogado: number) {
        return await this._repository.delete(idEstoque, idUsuarioLogado);
    }

    async selecionaById(idEstoque: number, idUsuarioLogado: number) {
        return await this._repository.findById(idEstoque, idUsuarioLogado);
    }
}
