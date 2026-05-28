import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const categoriaController = new CategoriaController();
const categoriaRoutes = Router();
const authInstance = new AuthMiddleware();

categoriaRoutes.get("/categorias", authInstance.authenticate, categoriaController.selecionarTodos);
categoriaRoutes.get("/categorias/:id", authInstance.authenticate, categoriaController.selecionarTodos);
categoriaRoutes.post("/categorias", authInstance.authenticate, categoriaController.inserir);
categoriaRoutes.put("/categorias/:id", authInstance.authenticate, categoriaController.atualizar);
categoriaRoutes.delete("/categorias/:id", authInstance.authenticate, categoriaController.deletar);

export default categoriaRoutes;
