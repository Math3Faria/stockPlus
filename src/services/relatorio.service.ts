import { ResultSetHeader } from "mysql2";
import { RelatorioRepository } from "../repository/relatorio.repository"; 


export class RelatorioService {

  constructor(private repository = new RelatorioRepository()) { }


  async verRelatorio(): Promise<any> {
    return await this.repository.viewRelatorio();
  }
}