import { Router } from "express";
import { LotesController } from "../controllers/lotes.controller";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const lotesRoutes = Router();
const lotesController = new LotesController();
const authInstance = new AuthMiddleware();

lotesRoutes.post("/lotes", authInstance.authenticate, lotesController.criar);
lotesRoutes.get("/lotes", authInstance.authenticate, lotesController.selecionarTodos);
lotesRoutes.get("/lotes/:id", authInstance.authenticate, lotesController.selecionaById);
lotesRoutes.put("/lotes/:id", authInstance.authenticate, lotesController.editar);
lotesRoutes.delete("/lotes/:id", authInstance.authenticate, lotesController.deletar);

export default lotesRoutes;
