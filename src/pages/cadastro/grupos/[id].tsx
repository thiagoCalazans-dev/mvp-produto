import { useRouter } from "next/router";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Card } from "../../../components/Card";
import { Loading } from "../../../components/Loading";
import { GrupoContextProvider } from "../../../context/grupo/provider";
import {useGetById, useRemove, useUpdate } from "../../../hooks/useFetch";
import { IGrupo } from "../../../interface/Grupo";



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
  

  const encaminhar =  () => {
     router.push('/cadastro/grupos')
  }

  const { updateLoading, updateMutateAsync } = useUpdate<IGrupo>(
    "grupos",
    "grupos",
    String(id)
  );

  const { removeLoading, removeMutateAsync } = useRemove(
    "grupos",
    "grupos",
    String(id)
  );

  

  const onSubmit: SubmitHandler<IGrupo> = async (data) => {
      await updateMutateAsync(data).then(() => {
        toast.success("Grupo alterado com sucesso");
      })
      .then(() => encaminhar())
      .catch((error) => toast.error(error + "CATCH"));
    }

  const HandleDeleteClick = async () => {
    const value = getValues
    await removeMutateAsync(value)
      .then(() => {
        toast.success("Grupo removido com sucesso");
      })
      .then(() => encaminhar())
      .catch((error) => toast.error(error + "CATCH"));
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