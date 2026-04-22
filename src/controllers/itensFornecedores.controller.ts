import { Request, Response } from "express";
import { ItensFornecedoresService } from "../services/itensFornecedores.service";

export class ItensFornecedoresController {

  constructor(private service = new ItensFornecedoresService()) {}

  criar = async (req: Request, res: Response) => {
    try {
      const { idProduto, idFornecedor } = req.body;

      const result = await this.service.criar(idProduto, idFornecedor);

      res.status(201).json({
        message: "Vínculo criado com sucesso",
        result
      });

    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  listar = async (req: Request, res: Response) => {
    try {
      const { idProduto, idFornecedor } = req.query;

      if (idProduto && idFornecedor) {
        const dados = await this.service.buscarVinculo(
          Number(idProduto),
          Number(idFornecedor)
        );
        return res.json(dados);
      }

      if (idProduto) {
        const dados = await this.service.listarPorProduto(Number(idProduto));
        return res.json(dados);
      }

      if (idFornecedor) {
        const dados = await this.service.listarPorFornecedor(Number(idFornecedor));
        return res.json(dados);
      }

      const dados = await this.service.listarTodos();
      res.json(dados);

    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  atualizar = async (req: Request, res: Response) => {
    try {
      const { idProduto, idFornecedorAntigo, idFornecedorNovo } = req.body;

      const result = await this.service.atualizar(
        idProduto,
        idFornecedorAntigo,
        idFornecedorNovo
      );

      res.json({
        message: "Vínculo atualizado com sucesso",
        result
      });

    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  deletar = async (req: Request, res: Response) => {
    try {
      const { idProduto, idFornecedor } = req.body;

      const result = await this.service.deletar(idProduto, idFornecedor);

      res.json({
        message: "Vínculo removido com sucesso",
        result
      });

    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
}