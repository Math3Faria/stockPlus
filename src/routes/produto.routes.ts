import { Router } from 'express';
import { ProdutoController } from '../controllers/produto.controller';
import uploadImage from '../middlewares/uploadImage.middleware';

const produtoRoutes = Router();
const produtoController = new ProdutoController();

produtoRoutes.post('/produtos', uploadImage, produtoController.criar);

produtoRoutes.get('/produtos', produtoController.selecionarTodos);

produtoRoutes.get('/produtos/um', produtoController.selecionaById);

produtoRoutes.put('/produtos', uploadImage, produtoController.editar);

produtoRoutes.delete('/produtos', produtoController.deletar);

export default produtoRoutes;