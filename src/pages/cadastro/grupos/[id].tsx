import { useRouter } from "next/router";
import { ArrowBendUpLeft} from "phosphor-react";
import { Card } from "../../../components/Card";
import { Container } from "../../../components/Container";
import { FormGrupo } from "../../../components/forms/FormGrupo";
import { Loading } from "../../../components/Loading";
import { useGetById} from "../../../hooks/useFetch";
import { IGrupo } from "../../../interface/Grupo";

const GrupoDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: grupo, isLoading } = useGetById<IGrupo>("grupos", "grupos", id);

  const sendToGrupos = () => {
    router.push("/cadastro/grupos");
  };

  return (
    <Container>
            {isLoading ? (
            <Loading />
          ) : (
      <Card className="h-auto w-auto max-w-[900px] overflow-hidden rounded-lg bg-brand-secondary dark:bg-dark-500  border-base px-5 pb-5">
        <button
          onClick={sendToGrupos}
          className="bg-brand-primary transition-all rounded-full p-1"
        >
          <ArrowBendUpLeft size={20} weight="bold" color="#FFFFFF" />
        </button>
        <h1 className="font-bold text-center text-3xl tracking-wide">Grupo</h1>    
      
            <FormGrupo
              onCloseModal={sendToGrupos}
              selectedGrupoByParams={grupo}
            />    
        </Card>)}
    </Container>
  );
};

export default GrupoDetail;
