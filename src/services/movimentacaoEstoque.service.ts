import { MovimentacaoRepository } from "../repository/movimentacaoEstoque.repository";
import { iMovimentacaoEstoque } from "../models/movimentacaoEstoque.model";

export class MovimentacaoService {
  constructor(
    private repository = new MovimentacaoRepository()
  ) {}

  async criar(dados: Partial<iMovimentacaoEstoque> & { idFornecedor?: number }, idUsuarioLogado: number): Promise<number> {
    if (!dados.idProduto) {
      throw new Error("Produto obrigatório");
    }

    if (!dados.tipo) {
      throw new Error("Tipo obrigatório");
    }

    if (!["ENTRADA", "SAIDA"].includes(dados.tipo)) {
      throw new Error("Tipo inválido");
    }

    if (!dados.quantidade || dados.quantidade <= 0) {
      throw new Error("Quantidade inválida");
    }

    if (dados.descricao && dados.descricao.length > 150) {
      throw new Error("Descrição excede 150 caracteres");
    }

    const contemPalavraLote = dados.descricao?.toLowerCase().includes("lote");
    
    if (dados.tipo === "ENTRADA" && contemPalavraLote && !dados.idFornecedor) {
      throw new Error("ID do fornecedor é obrigatório para entradas de lote");
    }

    return await this.repository.insert(dados, idUsuarioLogado);
  }

  async listar(idUsuarioLogado: number): Promise<iMovimentacaoEstoque[]> {
    return await this.repository.selectAll(idUsuarioLogado);
  }

  async buscarPorId(id: number, idUsuarioLogado: number): Promise<iMovimentacaoEstoque | null> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }

    const result = await this.repository.selectById(id, idUsuarioLogado);
    
    return result;
  }
}
