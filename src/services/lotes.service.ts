import { LotesRepository } from "../repository/lotes.repository";
import { Lote } from "../models/lotes.model";

export class LotesService {
    constructor(private _repository = new LotesRepository()) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(
        idProduto: number,
        quantidadeEntrada: number,
        dataValidade: Date
    ) {
        const lote = Lote.criar(
            idProduto,
            quantidadeEntrada,
            dataValidade
        );

        return await this._repository.create(lote);
    }

    async editar(
        idLote: number,
        idProduto: number,
        quantidadeEntrada: number,
        dataValidade: Date
    ) {
        const lote = Lote.editar(
            idLote,
            idProduto,
            quantidadeEntrada,
            dataValidade
        );

        return await this._repository.update(idLote, lote);
    }

    async deletar(idLote: number) {
        return await this._repository.delete(idLote);
    }

    async selecionaById(idLote: number) {
        return await this._repository.findById(idLote);
    }
}