import { Trash } from "phosphor-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRemove, useUpdate } from "../../../hooks/useFetch";
import { IGrupo } from "../../../interface/Grupo";
import { Loading } from "../../Loading";

interface Iprops {
  closeModal: () => void;
  initialData?: IGrupo;
  urlParams?: string;
}

export const FormDetailsGrupo = ({
  closeModal,
  initialData,
  urlParams,
}: Iprops) => {
  const { register, handleSubmit } = useForm<IGrupo>({
    defaultValues: initialData,
  });
  const { updateLoading, updateMutateAsync } = useUpdate(
    "grupos",
    "grupos",
   String(urlParams),
  );

  const {
    mutate: removeMutate,
    isLoading: removeLoading,
    isSuccess,
    error,   
  } = useRemove("grupos", "grupos", urlParams);

  const onSubmit: SubmitHandler<IGrupo> = async (grupo) => {
    await updateMutate(grupo);
  };

  const HandleDeleteClick = async () => {
    await removeMutate(initialData);
     error && toast.error("error")
    isSuccess && console.log(isSuccess)
 };

  return (
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
  );
};
