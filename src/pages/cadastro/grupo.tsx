import { IGrupo } from "../../interface/Grupo";
import { GrupoContextProvider } from "../../context/grupo/provider";
import { useQuery } from "react-query";
import ajax from "../../services/ajax";
import Table from "../../components/Table";
import { Loading } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { FormRegisterGrupo } from "../../components/forms/Grupo/FormRegisterGrupo";
import { useModal } from "../../hooks/useModal";
import { useGet } from "../../hooks/useFetch";
import { FormDetailsGrupo } from "../../components/forms/Grupo/FormDetailsGrupo";
import { useState } from "react";

const Grupo = () => {

  const registration = useModal()
  const details = useModal()
  const [selectedData, setSelectedData] = useState<IGrupo>({} as IGrupo)
  const HandleDetailsClick = (grupo:IGrupo) => {
    setSelectedData(grupo)
    details.openModal()
  }

   
  const { isLoading, error, data } = useGet<IGrupo[]>("grupos", "grupos")
  if (error) return "An error has occurred: " + error.message;

  return (
    <GrupoContextProvider>      
      <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-1/2 bg-base-800 h-5/6 p-4 rounded-xl flex flex-col gap-y-3 min-w-[310px] "> 
     
      <h1 className="font-bold text-center text-3xl">GRUPOS:</h1>
      <div className="grow flex justify-center items-center overflow-y-auto scrollbar-thumb-base-700 scrollbar-track-transparent scrollbar-thin hover:scrollbar-thumb-brand-500"> 
      {isLoading ? <Loading/> :   <Table.Container>          
          <Table.Head>
            <Table.TitleColumns title="Código" 
            className="max-w-[5rem] shrink text-center"/>
            <Table.TitleColumns title="Descrição" />
            <Table.TitleColumns
              title="Detalhes"
              className="max-w-[5rem] shrink"
            />
                      </Table.Head>          
          <Table.Body>
            {data?.map((item) => (
              <Table.Row key={item.id}>
                <Table.Data className="max-w-[5rem] shrink text-center">{item.codigo}</Table.Data>
                <Table.Data className="grow">{item.descricao}</Table.Data>
                <Table.Data className="max-w-[5rem] shrink text-center">
                  <Table.DetailsButton onClick={() => HandleDetailsClick(item)} />
                </Table.Data>                          
              </Table.Row>
            ))}
          </Table.Body>
         </Table.Container>    }
         </div>    
         <button className="btn" onClick={registration.openModal}>Cadastrar</button>     
          <Modal modal={registration.modal} closeModal={registration.closeModal}><FormRegisterGrupo closeModal={registration.closeModal}/></Modal>
          <Modal modal={details.modal} closeModal={details.closeModal}><FormDetailsGrupo initialData={selectedData}closeModal={details.closeModal} urlParams={String(selectedData.id)}/></Modal>
         </div>
      </div>
    </GrupoContextProvider>
  );
};

export default Grupo;
