import { Router } from "express";
import { RelatorioController } from "../controllers/relatorio.controller";


const relatorioController = new RelatorioController();
const relatorioRoutes = Router();


relatorioRoutes.get("/relatorio", relatorioController.verTodosRelatorios);


export default relatorioRoutes;