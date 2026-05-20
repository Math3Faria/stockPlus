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
            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error instanceof Error ? error.message : "Erro desconhecido" });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const { nomeProduto, valor, idCategoria, idFornecedor, quantidade, qtdMax, qtdMin, dataVencimento } = req.body;
            if (!nomeProduto || !valor || !idCategoria || !idFornecedor || quantidade === undefined || qtdMax === undefined || qtdMin === undefined || !dataVencimento) {
                return res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
            }
            const imagemProduto = req.file?.filename;
            if (!imagemProduto) {
                return res.status(400).json({ message: "Imagem do produto é obrigatória" });
            }
            const novo = await this._service.criar(nomeProduto, Number(valor), Number(idCategoria), Number(idFornecedor), imagemProduto, Number(quantidade), Number(qtdMax), Number(qtdMin), new Date(dataVencimento));
            res.status(201).json({ novo });
        } catch (error: unknown) {
            console.error(error);
            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error instanceof Error ? error.message : "Erro desconhecido" });
        }
    };

    editar = async (req: Request, res: Response) => {
        try {
            const { nomeProduto, valor, idCategoria, idFornecedor, quantidade, qtdMax, qtdMin, dataVencimento } = req.body;
            const idProduto = Number(req.query.id);
            if (!idProduto || isNaN(idProduto)) {
                return res.status(400).json({ message: "ID inválido" });
            }
            const imagemProduto = req.file?.filename;
            if (!nomeProduto || !valor || !idCategoria || !idFornecedor || !imagemProduto || quantidade === undefined || qtdMax === undefined || qtdMin === undefined || !dataVencimento) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" });
            }
            const alterado = await this._service.editar(idProduto, nomeProduto, Number(valor), Number(idCategoria), Number(idFornecedor), imagemProduto, Number(quantidade), Number(qtdMax), Number(qtdMin), new Date(dataVencimento));
            res.status(200).json({ alterado });
        } catch (error: unknown) {
            console.error(error);
            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error instanceof Error ? error.message : "Erro desconhecido" });
        }
    };

    deletar = async (req: Request, res: Response) => {
        try {
            const idProduto = Number(req.query.id);
            if (!idProduto || idProduto <= 0 || isNaN(idProduto)) {
                return res.status(400).json({ message: "O id deve ser válido" });
            }
            const deletado = await this._service.deletar(idProduto);
            if (deletado.affectedRows === 0) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }
            return res.status(200).json({ message: "Excluído com sucesso", deletado });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
            }
            return res.status(500).json({ message: "Erro desconhecido" });
        }
    };

    selecionaById = async (req: Request, res: Response) => {
        try {
            const idProduto = Number(req.query.id);
            if (!idProduto || isNaN(idProduto)) {
                return res.status(400).json({ message: "ID inválido" });
            }
            const produto = await this._service.selecionaById(idProduto);
            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }
            res.status(200).json({ produto });
        } catch (error: unknown) {
            console.error(error);
            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error instanceof Error ? error.message : "Erro desconhecido" });
        }
    };
}
