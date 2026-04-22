import { Request, Response } from "express";
import { ProdutoService } from "../services/produto.service";


export class ProdutoController {
    constructor(private _service = new ProdutoService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const produtos = await this._service.selecionarTodos();
            res.status(200).json({ produtos })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }
    criar = async (req: Request, res: Response) => {
        try {
            const { nomeProd, valor, idCategoria } = req.body;
            const novo = await this._service.criar(nomeProd, valor, idCategoria);
            res.status(201).json({ novo })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    editar = async (req: Request, res: Response) => {
        try {
            const { nomeProd, valor, idCategoria } = req.body;
            const id = Number(req.query.id)
            const alterado = await this._service.editar(id, nomeProd, valor, idCategoria);
            res.status(200).json({ alterado })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    deletar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(400).json({ message: "O id deve ser um número válido" });
            }

            const deletado = await this._service.deletar(id);

            if (deletado.affectedRows === 0) {
                return res.status(404).json({ message: "Registro não encontrado" });
            }

            return res.status(200).json({ message: "Excluído com sucesso", deletado });

        } catch (error: unknown) {
            console.error(error);
            
            
            if(error instanceof Error){
                if (error.name === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(404).json({ message: "Não é possivel excluir pois existe um item da tabela produtos" })
                }
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
                
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor'});
        }

    }

    selecionaById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id)
            const produtosPorId = await this._service.selecionaById(id);
            if (!produtosPorId || !id || id <= 0) {
                throw new Error("O id para deve ser um número válido ou existente");
            }
            res.status(200).json({ produtosPorId })
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    selecionaByNome = async (req: Request, res: Response) => {
        try {
            const { nomeProd } = req.query;
            const produtosPorNome = await this._service.selecionaByNome(String(nomeProd));

            if (!nomeProd || String(nomeProd).trim() === "") {
                return res.status(400).json({ message: "Digite uma descrição de produto" });
            }
            if (!produtosPorNome || (Array.isArray(produtosPorNome) && produtosPorNome.length === 0)) {
                return res.status(404).json({ message: "Não existe esse produto" });
            }

            return res.status(200).json({ produtosPorNome });
        } catch (error) {
        }
    }

    selecionarAlfabeto = async (req: Request, res: Response) => {
        try {
            const produtos = await this._service.selecionaAbc();
            res.status(200).json({ produtos })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }
}
