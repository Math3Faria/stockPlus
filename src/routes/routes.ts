import { Router } from "express";
import produtoRoutes from "./produto.routes";
import movimentacaoRoutes from "./movimentacaoEstoque.routes";

const router = Router();

router.use(produtoRoutes);
router.use(movimentacaoRoutes);

export default router;