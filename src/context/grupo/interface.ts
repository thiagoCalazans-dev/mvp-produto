import { Dispatch, ReactNode } from "react";
import { IFormGrupo, IGrupo } from "../../interface/Grupo";

export interface IGrupoProviderProps  {
    children: ReactNode;
  };

 export  interface IGrupoContext  {
  selectedData: IGrupo; 
  setSelectedData: (newState:IGrupo ) => void; 
  };