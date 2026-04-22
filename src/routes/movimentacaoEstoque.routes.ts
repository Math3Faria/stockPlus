import { Router } from "express";
import { MovimentacaoController } from "../controllers/movimentacaoEstoque.controller";

const movimentacaoRouter = Router();
const movimentacaoController = new MovimentacaoController();

movimentacaoRouter.post("/movimentacoes", movimentacaoController.criar);
movimentacaoRouter.get("/movimentacoes", movimentacaoController.listar);
movimentacaoRouter.get("/movimentacoes/:id", movimentacaoController.buscarPorId);

export default movimentacaoRouter;