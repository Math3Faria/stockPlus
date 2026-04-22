import { Router } from "express";
import { FornecedorController } from "../controllers/fornecedores.controller";


const fornecedorController = new FornecedorController();
const fornecedorRoutes = Router();


fornecedorRoutes.get("/fornecedores", fornecedorController.selecionarTodos);
fornecedorRoutes.get("/fornecedores/:id", fornecedorController.selecionarTodos);
fornecedorRoutes.post("/fornecedores", fornecedorController.inserir);
fornecedorRoutes.patch("/fornecedores/:id", fornecedorController.atualizar);
fornecedorRoutes.delete("/fornecedores/:id", fornecedorController.deletar);


export default fornecedorRoutes;

