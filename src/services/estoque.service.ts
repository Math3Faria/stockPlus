import { EstoqueRepository } from "../repository/estoque.repository";
import { Estoque } from "../models/estoque.model";

export class EstoqueService {
    constructor(private _repository = new EstoqueRepository()) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(
        idProduto: number,
        qtdAtual: number,
        qtdMinima: number,
        qtdMaxima: number
    ) {
        const estoque = Estoque.criar(
            idProduto,
            qtdAtual,
            qtdMinima,
            qtdMaxima
        );

        return await this._repository.create(estoque);
    }

    async editar(
        idEstoque: number,
        idProduto: number,
        qtdAtual: number,
        qtdMinima: number,
        qtdMaxima: number
    ) {
        const estoque = Estoque.editar(
            idEstoque,
            idProduto,
            qtdAtual,
            qtdMinima,
            qtdMaxima
        );

        return await this._repository.update(idEstoque, estoque);
    }

    async deletar(idEstoque: number) {
        return await this._repository.delete(idEstoque);
    }

    async selecionaById(idEstoque: number) {
        return await this._repository.findById(idEstoque);
    }
}