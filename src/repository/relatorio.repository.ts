import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";


export class RelatorioRepository {

  async viewRelatorio(): Promise<any> {
    const sql = "SELECT * FROM vw_produtos_estoque";
    const [rows] = await db.execute<any>(sql);
    return rows;
  }
}