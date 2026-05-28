import { Router } from "express";
import { MovimentacaoController } from "../controllers/movimentacaoEstoque.controller";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const movimentacaoController = new MovimentacaoController();
const movimentacaoRoutes = Router();
const authInstance = new AuthMiddleware();

movimentacaoRoutes.post("/movimentacoes", authInstance.authenticate, movimentacaoController.criar);
movimentacaoRoutes.get("/movimentacoes", authInstance.authenticate, movimentacaoController.listar);

export default movimentacaoRoutes;
