import { ResultSetHeader } from "mysql2";
import { CategoriaRepository } from "../repository/categoria.repository";
import { iCategoria } from "../models/categoria.model";

export class CategoriaService {

  constructor(private repository = new CategoriaRepository()) { }

  async selecionarTodos(): Promise<iCategoria[]> {
    return await this.repository.selectAll();
  }

  async selecionarPorId(id: number): Promise<iCategoria | null> {
    return await this.repository.selectById(id);
  }

  async inserir(
    descricao: string
  ): Promise<number> {
    if (!descricao || descricao.trim().length < 3) {
      throw new Error("Descrição da categoria deve ter pelo menos 3 caracteres");
    }

    if (descricao.trim().length > 100) {
      throw new Error("Descrição da categoria deve ter no máximo 100 caracteres");
    }

    return await this.repository.insert(descricao.trim());
  }

  async atualizar(
    id: number,
    descricao: string
  ): Promise<ResultSetHeader> {
    if (!descricao || descricao.trim().length < 3) {
      throw new Error("Descrição da categoria deve ter pelo menos 3 caracteres");
    }

    if (descricao.trim().length > 100) {
      throw new Error("Descrição da categoria deve ter no máximo 100 caracteres");
    }

    const result = await this.repository.update(id, descricao.trim());

    if (result.affectedRows === 0) {
      throw new Error("Categoria não encontrada");
    }

    return result;
  }

  async deletar(id: number): Promise<ResultSetHeader> {
    // Impede exclusão de categorias padrão do sistema
    const categoriaAtual = await this.repository.selectById(id);
    if (!categoriaAtual) {
      throw new Error("Categoria não encontrada");
    }

    const result = await this.repository.delete(id);

    if (result.affectedRows === 0) {
      throw new Error("Categoria não encontrada");
    }

    return result;
  }
}