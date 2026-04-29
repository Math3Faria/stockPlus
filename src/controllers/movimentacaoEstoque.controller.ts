import { Request, Response } from "express";
import { MovimentacaoService } from "../services/movimentacaoEstoque.service";

export class MovimentacaoController {

  constructor(private service = new MovimentacaoService()) {}

  criar = async (req: Request, res: Response) => {
    try {
      const result = await this.service.criar(req.body);

      return res.status(201).json({
        message: "Movimentação criada com sucesso",
        data: result
      });

    } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
  };

  listartudo = async (req: Request, res: Response) => {
    try{
    const dados = await this.service.listar();
    const idMovimentacao = req.query.idMovimentacao;
            
            if (idMovimentacao) {
                const result = await this.service.buscarPorId(Number(idMovimentacao));
                return res.status(200).json({ movimentacoes: result });
            }
      return res.json({ movimentacoes: dados });

    } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }

  };

}