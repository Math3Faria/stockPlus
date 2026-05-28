import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.service";

export class CategoriaController {

  constructor(private service = new CategoriaService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const idUsuarioLogado = req.user?.login_id; 
      if (!idUsuarioLogado) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const { id } = req.params;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({ message: "ID inválido" });
        }

        const categoria = await this.service.selecionarPorId(idConvertido, idUsuarioLogado);

        if (!categoria) {
          return res.status(404).json({ message: "Categoria não encontrada ou você não tem permissão" });
        }

        return res.status(200).json(categoria);
      }

      const categorias = await this.service.selecionarTodos(idUsuarioLogado);
      return res.status(200).json(categorias);

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  inserir = async (req: Request, res: Response) => {
    try {
      const idUsuarioLogado = req.user?.login_id;
      if (!idUsuarioLogado) return res.status(401).json({ message: "Usuário não autenticado." });

      const { descricao } = req.body;

      const id = await this.service.inserir(descricao, idUsuarioLogado);

      return res.status(201).json({
        message: "Categoria criada com sucesso",
        id
      });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  atualizar = async (req: Request, res: Response) => {
    try {
      const idUsuarioLogado = req.user?.login_id;
      if (!idUsuarioLogado) return res.status(401).json({ message: "Usuário não autenticado." });

      const id = Number(req.params.id);
      const { descricao } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const categoriaAtual = await this.service.selecionarPorId(id, idUsuarioLogado);
      if (!categoriaAtual) {
        return res.status(403).json({ message: "Você não tem permissão para alterar esta categoria" });
      }

      await this.service.atualizar(id, descricao ?? categoriaAtual.descricao, idUsuarioLogado);

      return res.status(200).json({ message: "Categoria updated com sucesso" });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  deletar = async (req: Request, res: Response) => {
    try {
      const idUsuarioLogado = req.user?.login_id;
      if (!idUsuarioLogado) return res.status(401).json({ message: "Usuário não autenticado." });

      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const categoriaAtual = await this.service.selecionarPorId(id, idUsuarioLogado);
      if (!categoriaAtual) {
        return res.status(403).json({ message: "Você não tem permissão para deletar esta categoria" });
      }

      await this.service.deletar(id, idUsuarioLogado);

      return res.status(200).json({ message: "Categoria deletada com sucesso" });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }
}
