import { Router } from 'express';
import { ProdutoController } from '../controllers/produto.controller';
import uploadImage from '../middlewares/uploadImage.middleware';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const produtoRoutes = Router();
const produtoController = new ProdutoController();
const authInstance = new AuthMiddleware();

produtoRoutes.post('/produtos', authInstance.authenticate, uploadImage, produtoController.criar);
produtoRoutes.get('/produtos', authInstance.authenticate, produtoController.selecionarTodos);
produtoRoutes.get('/produtos/:id', authInstance.authenticate, produtoController.selecionaById);
produtoRoutes.put('/produtos/:id', authInstance.authenticate, uploadImage, produtoController.editar);
produtoRoutes.delete('/produtos/:id', authInstance.authenticate, produtoController.deletar);

export default produtoRoutes;
