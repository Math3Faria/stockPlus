import { Request, Response } from "express";
import { FornecedorService } from "../services/fornecedores.service";

export class FornecedorController {

  constructor(private service = new FornecedorService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({ message: "ID inválido" });
        }

        const fornecedor = await this.service.selecionarPorId(idConvertido);

        if (!fornecedor) {
          return res.status(404).json({ message: "Fornecedor não encontrada" });
        }

        return res.status(200).json(fornecedor);
      }

      const fornecedores = await this.service.selecionarTodos();
      return res.status(200).json(fornecedores);

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  inserir = async (req: Request, res: Response) => {
    try {
      const { empresa, email, cnpj } = req.body;

      const id = await this.service.inserir(empresa, email, cnpj);

      return res.status(201).json({
        message: "Fornecedor criado com sucesso",
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
      const { empresa, email, cnpj } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      await this.service.atualizar(id, empresa, email, cnpj);

      return res.status(200).json({ message: "Forncedor atualizado com sucesso" });

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

      return res.status(200).json({ message: "Fornecedor deletado com sucesso" });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }
}