import { AlertaRepository } from "../repository/alerta.repository";
import { iAlerta } from "../models/alerta.model";

export class AlertaService {
  constructor(private repository = new AlertaRepository()) {}

  async selecionarTodos(): Promise<iAlerta[]> {
    return await this.repository.findAll();
  }
}
