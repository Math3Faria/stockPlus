import { Router } from "express";
import produtoRoutes from "./produto.routes";
import movimentacaoRoutes from "./movimentacaoEstoque.routes";
import itensFornecedoresRoutes from "./itensFornecedores.routes";

const router = Router();

router.use(produtoRoutes);
router.use(movimentacaoRoutes);
router.use(itensFornecedoresRoutes);

export default router;