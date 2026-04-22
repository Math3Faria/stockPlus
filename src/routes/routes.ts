import { Router } from "express";
<<<<<<< HEAD
import produtoRoutes from "./produto.routes";
<<<<<<< HEAD
import estoqueRoutes from "./estoque.routes";
import lotesRoutes from "./lotes.routes";
=======
import movimentacaoRoutes from "./movimentacaoEstoque.routes";
>>>>>>> 87655de376508c5804483e208c78156a21d07b50

const router = Router();

router.use(produtoRoutes);
<<<<<<< HEAD
router.use(estoqueRoutes);
router.use(lotesRoutes);
=======
import categoriaRoutes from "./categoria.routes";
import fornecedorRoutes from "./fornecedores.routes";

const router = Router();

router.use('/', categoriaRoutes);
router.use('/', fornecedorRoutes);
>>>>>>> f38bf5c3843a92aa8bd4a5d606e0c4d963aff682
=======
router.use(movimentacaoRoutes);
>>>>>>> 87655de376508c5804483e208c78156a21d07b50

export default router;