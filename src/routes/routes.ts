import { Router } from "express";
import categoriaRoutes from "./categoria.routes";
import fornecedorRoutes from "./fornecedores.routes";

const router = Router();

router.use('/', categoriaRoutes);
router.use('/', fornecedorRoutes);

export default router;