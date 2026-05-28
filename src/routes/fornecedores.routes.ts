import { Router } from "express";
import { FornecedorController } from "../controllers/fornecedores.controller";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const fornecedorController = new FornecedorController();
const fornecedorRoutes = Router();
const authInstance = new AuthMiddleware();

fornecedorRoutes.get("/fornecedores", authInstance.authenticate, fornecedorController.selecionarTodos);
fornecedorRoutes.get("/fornecedores/:id", authInstance.authenticate, fornecedorController.selecionarTodos);
fornecedorRoutes.post("/fornecedores", authInstance.authenticate, fornecedorController.inserir);
fornecedorRoutes.patch("/fornecedores/:id", authInstance.authenticate, fornecedorController.atualizar);
fornecedorRoutes.delete("/fornecedores/:id", authInstance.authenticate, fornecedorController.deletar);

export default fornecedorRoutes;
