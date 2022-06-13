import { Cursor } from "phosphor-react";
import { useContext } from "react";
import { ProdutoContext } from "../../context/produto/context";
import { useGet } from "../../hooks/useFetch";
import { IGrupo } from "../../interface/Grupo";
import { Loading } from "../Loading";
import Table from "../Table";



export const GrupoSearchTable = () => {
    
    //states
    const {handleSelectGrupoClick} = useContext(ProdutoContext)
    //hooks
    const { isLoading, error, data } = useGet<IGrupo[]>("grupos", "grupos")
   
    return (
        <div className="grow flex justify-center items-center overflow-y-auto scrollbar-thumb-base-700 scrollbar-track-transparent scrollbar-thin hover:scrollbar-thumb-brand-500"> 
        {isLoading ? <Loading/> :   <Table.Container>          
            <Table.Head>
              <Table.TitleColumns title="Código" 
              className="max-w-[5rem] shrink text-center"/>
              <Table.TitleColumns className="min-w-[300px]"title="Descrição" />
              <Table.TitleColumns
                title="Detalhes"
                className="max-w-[5rem] shrink"
              />
                        </Table.Head>          
            <Table.Body>
              {data?.map((item) => (
                <Table.Row  key={item.id} onDoubleClick={() => handleSelectGrupoClick(item)}>
                  <Table.Data className="max-w-[5rem] shrink text-center">{item.codigo}</Table.Data>
                  <Table.Data className="min-w-[300px]">{item.descricao}</Table.Data>
                  <Table.Data className="max-w-[5rem] shrink text-center">
                    <Table.SelectButton onClick={() => handleSelectGrupoClick(item)}/>
                  </Table.Data>                          
                </Table.Row>
              ))}
            </Table.Body>
           </Table.Container>}
           </div>  
    )
}