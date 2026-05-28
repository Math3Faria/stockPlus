import { Router } from "express";
import categoriaRoutes from "./categorias.routes";
import estoqueRoutes from "./estoque.routes";
import fornecedorRoutes from "./fornecedores.routes";
import lotesRoutes from "./lotes.routes";
import movimentacaoRouter from "./movimentacaoEstoque.routes";
import produtoRoutes from "./produto.routes";
import alertaRoutes from "./alerta.routes";
import usuarioRoutes from "./usuario.routes";
import relatorioRoutes from "./relatorio.routes";

const router = Router();

router.use('/', alertaRoutes);
router.use('/', categoriaRoutes);
router.use('/', estoqueRoutes);
router.use('/', fornecedorRoutes);
router.use('/', lotesRoutes);
router.use('/', movimentacaoRouter);
router.use('/', produtoRoutes);
router.use('/', usuarioRoutes);
router.use('/', relatorioRoutes);

export default router;
