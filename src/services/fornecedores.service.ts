import { ResultSetHeader } from "mysql2";
import { FornecedorRepository } from "../repository/fornecedores.repository";
import { iFornecedor } from "../models/fornecedores.model";

export class FornecedorService {

  constructor(private repository = new FornecedorRepository()) { }

  async selecionarTodos(): Promise<iFornecedor[]> {
    return await this.repository.selectAll();
  }

  async selecionarPorId(id: number): Promise<iFornecedor | null> {
    return await this.repository.selectById(id);
  }

  async inserir(
    empresa: string,
    email: string,
    cnpj: string,
  ): Promise<number> {
    if (!cnpj) {
      throw new Error("CNPJ deve ser preenchido");
    }

    if (cnpj.length !== 14) {
      throw new Error("CNPJ deve ter 14 caracteres");
    }

    return await this.repository.insert(empresa.trim(), email, cnpj);
  }

  async atualizar(
    id: number,
    empresa: string,
    email: string,
    cnpj: string
  ): Promise<ResultSetHeader> {

    const result = await this.repository.update(id, empresa.trim(), email, cnpj);

    if (result.affectedRows === 0) {
      throw new Error("Fornecedor não encontrado");
    }

    return result;
  }

  async deletar(id: number): Promise<ResultSetHeader> {
    // Impede exclusão de categorias padrão do sistema
    const fornecedorAtual = await this.repository.selectById(id);
    if (!fornecedorAtual) {
      throw new Error("Fornecedor não encontrada");
    }

    const result = await this.repository.delete(id);

    if (result.affectedRows === 0) {
      throw new Error("Fornecedor não encontrada");
    }

    return result;
  }
}