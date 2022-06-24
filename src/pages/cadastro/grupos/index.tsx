import { IGrupo } from "../../../interface/Grupo";
import { GrupoContextProvider } from "../../../context/grupo/provider";
import Table from "../../../components/Table";
import { Loading, TableLoading } from "../../../components/Loading";
import { FormGrupo } from "../../../components/forms/FormGrupo";
import { useModal } from "../../../hooks/useModal";
import { useGet } from "../../../hooks/useFetch";
import { FormDetailsGrupo } from "../../../components/forms/Grupo/FormDetailsGrupo";
import { useState } from "react";
import { Card } from "../../../components/Card";
import { useRouter } from "next/router";

const Grupo = () => {
  const registration = useModal();
  const details = useModal();
  const router = useRouter()
  const [selectedData, setSelectedData] = useState<IGrupo>({} as IGrupo);
 
  const HandleDetailsClick = (grupo: IGrupo) => {
    setSelectedData(grupo);
    registration.openModal();
  };


  const handleCadastrarClick = () => {
    setSelectedData({} as IGrupo);
    registration.openModal();
  };


  const { isLoading, error, data, isFetching } = useGet<IGrupo[]>(
    "grupos",
    "grupos"
  );
  if (error) return "An error has occurred:" + error.message;

  return (
      <main className="w-full h-full flex flex-col justify-center items-center py-5 px-16">
        <Card className="flex flex-col gap-y-3 max-w-[900px]">
          <h1 className="font-bold text-center text-3xl">GRUPOS:</h1>
          <div className="grow flex flex-col justify-center items-center overflow-y-auto scrollbar-thumb-base-700 scrollbar-track-transparent scrollbar-thin hover:scrollbar-thumb-brand-500">
            {isLoading ? (
              <Loading />
            ) : (
              <Table.Container>
                <Table.Head>
                  <Table.TitleColumns
                    title="Código"
                    className="w-20 text-center border-r-base"
                  />
                  <Table.TitleColumns
                    className="text-left border-r-base grow "
                    title="Descrição"
                  />
                  <Table.TitleColumns
                    title="Detalhes"
                    className="w-20 shrink rounded-t-lg"
                  />
                </Table.Head>
                <Table.Body>
                  {data?.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Data className="w-20 shrink text-center border-r-base">
                        {item.codigo}
                      </Table.Data>
                      <Table.Data className="grow border-r-base">
                        {item.descricao}
                      </Table.Data>
                      <Table.Data className="w-20 shrink text-center px-1">
                        <button
                        className="mx-1 hover:bg-brand-secondary-light"
                        onClick={() => router.push(`${router.asPath}/${item.id}`) }
                        >Link</button>
                          <Table.DetailsButton
                        // onClick={() => router.push(`${router.asPath}/${item.id}`) }
                        onClick={() => HandleDetailsClick(item)}
                        />
                      </Table.Data>
                    </Table.Row>
                  ))}
                </Table.Body>
                {!isLoading && isFetching && <TableLoading />}
              </Table.Container>
            )}
          </div>
          <button className="btn" onClick={handleCadastrarClick}>
            Cadastrar
          </button>
          <registration.Modal>
            <FormGrupo
              initialData={selectedData}          
              closeModal={registration.closeModal}
            />
          </registration.Modal>
          <details.Modal>
            <FormDetailsGrupo     
              initialData={selectedData}
              closeModal={details.closeModal}
              urlParams={String(selectedData.id)}
            />
          </details.Modal>
        </Card>
      </main>
  );
};

export default Grupo;
