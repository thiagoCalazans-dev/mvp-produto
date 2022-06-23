import { useRouter } from "next/router";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { setEnvironmentData } from "worker_threads";
import { Card } from "../../../components/Card";
import { FormDetailsGrupo } from "../../../components/forms/Grupo/FormDetailsGrupo";
import { Loading } from "../../../components/Loading";
import { GrupoContextProvider } from "../../../context/grupo/provider";
import { useGet, useGetById, useRemove, useUpdate } from "../../../hooks/useFetch";
import { IGrupo } from "../../../interface/Grupo";
import ajax from "../../../services/ajax";


const GrupoDetail = () => {

const router = useRouter()
const {id} = router.query
const {data} = useGetById<IGrupo>("grupos", "grupos", id)

useEffect(() => {
    if (data) {
        setValue("id", data.id)
        setValue("codigo", data.codigo)
        setValue("descricao", data.descricao)         
        }
}, [data]);


const { register, handleSubmit, setValue, getValues } = useForm<IGrupo>({
    defaultValues: data,
  });
  const { mutate: updateMutate, isLoading: updateLoading } = useUpdate(
    "grupos",
    `grupos/${id}`,
    "Grupos alterado com sucesso",
  
  );

  const encaminhar = () => {
    router.push('/cadastro/grupos')
  }

  const { mutate: removeMutate, isLoading: removeLoading } = useRemove(
    "grupos",
    "grupos",
     encaminhar,
     String(id),

  );

  

  const onSubmit: SubmitHandler<IGrupo> = async (grupo) => {
    await updateMutate(grupo)   
 
  };

  const HandleDeleteClick = async () => {
    const value = getValues
    await removeMutate(value)
    
  };

return (
  <GrupoContextProvider>
    <main className="w-full h-full flex flex-col justify-center items-center py-5 px-16">
      <Card className="flex w-auto h-auto flex-col gap-y-3 items-center max-w-[900px]">
        <h1 className="font-bold text-center text-3xl">Grupo:</h1>       
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label" htmlFor="id">
          Id:
        </label>
        <input
          disabled
          className="input"
          id="id"
          type="text"
          {...register("id")}
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="">
          Código:
        </label>
        <input className="input" type="text" {...register("codigo")} />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="">
          Descrição:
        </label>
        <input className="input" type="text" {...register("descricao")} />
      </div>
      <div className="flex w-full gap-x-2 mt-4">
        {updateLoading || removeLoading ? (
          <Loading />
        ) : (
          <>
            <button className="btn flex-1">Editar</button>
            <button
              type="button"
              onClick={() => HandleDeleteClick()}
              className="btn-danger"
            >
              <Trash />
            </button>
          </>
        )}
      </div>
    </form>
        
              </Card>
    </main>
  </GrupoContextProvider>
); 

};


export default GrupoDetail;