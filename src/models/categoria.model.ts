import { RowDataPacket } from "mysql2";


export interface iCategoria extends RowDataPacket {
    id_categoria?: number;
    nome?: string;
}


export class Categoria {
    private _id_categoria?: number;
    private _nome: string = '';


    constructor(nome: string, id?: number) {
        this.Nome = nome;
        this._id_categoria = id;
    }


    // Getters
    public get Id(): number | undefined {
        return this._id_categoria;
    }


    public get Nome(): string {
        return this._nome;
    }


    // Setters
    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }


    // Factory
    public static criar(nome: string): Categoria {
        return new Categoria(nome);
    }


    public static editar(nome: string, id: number): Categoria {
        return new Categoria(nome, id);
    }


    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome da categoria deve ter pelo menos 3 caracteres");
        }


        if (value.trim().length > 100) {
            throw new Error("Nome da categoria deve ter no máximo 100 caracteres");
        }
    }
}
