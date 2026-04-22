import { ItensFornecedoresRepository } from "../repository/itensFornecedores.repository";
import { iItemFornecedor } from "../models/itensFornecedores.model";
import { ResultSetHeader } from "mysql2";

export class ItensFornecedoresService {

  constructor(private repo = new ItensFornecedoresRepository()) {}

  async criar(idProduto: number, idFornecedor: number): Promise<ResultSetHeader> {

    if (!idProduto || !idFornecedor) {
      throw new Error("Dados obrigatórios");
    }

    return await this.repo.insert(idProduto, idFornecedor);
  }

  async listarTodos(): Promise<iItemFornecedor[]> {
    return await this.repo.selectAll();
  }

  async listarPorProduto(idProduto: number): Promise<iItemFornecedor[]> {

    if (!idProduto) {
      throw new Error("IdProduto obrigatório");
    }

    return await this.repo.selectByProduto(idProduto);
  }

  async listarPorFornecedor(idFornecedor: number): Promise<iItemFornecedor[]> {

    if (!idFornecedor) {
      throw new Error("IdFornecedor obrigatório");
    }

    return await this.repo.selectByFornecedor(idFornecedor);
  }

  async buscarVinculo(
    idProduto: number,
    idFornecedor: number
  ): Promise<iItemFornecedor> {

    if (!idProduto || !idFornecedor) {
      throw new Error("Dados obrigatórios");
    }

    const result = await this.repo.selectByProdutoFornecedor(
      idProduto,
      idFornecedor
    );

    if (!result) {
      throw new Error("Vínculo não encontrado");
    }

    return result;
  }

  async atualizar(
    idProduto: number,
    idFornecedorAntigo: number,
    idFornecedorNovo: number
  ): Promise<ResultSetHeader> {

    if (!idProduto || !idFornecedorAntigo || !idFornecedorNovo) {
      throw new Error("Dados obrigatórios");
    }

    return await this.repo.update(
      idProduto,
      idFornecedorAntigo,
      idFornecedorNovo
    );
  }

  async deletar(
    idProduto: number,
    idFornecedor: number
  ): Promise<ResultSetHeader> {

    if (!idProduto || !idFornecedor) {
      throw new Error("Dados obrigatórios");
    }

    return await this.repo.delete(idProduto, idFornecedor);
  }
}