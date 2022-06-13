import { IGrupo } from "./Grupo";

export interface IProduto {
    id: number,
    grupoId: number,
    codigo: number,
    descricao: string,
    grupo: IGrupo
}

export interface IFormProduto {
    grupoId: number,
    codigo: number,
    descricao: string,
    grupo: IGrupo
}


