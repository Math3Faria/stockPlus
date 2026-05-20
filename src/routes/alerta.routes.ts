import { Router } from "express";
import { AlertaController } from "../controllers/alerta.controller";

const alertaRoutes = Router();
const controller = new AlertaController();

alertaRoutes.get("/alertas", controller.selecionarTodos);

export default alertaRoutes;
