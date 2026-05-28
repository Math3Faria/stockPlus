import { UsuarioRepository } from "../repository/usuario.repository";
import { Usuario, UsuarioDB } from "../models/usuario.model";

export class UsuarioService {

  constructor(private repository = new UsuarioRepository()) { }

  private montarResposta(usuarioDB: UsuarioDB): Usuario {
    return new Usuario(
      usuarioDB.nome,
      usuarioDB.email,
      usuarioDB.senha,
      usuarioDB.id_usuario
    );
  };

  async selecionarTodos() {
    const usuarios = await this.repository.selectAll();
    return usuarios.map(u => this.montarResposta(u));
  };

  async selecionarPorId(id: number) {
    const usuario = await this.repository.selectById(id);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    };

    return this.montarResposta(usuario);
  };
  async selecionarPorNome(nome: string) {
    const usuario = await this.repository.selectByName(nome);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    };

    return this.montarResposta(usuario);
  };
  async selecionarPorSenha(senha: string) {
    const usuario = await this.repository.selectBySenha(senha);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    };

    return this.montarResposta(usuario);
  };


  async selecionarPorEmail(email: string) {
    const usuario = await this.repository.selectByEmail(email);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    };

    return this.montarResposta(usuario);
  };

  async criarUsuario(nome: string, email: string, senha: string) {
    const emailExiste = await this.repository.selectByEmail(email);

    if (emailExiste) {
      throw new Error("Já existe um usuário com esse email");
    };


    const usuario = Usuario.criar(nome, email, senha);

    const result = await this.repository.insert({
      nome: usuario.Nome,
      email: usuario.Email,
      senha: usuario.Senha
    });
    return result;
  };

  async editarUsuario(id: number, nome: string, email: string, senha: string) {
    const existente = await this.repository.selectById(id);

    if (!existente) {
      throw new Error("Usuário não encontrado");
    };

    const usuario = Usuario.criar(nome, email, senha);

    const result = await this.repository.update(id, {
      nome: usuario.Nome,
      email: usuario.Email,
      senha: usuario.Senha
    });

    if (result.affectedRows === 0) {
      throw new Error("Erro ao atualizar usuário");
    };

    return result;
  };

  async deletarUsuario(id: number) {
    const existente = await this.repository.selectById(id);

    if (!existente) {
      throw new Error("Usuário não encontrado");
    };

    const result = await this.repository.delete(id);

    if (result.affectedRows === 0) {
      throw new Error("Erro ao deletar usuário");
    };

    return result;
  };
};