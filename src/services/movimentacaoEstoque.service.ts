import { MovimentacaoRepository } from "../repository/movimentacaoEstoque.repository";
import { iMovimentacaoEstoque } from "../models/movimentacaoEstoque.model";

export class MovimentacaoService {

    constructor(private repository = new MovimentacaoRepository()) { }

    async criar(dados: iMovimentacaoEstoque): Promise<number> {

        if (!dados.idProduto) {
            throw new Error("Produto obrigatório");
        }

        if (!dados.tipo) {
            throw new Error("Tipo obrigatório");
        }

        if (!dados.idProduto || !dados.tipo || !dados.quantidade) {
            throw new Error("Dados obrigatórios não informados");
        }

        if (!dados.quantidade || dados.quantidade <= 0) {
            throw new Error("Quantidade inválida");
        }

        // Ao inserir uma movimentação, o estoque é atualizado automaticamente
        // por uma trigger no banco de dados

        return await this.repository.insert(dados);
    }

    async listar(): Promise<iMovimentacaoEstoque[]> {
        return await this.repository.selectAll();
    }

    async buscarPorId(id: number) {
        const result = await this.repository.selectById(id);
        if (!result) {
            throw new Error("Movimentação não encontrada");
        }
        return result;
    }
}