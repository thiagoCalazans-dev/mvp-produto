import { ChangeEvent, ReactNode } from "react";
import { IpropsModal } from "../../hooks/useModal";
import { IGrupo } from "../../interface/Grupo";
import { IProduto } from "../../interface/Produto";

export interface IProdutoProviderProps  {
    children: ReactNode;
  };

 export  interface IProdutoContext  {
    selectedGrupo: IGrupo; 
    setSelectedGrupo: (data: IGrupo) => void
    selectedProduto: IProduto; 
    setSelectedProduto: (data: IProduto) => void
    handleSelectedCodigoChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleCodigoGrupoBlur: () => Promise<void>,
    Modal: ({ title, children }: IpropsModal) => JSX.Element,
    openGrupoSearchTable: () => void,
    closeModal: () => void,
    handleSelectGrupoClick: (item: IGrupo) => void,
  };

