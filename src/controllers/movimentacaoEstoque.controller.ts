import { Request, Response } from "express";
import { MovimentacaoService } from "../services/movimentacaoEstoque.service";

export class MovimentacaoController {

  constructor(private service = new MovimentacaoService()) {}

  criar = async (req: Request, res: Response) => {
    try {
      const idUsuarioLogado = (req as any).user?.login_id;
      if (!idUsuarioLogado) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const result = await this.service.criar(req.body, idUsuarioLogado);

      return res.status(201).json({
        message: "Movimentação criada com sucesso",
        idMovimentacao: result
      });

    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Ocorreu um erro no servidor',
          errorMessage: error.message
        });
      }
      return res.status(500).json({
        message: 'Ocorreu um erro no servidor',
        errorMessage: 'Erro desconhecido'
      });
    }
  };

  listar = async (req: Request, res: Response) => {
    try {
      const idUsuarioLogado = (req as any).user?.login_id;
      if (!idUsuarioLogado) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }
    
      const idMovimentacao = req.query.idMovimentacao;

      if (idMovimentacao) {
        const result = await this.service.buscarPorId(Number(idMovimentacao), idUsuarioLogado);

        if (!result) {
          return res.status(404).json({ message: "Movimentação não encontrada ou você não tem permissão" });
        }

        return res.status(200).json({
          movimentacao: result
        });
      }

      const dados = await this.service.listar(idUsuarioLogado);

      return res.status(200).json({
        movimentacoes: dados
      });

    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Ocorreu um erro no servidor',
          errorMessage: error.message
        });
      }
      return res.status(500).json({
        message: 'Ocorreu um erro no servidor',
        errorMessage: 'Erro desconhecido'
      });
    }
  };
}
