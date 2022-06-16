import { useState } from "react";
import {ProdutoContextProvider} from "../../context/produto/provider"
import { Loading } from "../../components/Loading";
import Table from "../../components/Table";
import { useGet } from "../../hooks/useFetch";
import { useModal } from "../../hooks/useModal";
import { IProduto } from "../../interface/Produto";
import { FormProduto } from "../../components/forms/Produto/FormRegisterProduto";
import { Card } from "../../components/Card";

const Produto = () => {

  
  //states
  const [selectedData, setSelectedData] = useState<IProduto>({} as IProduto);
  

  //hooks
  const { Modal, openModal, closeModal } = useModal();
  const details = useModal();
  const { isLoading, error, data } = useGet<IProduto[]>("produtos", "produtos?comGrupo=true");
  if (error) return "An error has occurred: " + error.message;

  //functions
  
  const HandleDetailsClick = (produto: IProduto) => {
    setSelectedData(produto);
    // details.openModal();
    console.log(data)
  };

  return (
    <ProdutoContextProvider>  
    <main className="w-full h-full flex flex-col justify-center items-center p-5">
      <Card className="w-auto h-full p-4 rounded-xl flex flex-col gap-y-3 min-w-[310px] ">
        <h1 className="font-bold text-center text-3xl">Produtos:</h1>
        <div className="grow flex justify-center items-center overflow-y-auto scrollbar-thumb-base-700 scrollbar-track-transparent scrollbar-thin hover:scrollbar-thumb-brand-500">
          {isLoading ? (
            <Loading />
          ) : (
            <Table.Container>
              <Table.Head>
                <Table.TitleColumns
                  title="Código"
                  className="max-w-[5rem] shrink text-center"
                />
                  <Table.TitleColumns title="Grupo" />
                <Table.TitleColumns title="Produto" />
                <Table.TitleColumns
                  title="Detalhes"
                  className="max-w-[5rem] shrink"
                />
              </Table.Head>
              <Table.Body>
                {data?.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Data className="max-w-[5rem] shrink text-center">
                      {item.codigo}
                    </Table.Data>
                    <Table.Data className="grow">{item.grupo.descricao}</Table.Data>
                    <Table.Data className="grow">{item.descricao}</Table.Data>
                    <Table.Data className="max-w-[5rem] shrink text-center">
                      <Table.DetailsButton
                        onClick={() => HandleDetailsClick(item)}
                      />
                    </Table.Data>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Container>
          )}
        </div>
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
