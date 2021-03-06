import { IGrupo } from "../../../interface/Grupo";
import Table from "../../../components/Table";
import { Loading } from "../../../components/Loading";
import { FormGrupo } from "../../../components/forms/FormGrupo";
import { useModal } from "../../../hooks/useModal";
import { useCallback, useEffect, useState } from "react";
import { Card } from "../../../components/Card";
import { useRouter } from "next/router";
import { ChatCenteredText } from "phosphor-react";
import { Container } from "../../../components/Container";
import { queryClient } from "../../../services/queryClient";
import { usePagination } from "../../../hooks/usePagination";

const Grupo = () => {
  const { openModal, closeModal, Modal } = useModal();
  const router = useRouter();
  const [selectedData, setSelectedData] = useState<IGrupo>({} as IGrupo);


  const {
    preFetchPagination,
    useGetWithPagination,
    paginationInfos,
    page,
    getPaginationInfos,
    TableFooter,
  } = usePagination<IGrupo[]>("grupos", "grupos");

  const { isLoading, error, data: grupos } = useGetWithPagination();


  const HandleDetailsClick = (grupo: IGrupo) => {
    setSelectedData(grupo);
    router.push(
      `/cadastro/grupos/?id=${grupo.id}`,
      `/cadastro/grupos/${grupo.id}`,
      {
        shallow: true,
      }
    );
    openModal();
  };

  const handleCadastrarClick = () => {
    setSelectedData({} as IGrupo);
    router.push(`/cadastro/grupos/?id=0}`, `/cadastro/grupos/0`, {
      shallow: true,
    });
    openModal();
  };

  const handleCloseModal = () => {
    router.push(`/cadastro/grupos/`, undefined, {
      shallow: true,
    });
    closeModal();
  };

  return (
    <Container>
      <Card className="flex flex-col gap-y-3 max-w-[900px]">
        <h1 className="font-bold text-center text-3xl">GRUPOS:</h1>
        <div className="grow flex flex-col justify-center items-center overflow-y-auto scrollbar-thumb-base-700 scrollbar-track-transparent scrollbar-thin hover:scrollbar-thumb-brand-500">
          {isLoading ? (
            <Loading />
          ) : (
            <Table.Container>
              <Table.Head>
                <Table.TitleColumns
                  title="C??digo"
                  className="w-20 text-center border-r-base"
                />
                <Table.TitleColumns
                  className="text-left border-r-base grow "
                  title="Descri????o"
                />
                <Table.TitleColumns
                  title="Detalhes"
                  className="w-20 shrink rounded-t-lg"
                />
              </Table.Head>
              <Table.Body>
                {grupos?.map((grupo) => (
                  <Table.Row key={grupo.id}>
                    <Table.Data className="w-20 shrink text-center border-r-base">
                      {grupo.codigo}
                    </Table.Data>
                    <Table.Data className="grow border-r-base">
                      {grupo.descricao}
                    </Table.Data>
                    <Table.Data className="w-20 shrink text-center px-1">
                      <button
                        onClick={() => HandleDetailsClick(grupo)}
                        className="hover:bg-brand-primary transition-all rounded-full p-1"
                      >
                        <ChatCenteredText />
                      </button>
                    </Table.Data>
                  </Table.Row>
                ))}
              </Table.Body>
              <TableFooter />
            </Table.Container>
          )}
        </div>
        <button className="btn" onClick={handleCadastrarClick}>
          Cadastrar
        </button>
        {router.query.id && (
          <Modal onCloseModal={handleCloseModal}>
            <FormGrupo
              initialData={selectedData}
              onCloseModal={handleCloseModal}
            />
          </Modal>
        )}
      </Card>
    </Container>
  );
};

export default Grupo;
