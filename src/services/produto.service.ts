import { ProdutoRepository } from "../repository/produto.repository";
import { EstoqueRepository } from "../repository/estoque.repository";
import { LotesRepository } from "../repository/lotes.repository";
import { Produto } from "../models/produto.model";

export class ProdutoService {
    constructor(
        private _repository = new ProdutoRepository(),
        private _estoqueRepository = new EstoqueRepository(),
        private _lotesRepository = new LotesRepository()
    ) {}

    async selecionarTodos() {
        return this._repository.findAll();
    }

    async criar(nomeProduto: string, valor: number, idCategoria: number, idFornecedor: number, imagemProduto: string, quantidade: number, qtdMax: number, qtdMin: number, dataVencimento: Date) {
        const produto = Produto.criar(nomeProduto, valor, idCategoria, idFornecedor, imagemProduto, quantidade, qtdMax, qtdMin, dataVencimento);
        const resultadoProduto = await this._repository.create({ nomeProduto: produto.nomeProduto, valor: produto.valor, idCategoria: produto.idCategoria, idFornecedor: produto.idFornecedor, imagemProduto: produto.imagemProduto, quantidade: produto.quantidade, qtdMax: produto.qtdMax, qtdMin: produto.qtdMin, dataVencimento: produto.dataVencimento });
        const idNovoProduto = resultadoProduto.insertId;
        await this._estoqueRepository.create({ idProduto: idNovoProduto, qtdAtual: produto.quantidade, qtdMinima: produto.qtdMin, qtdMaxima: produto.qtdMax });
        await this._lotesRepository.create({ idProduto: idNovoProduto, quantidadeEntrada: produto.quantidade, dataValidade: produto.dataVencimento });
        return resultadoProduto;
    }

    async editar(idProduto: number, nomeProduto: string, valor: number, idCategoria: number, idFornecedor: number, imagemProduto: string, quantidade: number, qtdMax: number, qtdMin: number, dataVencimento: Date) {
        const produto = Produto.editar(idProduto, nomeProduto, valor, idCategoria, idFornecedor, imagemProduto, quantidade, qtdMax, qtdMin, dataVencimento);
        return this._repository.update(idProduto, { nomeProduto: produto.nomeProduto, valor: produto.valor, idCategoria: produto.idCategoria, idFornecedor: produto.idFornecedor, imagemProduto: produto.imagemProduto, quantidade: produto.quantidade, qtdMax: produto.qtdMax, qtdMin: produto.qtdMin, dataVencimento: produto.dataVencimento });
    }

    async deletar(idProduto: number) {
        return this._repository.delete(idProduto);
    }

    async selecionaById(idProduto: number) {
        return this._repository.findById(idProduto);
    }
}
