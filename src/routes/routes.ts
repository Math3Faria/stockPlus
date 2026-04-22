import { Router } from "express";
<<<<<<< HEAD
import produtoRoutes from "./produto.routes";
import estoqueRoutes from "./estoque.routes";
import lotesRoutes from "./lotes.routes";

const router = Router();

router.use(produtoRoutes);
router.use(estoqueRoutes);
router.use(lotesRoutes);
=======
import categoriaRoutes from "./categoria.routes";
import fornecedorRoutes from "./fornecedores.routes";

const router = Router();

router.use('/', categoriaRoutes);
router.use('/', fornecedorRoutes);
>>>>>>> f38bf5c3843a92aa8bd4a5d606e0c4d963aff682

export default router;