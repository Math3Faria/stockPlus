import { Router } from "express";
import { ItensFornecedoresController } from "../controllers/itensFornecedores.controller";

const itensFornecedorescontroller = new ItensFornecedoresController();
const itensFornecedoresroutes = Router();

itensFornecedoresroutes.post("/itensFornecedores", itensFornecedorescontroller.criar);
itensFornecedoresroutes.get("/itensFornecedores", itensFornecedorescontroller.listar);
itensFornecedoresroutes.patch("/itensFornecedores", itensFornecedorescontroller.atualizar);
itensFornecedoresroutes.delete("/itensFornecedores", itensFornecedorescontroller.deletar);


export default itensFornecedoresroutes;