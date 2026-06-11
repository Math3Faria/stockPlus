import { ProdutoRepository } from "../repository/produto.repository";
import { EstoqueRepository } from "../repository/estoque.repository";
import { MovimentacaoRepository } from "../repository/movimentacaoEstoque.repository";
import { Produto } from "../models/produto.model";
import fs from "fs";
import path from "path";

export class ProdutoService {
  constructor(
    private _repository = new ProdutoRepository(),
    private _estoqueRepository = new EstoqueRepository(),
    private _movimentacaoRepository = new MovimentacaoRepository()
  ) { }

  async selecionarTodos(idUsuarioLogado: number) {
    return this._repository.findAll();
  }

  async criar(
    nomeProduto: string,
    valor: number,
    idCategoria: number,
    idFornecedor: number,
    imagemProduto: string,
    quantidade: number,
    qtdMax: number,
    qtdMin: number,
    dataVencimento: Date,
    idUsuarioLogado: number
  ) {
    const produto = Produto.criar(nomeProduto, valor, idCategoria, idFornecedor, imagemProduto, quantidade, qtdMax, qtdMin, dataVencimento);

    const resultadoProduto = await this._repository.create({
      nomeProduto: produto.nomeProduto,
      valor: produto.valor,
      idCategoria: produto.idCategoria,
      idFornecedor: produto.idFornecedor,
      imagemProduto: produto.imagemProduto,
      quantidade: produto.quantidade,
      qtdMax: produto.qtdMax,
      qtdMin: produto.qtdMin,
      dataVencimento: produto.dataVencimento
    }, idUsuarioLogado);

    const idNovoProduto = resultadoProduto.insertId;

    await this._estoqueRepository.create({
      idProduto: idNovoProduto,
      qtdAtual: 0,
      qtdMinima: produto.qtdMin,
      qtdMaxima: produto.qtdMax
    }, idUsuarioLogado);

    await this._movimentacaoRepository.insert({
      idProduto: idNovoProduto,
      tipo: 'ENTRADA',
      quantidade: produto.quantidade,
      dataValidade: produto.dataVencimento,
      descricao: 'Lote inicial gerado no cadastro automático do produto.'
    } as any, idUsuarioLogado);

    return resultadoProduto;
  }

  async editar(
    idProduto: number,
    nomeProduto: string,
    valor: number,
    idCategoria: number,
    idFornecedor: number,
    imagemProduto: string,
    quantidade: number,
    qtdMax: number,
    qtdMin: number,
    dataVencimento: Date,
    idUsuarioLogado: number
  ) {
    const produto = Produto.editar(idProduto, nomeProduto, valor, idCategoria, idFornecedor, imagemProduto, quantidade, qtdMax, qtdMin, dataVencimento);

    return this._repository.update(idProduto, {
      nomeProduto: produto.nomeProduto,
      valor: produto.valor,
      idCategoria: produto.idCategoria,
      idFornecedor: produto.idFornecedor,
      imagemProduto: produto.imagemProduto,
      quantidade: produto.quantidade,
      qtdMax: produto.qtdMax,
      qtdMin: produto.qtdMin,
      dataVencimento: produto.dataVencimento
    }, idUsuarioLogado);
  }

  async deletar(idProduto: number, idUsuarioLogado: number) {
    const produtoExistente = await this._repository.findById(idProduto, idUsuarioLogado);

    if (!produtoExistente) {
      return { affectedRows: 0 };
    }

    const resultadoExclusao = await this._repository.delete(idProduto, idUsuarioLogado);

    if (resultadoExclusao.affectedRows > 0 && produtoExistente.imagemProduto) {
      const caminhoImagem = path.resolve(__dirname, "../../uploads", produtoExistente.imagemProduto);

      if (fs.existsSync(caminhoImagem)) {
        fs.unlinkSync(caminhoImagem);
      }
    }

    return resultadoExclusao;
  }

  async selecionaById(idProduto: number, idUsuarioLogado: number) {
    return this._repository.findById(idProduto, idUsuarioLogado);
  }
}
