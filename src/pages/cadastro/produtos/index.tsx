import { useState } from "react";
import {ProdutoContextProvider} from "../../../context/produto/provider"
import { Loading, TableLoading } from "../../../components/Loading";
import Table from "../../../components/Table";
import { useGet } from "../../../hooks/useFetch";
import { useModal } from "../../../hooks/useModal";
import { IProduto } from "../../../interface/Produto";
import { FormProduto } from "../../../components/forms/Produto/FormRegisterProduto";
import { Card } from "../../../components/Card";

const Produto = () => {

  
  //states
  const [selectedData, setSelectedData] = useState<IProduto>({} as IProduto);
  

  //hooks
  const { Modal, openModal, closeModal } = useModal();
  const details = useModal();
  const { isLoading, error, data, isFetching } = useGet<IProduto[]>("produtos", "produtos?comGrupo=true");
  if (error) return "An error has occurred: " + error.message;

  //functions
  
  const HandleDetailsClick = (produto: IProduto) => {
    setSelectedData(produto);
    // details.openModal();
    console.log(data)
  };

  return (
    <ProdutoContextProvider>  
     <main className="w-full h-full flex flex-col justify-center items-center py-5 px-16">
        <Card className="flex flex-col gap-y-3 max-w-[900px]">
          <h1 className="font-bold text-center text-3xl">Produtos:</h1>
          <section className="grow flex flex-col justify-center items-center overflow-y-auto scrollbar-thumb-base-700 scrollbar-track-transparent scrollbar-thin hover:scrollbar-thumb-brand-500">
          {isLoading ? (
            <Loading />
          ) : (
            <Table.Container>
              <Table.Head>
                <Table.TitleColumns
                  title="Código"
                  className="w-20 shrink text-center px-1"
                />
                  <Table.TitleColumns title="Grupo" 
                  className="w-20 shrink text-center px-1"/>
                <Table.TitleColumns title="Produto" className="flex-1 text-left"/>
                <Table.TitleColumns
                  title="Detalhes"
                  className="w-20 shrink text-center px-1"
                />
              </Table.Head>
              <Table.Body>
                {data?.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Data className="w-20 shrink text-center px-1">
                      {item.codigo}
                    </Table.Data>
                    <Table.Data className="w-20 shrink text-center px-1">{item.grupo.descricao}</Table.Data>
                    <Table.Data className="flex-1">{item.descricao}</Table.Data>
                    <Table.Data className="w-20 shrink text-center px-1">
                      <Table.DetailsButton
                        onClick={() => HandleDetailsClick(item)}
                      />
                    </Table.Data>
                  </Table.Row>
                ))}
              </Table.Body>
              {!isLoading && isFetching && <TableLoading />}
            </Table.Container>
          )}
        </section>
        <button className="btn" type="button" onClick={openModal}>
          Cadastrar
        </button>
      </Card>
      <section>
        <Modal title="Cadastro Produto">
          <FormProduto closeOnSubmit={closeModal}/>
        </Modal>
      </section>
      <section></section>
    </main>
    </ProdutoContextProvider> 
  );
};

export default Produto;
