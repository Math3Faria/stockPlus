import { Router } from "express";
import { MovimentacaoController } from "../controllers/movimentacaoEstoque.controller";


const movimentacaoController = new MovimentacaoController();
const movimentacaoRoutes = Router();

movimentacaoRoutes.post("/movimentacoes", movimentacaoController.criar);
movimentacaoRoutes.get("/movimentacoes", movimentacaoController.listar);
movimentacaoRoutes.get("/movimentacoes/:id", movimentacaoController.buscarPorId);

export default movimentacaoRoutes;