import { db } from "../database/connection.database";
import { iAlerta } from "../models/alerta.model";
import { ResultSetHeader } from "mysql2/promise";

export class AlertaRepository {
    async findAll(): Promise<iAlerta[]> {
        const [rows] = await db.execute<iAlerta[]>(
            "SELECT * FROM Alerta ORDER BY dataGeracao DESC;"
        );
        return rows;
    }

    async marcarComoLido(idAlerta: number): Promise<ResultSetHeader> {
        const sql = "UPDATE Alerta SET foiVisualizado = true WHERE idAlerta = ?;";
        const [rows] = await db.execute<ResultSetHeader>(sql, [idAlerta]);
        return rows;
    }
}
