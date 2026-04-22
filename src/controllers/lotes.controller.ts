import { Request, Response } from "express";
import { LotesService } from "../services/lotes.service";

export class LotesController {
    constructor(private _service = new LotesService()) {}

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const lotes = await this._service.selecionarTodos();

            return res.status(200).json({ lotes });
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
                quantidadeEntrada,
                dataValidade
            } = req.body;

            if (
                !idProduto ||
                !quantidadeEntrada ||
                !dataValidade
            ) {
                return res.status(400).json({
                    message: "Preencha todos os campos"
                });
            }

            const novo = await this._service.criar(
                Number(idProduto),
                Number(quantidadeEntrada),
                new Date(dataValidade)
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
            const idLote = Number(req.params.id);

            const {
                idProduto,
                quantidadeEntrada,
                dataValidade
            } = req.body;

            if (!idLote || isNaN(idLote)) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const alterado = await this._service.editar(
                idLote,
                Number(idProduto),
                Number(quantidadeEntrada),
                new Date(dataValidade)
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
            const idLote = Number(req.params.id);

            if (!idLote || isNaN(idLote)) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const deletado = await this._service.deletar(idLote);

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
            const idLote = Number(req.params.id);

            if (!idLote || isNaN(idLote)) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const lote = await this._service.selecionaById(idLote);

            if (!lote) {
                return res.status(404).json({
                    message: "Lote não encontrado"
                });
            }

            return res.status(200).json({ lote });
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