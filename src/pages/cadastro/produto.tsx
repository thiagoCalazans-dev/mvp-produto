import { useState } from "react";
import { FormProduto } from "../../components/forms/Produto/FormProduto";
import { Loading } from "../../components/Loading";
import Table from "../../components/Table";
import { useGet } from "../../hooks/useFetch";
import { useModal } from "../../hooks/useModal";
import { IProduto } from "../../interface/Produto";



const Produto = () => {
    //states
    const [selectedData, setSelectedData] = useState<IProduto>({} as IProduto)
   

    //hooks
    const {Modal, openModal} = useModal()
    const details = useModal()
    const { isLoading, error, data } = useGet<IProduto[]>("produtos", "produtos")
    if (error) return "An error has occurred: " + error.message

   //functions
    const HandleDetailsClick = (produto:IProduto) => {
        setSelectedData(produto)
        details.openModal()
        
      }
     
    
       
     

        return (
                    
        <main className="w-full h-full flex flex-col justify-center items-center">
      <section className="w-1/2 bg-base-800 h-5/6 p-4 rounded-xl flex flex-col gap-y-3 min-w-[310px] ">      
      <h1>Produtos:</h1>
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
         <button className="btn" type="button" onClick={openModal}>Cadastrar</button>    
         </section>      
         
            <section><Modal title="Cadastro Produto"><FormProduto/></Modal></section>
            <section></section>
            </main>
    )
}

export default Produto;