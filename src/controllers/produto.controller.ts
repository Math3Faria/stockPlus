import { Request, Response } from "express";
import { ProdutoService } from "../services/produto.service";

export class ProdutoController {
    constructor(private _service = new ProdutoService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const produtos = await this._service.selecionarTodos();
            return res.status(200).json({ produtos });
        } catch (error: unknown) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error instanceof Error ? error.message : "Erro desconhecido"
            });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const { nomeProduto, valor, idCategoria, idFornecedor } = req.body;

            const valorNum = Number(valor);
            const idCategoriaNum = Number(idCategoria);
            const idFornecedorNum = Number(idFornecedor);

            if (!nomeProduto || !valorNum || !idCategoriaNum || !idFornecedorNum) {
                return res.status(400).json({
                    message: "Preencha todos os campos corretamente"
                });
            }

            const imagemProduto = req.file?.filename || req.body.imagemProduto;

            if (!imagemProduto) {
                return res.status(400).json({
                    message: "Imagem é obrigatória"
                });
            }

            const novo = await this._service.criar(nomeProduto, valorNum, idCategoriaNum, idFornecedorNum, imagemProduto);

            return res.status(201).json({ novo });

        } catch (error: unknown) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error instanceof Error ? error.message : "Erro desconhecido"
            });
        }
    };

    editar = async (req: Request, res: Response) => {
        try {
            const idProduto = Number(req.params.id);

            if (!idProduto || isNaN(idProduto)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const { nomeProduto, valor, idCategoria, idFornecedor } = req.body;

            const valorNum = Number(valor);
            const idCategoriaNum = Number(idCategoria);
            const idFornecedorNum = Number(idFornecedor);

            if (!nomeProduto || !valorNum || !idCategoriaNum || !idFornecedorNum) {
                return res.status(400).json({
                    message: "Preencha todos os campos obrigatórios"
                });
            }

            const imagemProduto = req.file?.filename || req.body.imagemProduto;

            const alterado = await this._service.editar(idProduto, nomeProduto, valorNum, idCategoriaNum, idFornecedorNum, imagemProduto );

            return res.status(200).json({ alterado });

        } catch (error: unknown) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error instanceof Error ? error.message : "Erro desconhecido"
            });
        }
    };

    deletar = async (req: Request, res: Response) => {
        try {
            const idProduto = Number(req.params.id);

            if (!idProduto || isNaN(idProduto)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const deletado = await this._service.deletar(idProduto);

            if (deletado.affectedRows === 0) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            return res.status(200).json({
                message: "Excluído com sucesso"
            });

        } catch (error: unknown) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error instanceof Error ? error.message : "Erro desconhecido"
            });
        }
    };

    selecionaById = async (req: Request, res: Response) => {
        try {
            const idProduto = Number(req.params.id);

            if (!idProduto || isNaN(idProduto)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const produto = await this._service.selecionaById(idProduto);

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            return res.status(200).json({ produto });

        } catch (error: unknown) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor"
            });
        }
    };

    selecionaByNome = async (req: Request, res: Response) => {
        try {
            const { nomeProduto } = req.query;

            if (!nomeProduto) {
                return res.status(400).json({ message: "Informe o nome" });
            }

            const produtos = await this._service.selecionaByNome(String(nomeProduto));

            return res.status(200).json({ produtos });

        } catch (error: unknown) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor"
            });
        }
    };
}