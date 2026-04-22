import { Router } from "express";

import produtoRoutes from "./produto.routes";
import estoqueRoutes from "./estoque.routes";
import lotesRoutes from "./lotes.routes";
import movimentacaoRoutes from "./movimentacaoEstoque.routes";
import fornecedorRoutes from "./fornecedores.routes";

const router = Router();

router.use(produtoRoutes);
router.use(estoqueRoutes);
router.use(lotesRoutes);
router.use(movimentacaoRoutes);
router.use(fornecedorRoutes);

export default router;
