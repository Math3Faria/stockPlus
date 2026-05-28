import { ResultSetHeader } from "mysql2";
import { CategoriaRepository } from "../repository/categoria.repository";
import { iCategoria } from "../models/categoria.model";

export class CategoriaService {

  constructor(private repository = new CategoriaRepository()) { }

  async selecionarTodos(idUsuarioLogado: number): Promise<iCategoria[]> {
    return await this.repository.selectAll(idUsuarioLogado);
  }

  async selecionarPorId(id: number, idUsuarioLogado: number): Promise<iCategoria | null> {
    return await this.repository.selectById(id, idUsuarioLogado);
  }

  async inserir(descricao: string, idUsuarioLogado: number): Promise<number> {
    if (!descricao || descricao.trim().length < 3) {
      throw new Error("Descrição da categoria deve ter pelo menos 3 caracteres");
    }

    if (descricao.trim().length > 100) {
      throw new Error("Descrição da categoria deve ter no máximo 100 caracteres");
    }

    return await this.repository.insert(descricao.trim(), idUsuarioLogado);
  }

  async atualizar(id: number, descricao: string, idUsuarioLogado: number): Promise<ResultSetHeader> {
    if (!descricao || descricao.trim().length < 3) {
      throw new Error("Descrição da categoria deve ter pelo menos 3 caracteres");
    }

    if (descricao.trim().length > 100) {
      throw new Error("Descrição da categoria deve ter no máximo 100 caracteres");
    }

    const result = await this.repository.update(id, descricao.trim(), idUsuarioLogado);

    if (result.affectedRows === 0) {
      throw new Error("Categoria não encontrada ou você não tem permissão");
    }

    return result;
  }

  async deletar(id: number, idUsuarioLogado: number): Promise<ResultSetHeader> {
    const categoriaAtual = await this.repository.selectById(id, idUsuarioLogado);
    if (!categoriaAtual) {
      throw new Error("Categoria não encontrada ou você não tem permissão");
    }

    const result = await this.repository.delete(id, idUsuarioLogado);

    if (result.affectedRows === 0) {
      throw new Error("Categoria não encontrada ou você não tem permissão");
    }

    return result;
  }
}
