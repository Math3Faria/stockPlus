import * as jwt from 'jsonwebtoken';
import 'dotenv/config';


export interface JwtDados{
    login_id: number;
    email: string;
    nome?: string;
}

export class JwtService {
    private readonly secret: string;
    private readonly expiresIn: string;

    constructor(){
        this.secret = process.env.JWT_SECRET || 'default_secret';
        this.expiresIn = process.env.JWT_EXPIRES_IN || ''
    }

    gerarTokenAcesso(dados: JwtDados): string {
        return jwt.sign(dados, this.secret, {
            expiresIn: this.expiresIn as jwt.SignOptions['expiresIn'],
        });
    }

    verificarTokenAcesso(token: string): JwtDados {
        try {
            return jwt.verify(token, this.secret) as JwtDados;
        } catch (error) {
            throw new Error('Token inválido ou expirado');
        }
    }

    decodificarToken(token: string): JwtDados {
        return jwt.decode(token) as JwtDados;
    }
}