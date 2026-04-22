import { Router } from "express";
import produtoRoutes from "./produto.routes";
import estoqueRoutes from "./estoque.routes";
import lotesRoutes from "./lotes.routes";

const router = Router();

router.use(produtoRoutes);
router.use(estoqueRoutes);
router.use(lotesRoutes);

export default router;