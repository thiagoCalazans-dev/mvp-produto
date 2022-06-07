import { ReactNode } from "react";
import { IFormGrupo } from "../../interface/Grupo";

export interface IGrupoProviderProps  {
    children: ReactNode;
  };

 export  interface IGrupoContext  {
     postFornecedor: (value: IFormGrupo) => Promise<void>
      setModal: (newState: boolean) => void
     modal: boolean
  };