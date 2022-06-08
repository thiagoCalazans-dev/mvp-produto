import { useState } from "react";
import {IGrupo, IFormGrupo } from "../../interface/Grupo";
import { IGrupoProviderProps } from "./interface";
import { GrupoContext } from "./context";
import ajax from "../../services/ajax";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../../services/queryClient";

export const GrupoContextProvider = ({ children }: IGrupoProviderProps) => {

const [selectedData, setSelectedData] = useState<IGrupo>({} as IGrupo)   


   
 
          
return (<GrupoContext.Provider value={{
    selectedData,
    setSelectedData, 
    }}>{children} 
    </GrupoContext.Provider>
    
        )

  }