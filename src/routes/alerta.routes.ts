import { Router } from "express";
import { AlertaController } from "../controllers/alerta.controller";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const alertaRoutes = Router();
const controller = new AlertaController();
const authInstance = new AuthMiddleware();

alertaRoutes.get("/alertas", authInstance.authenticate, controller.selecionarTodos);

export default alertaRoutes;
