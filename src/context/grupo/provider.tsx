import { useState } from "react";
import {IGrupo, IFormGrupo } from "../../interface/Grupo";
import { IGrupoProviderProps } from "./interface";
import { GrupoContext } from "./context";
import ajax from "../../services/ajax";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/Modal";
import { FormGrupo } from "../../components/forms/FormGrupo";

export const GrupoContextProvider = ({ children }: IGrupoProviderProps) => {

    const [modal, setModal] = useState(false)     


    const postFornecedor = async (value: IFormGrupo) => {
        await ajax.post("grupos", value);  
      };
    
      const updateFornecedor = async (value: IGrupo, id: number) => {
        await ajax.put(`grupos/${id}`, value);
        
      };
    
      const deleteFornecedor = async (id: number) => {
        await ajax.delete(`grupos/${id}`);

      };
    
      const findFornecedor = async (id: number) => {
        await ajax
          .get(`grupos/${id}`)
          .then((res) => console.log(res.data.cnpj));
      };

    return (<GrupoContext.Provider value={{
       postFornecedor,
       setModal,
       modal,      
    }}>{children} 
    </GrupoContext.Provider>
    
        )

  }