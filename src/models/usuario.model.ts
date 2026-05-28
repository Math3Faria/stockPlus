import { RowDataPacket } from "mysql2";

export interface UsuarioDB extends RowDataPacket {
  idusuario?: number;
  nome: string;
  email: string;
  senha: string;
  status?: 'ativo' | 'inativo';
  datacadastro?: Date;
}

export interface UsuarioCreateDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface UsuarioUpdateDTO {
  nome?: string;
  email?: string;
  senha?: string;
  status?: 'ativo' | 'inativo';
}

export class Usuario {
  private id?: number;
  private nome!: string;
  private email!: string;
  private senha!: string;
  private status: 'ativo' | 'inativo' = 'ativo';

  constructor(nome: string, email: string, senha: string, id?: number) {
    this.Nome = nome;
    this.Email = email;
    this.Senha = senha;
    this.id = id;
  }

  get Id() { return this.id; }
  get Nome() { return this.nome; }
  get Email() { return this.email; }
  get Senha() { return this.senha; }
  get Status() { return this.status; }

  set Nome(value: string) {
    if (!value || value.length < 3) {
      throw new Error("Nome inválido");
    }
    this.nome = value;
  }

  set Email(value: string) {
    if (!value.includes("@")) {
      throw new Error("Email inválido");
    }
    this.email = value;
  }

  set Senha(value: string) {
    if (value.length < 6) {
      throw new Error("Senha deve ter no mínimo 6 caracteres");
    }
    this.senha = value;
  }

  static criar(nome: string, email: string, senha: string) {
    return new Usuario(nome, email, senha);
  }
}