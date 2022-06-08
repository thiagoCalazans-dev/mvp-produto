import { IGrupo } from "../../interface/Grupo";
import { GrupoContextProvider } from "../../context/grupo/provider";
import { useQuery } from "react-query";
import ajax from "../../services/ajax";
import Table from "../../components/Table";
import { Loading } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { FormRegisterGrupo } from "../../components/forms/Grupo/FormRegisterGrupo";
import { useModal } from "../../hooks/useModal";
import { useGet, useRemove } from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { GrupoContext } from "../../context/grupo/context";
import { FormDetailsGrupo } from "../../components/forms/Grupo/FormDetailsGrupo";

const Grupo = () => {

  const registration = useModal()
  const details = useModal()
  const {selectedData, setSelectedData} = useContext(GrupoContext)

  
  const { isLoading, error, data } = useGet<IGrupo[]>("grupos", "grupos")
  if (error) return "An error has occurred: " + error.message;

  return (
    <GrupoContextProvider>      
      <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-1/2 bg-base-800 h-5/6 p-4 rounded-3xl flex flex-col gap-y-3 min-w-[310px]"> 
     
      <h1 className="font-bold text-center text-3xl">GRUPOS:</h1>
      <div className="grow flex justify-center items-center"> 
      {isLoading ? <Loading/> :   <Table.Container>          
          <Table.Head>
            <Table.TitleColumns title="Codigo" 
            className="max-w-[5rem] shrink text-center"/>
            <Table.TitleColumns title="Descrição" />
            <Table.TitleColumns
              title="Detalhes"
              className="max-w-[5rem] shrink"
            />   
              <Table.TitleColumns
              title="Excluir"
              className="max-w-[5rem] shrink"
            />    
          </Table.Head>          
          <Table.Body>
            {data?.map((item) => (
              <Table.Row key={item.id}>
                <Table.Data className="max-w-[5rem] shrink text-center">{item.codigo}</Table.Data>
                <Table.Data className="grow">{item.descricao}</Table.Data>
                <Table.Data className="max-w-[5rem] shrink text-center">
                  <Table.DetailsButton onClick={details.openModal} />
                </Table.Data>
                <Table.Data className="max-w-[5rem] shrink text-center">
                  <Table.DeleteButton onClick={() => console.log(item.id)} />
                </Table.Data>              
              </Table.Row>
            ))}
          </Table.Body>
         </Table.Container>    }
         </div>    
         <button className="btn" onClick={registration.openModal}>Cadastrar</button>     
          <Modal modal={registration.modal} closeModal={registration.closeModal}><FormRegisterGrupo closeModal={registration.closeModal}/></Modal>
          <Modal modal={details.modal} closeModal={details.closeModal}><FormDetailsGrupo closeModal={details.closeModal}/></Modal>
         </div>
      </div>
    </GrupoContextProvider>
  );
};

export default Grupo;
