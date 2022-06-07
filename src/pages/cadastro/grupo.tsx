import { IGrupo } from "../../interface/Grupo";
import { GrupoContextProvider } from "../../context/grupo/provider";
import { useQuery } from "react-query";
import ajax from "../../services/ajax";
import Table from "../../components/Table";
import { Loading } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { FormGrupo } from "../../components/forms/FormGrupo";
import { useModal } from "../../hooks/useModal";
import { useGet } from "../../hooks/useFetch";

const Grupo = () => {

  const {closeModal, openModal, modal} = useModal()

  const { isLoading, error, data } = useGet<IGrupo[]>("grupos", "grupos")

  if (error) return "An error has occurred: " + error.message;

  return (
    <GrupoContextProvider>      
      <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-1/3 bg-base-800 h-5/6 p-4 rounded-3xl flex flex-col gap-y-3"> 
     
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
                <Table.Data>{item.descricao}</Table.Data>
                <Table.Data className="max-w-[5rem] shrink text-center">
                  <Table.DetailsButton onClick={() => console.log(item)} />
                </Table.Data>
                <Table.Data className="max-w-[5rem] shrink text-center">
                  <Table.DeleteButton onClick={() => console.log(item.id)} />
                </Table.Data>
              </Table.Row>
            ))}
          </Table.Body>
         </Table.Container>    }
         </div>    
         <button className="btn" onClick={openModal}>Cadastrar</button>     
          <Modal modal={modal} closeModal={closeModal}><FormGrupo closeModal={closeModal}/></Modal>
         </div>
      </div>
    </GrupoContextProvider>
  );
};

export default Grupo;
