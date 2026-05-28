import { Request, Response } from "express";
import { FornecedorService } from "../services/fornecedores.service";

export class FornecedorController {

  constructor(private service = new FornecedorService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const idUsuarioLogado = (req as any).user?.login_id;
      if (!idUsuarioLogado) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const { id } = req.params;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({ message: "ID inválido" });
        }

        const fornecedor = await this.service.selecionarPorId(idConvertido, idUsuarioLogado);

        if (!fornecedor) {
          return res.status(404).json({ message: "Fornecedor não encontrada ou você não tem permissão" });
        }

        return res.status(200).json(fornecedor);
      }

      const fornecedores = await this.service.selecionarTodos(idUsuarioLogado);
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
      const idUsuarioLogado = (req as any).user?.login_id;
      if (!idUsuarioLogado) return res.status(401).json({ message: "Usuário não autenticado." });

      const { empresa, email, cnpj } = req.body;

      const id = await this.service.inserir(empresa, email, cnpj, idUsuarioLogado);

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
      const idUsuarioLogado = (req as any).user?.login_id;
      if (!idUsuarioLogado) return res.status(401).json({ message: "Usuário não autenticado." });

      const id = Number(req.params.id);
      const { empresa, email, cnpj } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const fornecedorAtual = await this.service.selecionarPorId(id, idUsuarioLogado);
      if (!fornecedorAtual) {
        return res.status(403).json({ message: "Você não tem permissão para alterar este fornecedor" });
      }

      await this.service.atualizar(id, empresa, email, cnpj, idUsuarioLogado);

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
      const idUsuarioLogado = (req as any).user?.login_id;
      if (!idUsuarioLogado) return res.status(401).json({ message: "Usuário não autenticado." });

      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const fornecedorAtual = await this.service.selecionarPorId(id, idUsuarioLogado);
      if (!fornecedorAtual) {
        return res.status(403).json({ message: "Você não tem permissão para deletar este fornecedor" });
      }

      await this.service.deletar(id, idUsuarioLogado);

      return res.status(200).json({ message: "Fornecedor deletado com sucesso" });

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }
}
