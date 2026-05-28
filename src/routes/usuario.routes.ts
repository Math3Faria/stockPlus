import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

usuarioRoutes.get("/usuarios", usuarioController.selecionaTodos);
usuarioRoutes.post("/usuarios", usuarioController.criarUsuario);
usuarioRoutes.post("/usuarios/login", usuarioController.login);
usuarioRoutes.patch("/usuarios/:id", usuarioController.editarUsuario);
usuarioRoutes.delete("/usuarios/:id", usuarioController.deletarUsuario);

export default usuarioRoutes;
