import { Router } from "express";
import { MovimentacaoController } from "../controllers/movimentacaoEstoque.controller";

const router = Router();
const movimentacaoController = new MovimentacaoController();

router.post("/movimentacoes", movimentacaoController.criar);
router.get("/movimentacoes", movimentacaoController.listar);
router.get("/movimentacoes/:id", movimentacaoController.buscarPorId);

export default router;