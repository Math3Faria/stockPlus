import { Router } from "express";
import produtoRoutes from "./produto.routes";

const router = Router();

router.use(produtoRoutes);

export default router;