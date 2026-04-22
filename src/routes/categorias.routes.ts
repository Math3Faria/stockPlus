import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";


const categoriaController = new CategoriaController();
const categoriaRoutes = Router();


categoriaRoutes.get("/categorias", categoriaController.selecionarTodos);
categoriaRoutes.get("/categorias/:id", categoriaController.selecionarTodos);
categoriaRoutes.post("/categorias", categoriaController.inserir);
categoriaRoutes.put("/categorias/:id", categoriaController.atualizar);
categoriaRoutes.delete("/categorias/:id", categoriaController.deletar);


export default categoriaRoutes;
