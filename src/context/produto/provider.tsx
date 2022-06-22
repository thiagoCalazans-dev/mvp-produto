import { ChangeEvent, useState } from "react"
import { useModal } from "../../hooks/useModal"
import { IGrupo } from "../../interface/Grupo"
import { IProduto } from "../../interface/Produto"
import ajax from "../../services/ajax"
import { ProdutoContext } from "./context"
import { IProdutoProviderProps } from "./interface"

export const ProdutoContextProvider = ({ children }: IProdutoProviderProps) => {

    const [selectedGrupo, setSelectedGrupo] = useState<IGrupo>({} as IGrupo)
    const [selectedProduto, setSelectedProduto] = useState<IProduto>({} as IProduto)
    const { Modal, openModal: openGrupoSearchTable, closeModal } = useModal();

    const handleSelectedCodigoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const codigo = Number(e.target.value);
        setSelectedGrupo({
          ...selectedGrupo,
          codigo,
        });
      };

      const handleSelectGrupoClick = (item: IGrupo) => {
        setSelectedGrupo(item);
        closeModal();
      };

      const handleCodigoGrupoBlur = async () => {
        if (selectedGrupo.codigo !== 0) {
          const {data} = await (ajax.get(`grupos/codigo${selectedGrupo.codigo}`))
          console.log(data)
        }}
        
                
    return (<ProdutoContext.Provider value={{
        selectedGrupo,
        setSelectedGrupo,
        selectedProduto, 
        setSelectedProduto,
        handleSelectedCodigoChange,
        handleCodigoGrupoBlur,
        Modal,
        openGrupoSearchTable,
        closeModal,
        handleSelectGrupoClick,
        }}>{children} 
        </ProdutoContext.Provider>
        
            )
    
      }