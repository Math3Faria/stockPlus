import { ResultSetHeader } from "mysql2";
import { CategoriaRepository } from "../repository/categoria.repository";
import { iCategoria } from "../models/categoria.model";


export class CategoriaService {


    constructor(private repository = new CategoriaRepository()) {}


    async selecionarTodos(): Promise<iCategoria[]> {
        return await this.repository.selectAll();
    }


    async selecionarPorId(id: number): Promise<iCategoria | null> {
        return await this.repository.selectById(id);
    }


    async inserir(nome: string): Promise<number> {
        if (!nome || nome.trim() === "") {
            throw new Error("O nome da categoria é obrigatório");
        }
        const result = await this.repository.insert(nome);
        return result;
    }


    async atualizar(id: number, nome: string): Promise<ResultSetHeader> {
        if (!nome || nome.trim() === "") {
            throw new Error("O nome da categoria é obrigatório");
        }
        const result = await this.repository.update(id, nome);
        if (result.affectedRows === 0) {
            throw new Error("Categoria não encontrada");
        }
        return result;
    }


    async deletar(id: number): Promise<ResultSetHeader> {
        const result = await this.repository.delete(id);
        if (result.affectedRows === 0) {
            throw new Error("Categoria não encontrada");
        }
        return result;
    }


}
