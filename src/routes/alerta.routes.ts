import { Router } from "express";
import { AlertaController } from "../controllers/alerta.controller";

const router = Router();
const controller = new AlertaController();

router.get("/alertas", controller.selecionarTodos);

export default router;
