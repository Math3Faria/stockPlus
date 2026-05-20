import { MovimentacaoRepository } from "../repository/movimentacaoEstoque.repository";
import { iMovimentacaoEstoque } from "../models/movimentacaoEstoque.model";

export class MovimentacaoService {

    constructor(
        private repository =
            new MovimentacaoRepository()
    ) { }

    async criar(dados: iMovimentacaoEstoque): Promise<number> {

        // Validações obrigatórias

        if (!dados.idProduto) {
            throw new Error(
                "Produto obrigatório"
            );
        }

        if (!dados.tipo) {
            throw new Error(
                "Tipo obrigatório"
            );
        }

        if (
            !["ENTRADA", "SAIDA"]
                .includes(dados.tipo)
        ) {
            throw new Error(
                "Tipo inválido"
            );
        }

        if (
            !dados.quantidade ||
            dados.quantidade <= 0
        ) {
            throw new Error(
                "Quantidade inválida"
            );
        }

        // Validação descrição

        if (
            dados.descricao &&
            dados.descricao.length > 150
        ) {
            throw new Error(
                "Descrição excede 150 caracteres"
            );
        }

        // Trigger do banco atualiza estoque/lotes

        return await this.repository.insert(dados);
    }

    async listar(): Promise<iMovimentacaoEstoque[]> {

        return await this.repository
            .selectAll();
    }

    async buscarPorId(
        id: number
    ): Promise<iMovimentacaoEstoque> {

        if (!id || id <= 0) {
            throw new Error(
                "ID inválido"
            );
        }

        const result =
            await this.repository
                .selectById(id);

        if (!result) {
            throw new Error(
                "Movimentação não encontrada"
            );
        }

        return result;
    }
}