import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";
import { JwtService } from "../utils/JwtServices";
import bcrypt from 'bcryptjs';

export class UsuarioController {
  private service: UsuarioService;
  private jwtService: JwtService;
  private bcryptRounds: number;

  constructor() {
    this.service = new UsuarioService();
    this.jwtService = new JwtService();
    this.bcryptRounds = Number(process.env.BCRYPT_ROUNDS) || 10;
  }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const usuarios = await this.service.selecionarTodos();
            const idUsuario = req.query.idUsuario;
            const email = req.query.email;
            if (idUsuario) {
                const result = await this.service.selecionarPorId(Number(idUsuario));
                return res.status(200).json({ usuarios: result });
            }
            if (email) {
                const resultEmail = await this.service.selecionarPorEmail(String(email));
                return res.status(200).json({ usuarios: resultEmail });
            }
            return res.status(200).json({ usuarios });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) { return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message }); }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    };

    criarUsuario = async (req: Request, res: Response) => {
        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({ message: "Campos obrigatórios ausentes: nome, email e senha devem ser preenchidos." });
            }

            const senha_hash = await bcrypt.hash(senha, this.bcryptRounds);
            const novo = await this.service.criarUsuario(nome, email, senha_hash);

            return res.status(201).json({ message: "Usuário criado com sucesso", result: novo });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) { return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message }); }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    };

    editarUsuario = async (req: Request, res: Response) => {
        try {
            const idUsuario = Number(req.params.id);
            const { nome, email, senha } = req.body;

            if (isNaN(idUsuario)) { return res.status(400).json({ message: "ID inválido" }); }
            if (!nome || !email || !senha) {
                return res.status(400).json({ message: "Campos obrigatórios ausentes: nome, email e senha devem ser preenchidos." });
            }

            const senha_hash = await bcrypt.hash(senha, this.bcryptRounds);
            const alterado = await this.service.editarUsuario(idUsuario, nome, email, senha_hash);

            return res.status(200).json({ message: "Atualizado com sucesso", result: alterado });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) { return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message }); }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    };

    deletarUsuario = async (req: Request, res: Response) => {
        try {
            const idUsuario = Number(req.params.id);
            if (isNaN(idUsuario)) { return res.status(400).json({ message: "ID inválido" }); }
            await this.service.deletarUsuario(idUsuario);
            return res.status(200).json({ message: "Deletado com sucesso" });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) { return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message }); }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    };

  login = async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
      }

      const user = await this.service.selecionarPorEmail(email);

      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
      }

      const senhaMatch = await bcrypt.compare(senha, user.Senha);
      if (!senhaMatch) {
        return res.status(400).json({ message: 'Credenciais inválidas' });
      }

      const payload = { login_id: user.Id!, email: user.Email, nome: user.Nome }; 
      const accessToken = this.jwtService.gerarTokenAcesso(payload);

      return res.status(201).json({
          message: 'Login realizado com sucesso',
          data: {
              expira_em: process.env.JWT_EXPIRES_IN,
              token_acesso: accessToken
          }
      });

    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
      }
      return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
    }
  };
}
