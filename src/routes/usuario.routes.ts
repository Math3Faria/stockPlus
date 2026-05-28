import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const usuarioRoutes = Router();
const usuarioController = new UsuarioController();
const authInstance = new AuthMiddleware();

usuarioRoutes.get("/usuarios", authInstance.authenticate, usuarioController.selecionaTodos);
usuarioRoutes.patch("/usuarios/:id", authInstance.authenticate, usuarioController.editarUsuario);
usuarioRoutes.delete("/usuarios/:id", authInstance.authenticate, usuarioController.deletarUsuario);

usuarioRoutes.post("/usuarios", usuarioController.criarUsuario);
usuarioRoutes.post("/usuarios/login", usuarioController.login);

export default usuarioRoutes;
