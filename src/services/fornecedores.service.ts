import { ResultSetHeader } from "mysql2";
import { FornecedorRepository } from "../repository/fornecedores.repository";
import { iFornecedor } from "../models/fornecedores.model";

export class FornecedorService {

  constructor(private repository = new FornecedorRepository()) { }

  async selecionarTodos(idUsuarioLogado: number): Promise<iFornecedor[]> {
    return await this.repository.selectAll(idUsuarioLogado);
  }

  async selecionarPorId(id: number, idUsuarioLogado: number): Promise<iFornecedor | null> {
    return await this.repository.selectById(id, idUsuarioLogado);
  }

  async inserir(
    empresa: string,
    email: string,
    cnpj: string,
    idUsuarioLogado: number
  ): Promise<number> {
    if (!cnpj) {
      throw new Error("CNPJ deve ser preenchido");
    }

    if (cnpj.length !== 14) {
      throw new Error("CNPJ deve ter 14 caracteres");
    }

    return await this.repository.insert(empresa.trim(), email, cnpj, idUsuarioLogado);
  }

  async atualizar(
    id: number,
    empresa: string,
    email: string,
    cnpj: string,
    idUsuarioLogado: number
  ): Promise<ResultSetHeader> {

    const result = await this.repository.update(id, empresa.trim(), email, cnpj, idUsuarioLogado);

    if (result.affectedRows === 0) {
      throw new Error("Fornecedor não encontrado ou você não tem permissão");
    }

    return result;
  }

  async deletar(id: number, idUsuarioLogado: number): Promise<ResultSetHeader> {
    const fornecedorAtual = await this.repository.selectById(id, idUsuarioLogado);
    if (!fornecedorAtual) {
      throw new Error("Fornecedor não encontrado ou você não tem permissão");
    }

    const result = await this.repository.delete(id, idUsuarioLogado);

    if (result.affectedRows === 0) {
      throw new Error("Fornecedor não encontrado ou você não tem permissão");
    }

    return result;
  }
}
