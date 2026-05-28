import { db } from "../database/connection.database";
import { iAlerta } from "../models/alerta.model";
import { ResultSetHeader } from "mysql2/promise";

export class AlertaRepository {
    async findAll(idUsuarioLogado: number): Promise<iAlerta[]> {
        const [rows] = await db.execute<iAlerta[]>(
            "SELECT * FROM Alerta WHERE login_id = ? ORDER BY dataGeracao DESC;",
            [idUsuarioLogado]
        );
        return rows;
    }

    async marcarComoLido(idAlerta: number, idUsuarioLogado: number): Promise<ResultSetHeader> {
        const sql = "UPDATE Alerta SET foiVisualizado = true WHERE idAlerta = ? AND login_id = ?;";
        const [result] = await db.execute<ResultSetHeader>(sql, [idAlerta, idUsuarioLogado]);
        return result;
    }
}
