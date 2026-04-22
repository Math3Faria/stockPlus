import { Router } from "express";
import { EstoqueController } from "../controllers/estoque.controller";

const estoqueRoutes = Router();
const estoqueController = new EstoqueController();

estoqueRoutes.post("/estoque", estoqueController.criar);
estoqueRoutes.get("/estoque", estoqueController.selecionarTodos);
estoqueRoutes.get("/estoque/:id", estoqueController.selecionaById);
estoqueRoutes.put("/estoque/:id", estoqueController.editar);
estoqueRoutes.delete("/estoque/:id", estoqueController.deletar);

export default estoqueRoutes;