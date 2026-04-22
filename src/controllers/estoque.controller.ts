import { Request, Response } from "express";
import { EstoqueService } from "../services/estoque.service";

export class EstoqueController {
    constructor(private _service = new EstoqueService()) {}

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const estoque = await this._service.selecionarTodos();

            return res.status(200).json({ estoque });
        } catch (error: unknown) {
            console.error(error);

            return res.status(500).json({
                message: "Erro no servidor",
                errorMessage:
                    error instanceof Error
                        ? error.message
                        : "Erro desconhecido"
            });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const {
                idProduto,
                qtdAtual,
                qtdMinima,
                qtdMaxima
            } = req.body;

            if (
                !idProduto ||
                !qtdAtual ||
                !qtdMinima ||
                !qtdMaxima
            ) {
                return res.status(400).json({
                    message: "Preencha todos os campos"
                });
            }

            const novo = await this._service.criar(
                Number(idProduto),
                Number(qtdAtual),
                Number(qtdMinima),
                Number(qtdMaxima)
            );

            return res.status(201).json({ novo });
        } catch (error: unknown) {
            console.error(error);

            return res.status(500).json({
                message: "Erro no servidor",
                errorMessage:
                    error instanceof Error
                        ? error.message
                        : "Erro desconhecido"
            });
        }
    };

    editar = async (req: Request, res: Response) => {
        try {
            const idEstoque = Number(req.params.id);

            const {
                idProduto,
                qtdAtual,
                qtdMinima,
                qtdMaxima
            } = req.body;

            if (!idEstoque || isNaN(idEstoque)) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const alterado = await this._service.editar(
                idEstoque,
                Number(idProduto),
                Number(qtdAtual),
                Number(qtdMinima),
                Number(qtdMaxima)
            );

            return res.status(200).json({ alterado });
        } catch (error: unknown) {
            console.error(error);

            return res.status(500).json({
                message: "Erro no servidor",
                errorMessage:
                    error instanceof Error
                        ? error.message
                        : "Erro desconhecido"
            });
        }
    };

    deletar = async (req: Request, res: Response) => {
        try {
            const idEstoque = Number(req.params.id);

            if (!idEstoque || isNaN(idEstoque)) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const deletado = await this._service.deletar(idEstoque);

            return res.status(200).json({
                message: "Excluído com sucesso",
                deletado
            });
        } catch (error: unknown) {
            console.error(error);

            return res.status(500).json({
                message: "Erro no servidor",
                errorMessage:
                    error instanceof Error
                        ? error.message
                        : "Erro desconhecido"
            });
        }
    };

    selecionaById = async (req: Request, res: Response) => {
        try {
            const idEstoque = Number(req.params.id);

            if (!idEstoque || isNaN(idEstoque)) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const estoque = await this._service.selecionaById(idEstoque);

            if (!estoque) {
                return res.status(404).json({
                    message: "Estoque não encontrado"
                });
            }

            return res.status(200).json({ estoque });
        } catch (error: unknown) {
            console.error(error);

            return res.status(500).json({
                message: "Erro no servidor",
                errorMessage:
                    error instanceof Error
                        ? error.message
                        : "Erro desconhecido"
            });
        }
    };
}