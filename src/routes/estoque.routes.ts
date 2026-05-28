import { Router } from "express";
import { EstoqueController } from "../controllers/estoque.controller";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const estoqueRoutes = Router();
const estoqueController = new EstoqueController();
const authInstance = new AuthMiddleware();

estoqueRoutes.post("/estoque", authInstance.authenticate, estoqueController.criar);
estoqueRoutes.get("/estoque", authInstance.authenticate, estoqueController.selecionarTodos);
estoqueRoutes.get("/estoque/:id", authInstance.authenticate, estoqueController.selecionaById);
estoqueRoutes.put("/estoque/:id", authInstance.authenticate, estoqueController.editar);
estoqueRoutes.delete("/estoque/:id", authInstance.authenticate, estoqueController.deletar);

export default estoqueRoutes;
