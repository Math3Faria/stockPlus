import { Request, Response } from "express";
import { AlertaService } from "../services/alerta.service";

export class AlertaController {

  constructor(private service = new AlertaService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const idUsuarioLogado = (req as any).user?.login_id;
      if (!idUsuarioLogado) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const alertas = await this.service.selecionarTodos(idUsuarioLogado);
      return res.status(200).json(alertas);

    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({ 
          message: "Ocorreu um erro no servidor", 
          errorMessage: error.message 
        });
      }
    }
    return res.status(500).json({ 
      message: "Ocorreu um erro no servidor", 
      errorMessage: "Erro desconhecido" 
    });
  }
}
