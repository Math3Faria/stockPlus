import { LotesRepository } from "../repository/lotes.repository";
import { Lote } from "../models/lotes.model";

export class LotesService {
    constructor(private _repository = new LotesRepository()) {}

    async selecionarTodos(idUsuarioLogado: number) {
        return await this._repository.findAll(idUsuarioLogado);
    }

    async criar(
        idProduto: number,
        quantidadeEntrada: number,
        dataValidade: Date,
        idUsuarioLogado: number
    ) {
        const lote = Lote.criar(
            idProduto,
            quantidadeEntrada,
            dataValidade
        );

        return await this._repository.create(lote, idUsuarioLogado);
    }

    async editar(
        idLote: number,
        idProduto: number,
        quantidadeEntrada: number,
        dataValidade: Date,
        idUsuarioLogado: number
    ) {
        const lote = Lote.editar(
            idLote,
            idProduto,
            quantidadeEntrada,
            dataValidade
        );

        return await this._repository.update(idLote, lote, idUsuarioLogado);
    }

    async deletar(idLote: number, idUsuarioLogado: number) {
        return await this._repository.delete(idLote, idUsuarioLogado);
    }

    async selecionaById(idLote: number, idUsuarioLogado: number) {
        return await this._repository.findById(idLote, idUsuarioLogado);
    }
}
