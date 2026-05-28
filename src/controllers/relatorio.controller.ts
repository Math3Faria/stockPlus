import { Request, Response } from "express";
import { RelatorioService } from "../services/relatorio.service";


export class RelatorioController {

  constructor(private service = new RelatorioService()) { }


  verTodosRelatorios = async (req: Request, res: Response) => {
    try {
      const relatorio = await this.service.verRelatorio();
      return res.status(200).json(relatorio);

    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }
}