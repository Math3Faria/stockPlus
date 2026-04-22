import { Request, Response } from "express";
import { MovimentacaoService } from "../services/movimentacaoEstoque.service";

export class MovimentacaoController {

  constructor(private service = new MovimentacaoService()) {}

  criar = async (req: Request, res: Response) => {
    try {
      const id = await this.service.criar(req.body);

      return res.status(201).json({
        message: "Movimentação criada com sucesso",
        id
      });

    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };

  listar = async (_: Request, res: Response) => {
    const dados = await this.service.listar();
    return res.json(dados);
  };

  buscarPorId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const dados = await this.service.buscarPorId(id);
      return res.json(dados);

    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  };
}