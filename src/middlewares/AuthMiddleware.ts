import { Request, Response, NextFunction } from "express";
import { JwtService } from "../utils/JwtServices";

declare global {
    namespace Express {
        interface Request {
            user?: {
                login_id: number;
                email: string;
                nome?: string;
            }
        }
    }
}

export class AuthMiddleware {
    private jwtService: JwtService;
    
    constructor() {
        this.jwtService = new JwtService();
    }
    authenticate = (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Token de acesso ausente ou inválido" });
            return;
        }
        const token = authHeader?.split(" ")[1];
        try {
            const decoded = this.jwtService.verificarTokenAcesso(token);
            req.user = {
                login_id: decoded.login_id,
                email: decoded.email
            };
            next();
        } catch (error) {
            res.status(401).json({ message: "Token invalido ou expirado" });
        }
    }
}