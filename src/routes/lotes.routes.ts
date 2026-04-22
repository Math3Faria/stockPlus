import { Router } from "express";
import { LotesController } from "../controllers/lotes.controller";

const lotesRoutes = Router();
const lotesController = new LotesController();

lotesRoutes.post("/lotes", lotesController.criar);
lotesRoutes.get("/lotes", lotesController.selecionarTodos);
lotesRoutes.get("/lotes/:id", lotesController.selecionaById);
lotesRoutes.put("/lotes/:id", lotesController.editar);
lotesRoutes.delete("/lotes/:id", lotesController.deletar);

export default lotesRoutes;