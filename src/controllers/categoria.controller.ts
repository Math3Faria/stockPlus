import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.service";

export class CategoriaController {

  constructor(private service = new CategoriaService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({ message: "ID inválido" });
        }

        const categoria = await this.service.selecionarPorId(idConvertido);

        if (!categoria) {
          return res.status(404).json({ message: "Categoria não encontrada" });
        }

        return res.status(200).json(categoria);
      }

      const categorias = await this.service.selecionarTodos();
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
      const { descricao } = req.body;

      const id = await this.service.inserir(
        descricao
      );

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
      const id = Number(req.params.id);
      const { descricao } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      await this.service.atualizar(id, descricao);

      return res.status(200).json({ message: "Categoria atualizada com sucesso" });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  deletar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      await this.service.deletar(id);

      return res.status(200).json({ message: "Categoria deletada com sucesso" });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }
}