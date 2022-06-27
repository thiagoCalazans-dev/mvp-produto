import { Trash } from "phosphor-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreate, useRemove, useUpdate } from "../../hooks/useFetch";
import { IGrupo } from "../../interface/Grupo";
import { Loading } from "../Loading";

interface Iprops {
  onCloseModal: () => void;
  initialData?: IGrupo;
  selectedGrupoByParams?: IGrupo;
}

export const FormGrupo = ({
  onCloseModal,
  initialData = {} as IGrupo,
  selectedGrupoByParams,
}: Iprops) => {

  const { register, handleSubmit, watch, setValue } = useForm<IGrupo>({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (selectedGrupoByParams) {
     setValue("id", selectedGrupoByParams.id)
     setValue("codigo", selectedGrupoByParams.codigo)
     setValue("descricao", selectedGrupoByParams.descricao)  
     console.log("ta em loop?")       
     }
    }, [selectedGrupoByParams]);

  const params = watch("id");

  const { createLoading, createMutateAsync } = useCreate<IGrupo>(
    "grupos",
    "grupos"
  );

  const { updateLoading, updateMutateAsync } = useUpdate<IGrupo>(
    "grupos",
    "grupos",
    String(params)
  );

  const { removeLoading, removeMutateAsync } = useRemove<IGrupo>(
    "grupos",
    "grupos",
    String(params)
  );

  const HandleDeleteClick = async () => {
    await removeMutateAsync(initialData)
      .then(() => {
        toast.success("Grupo removido com sucesso");
      })
      .then(() => onCloseModal())
      .catch((error) => toast.error(error + "CATCH"));
  };

  const onSubmit: SubmitHandler<IGrupo> = async (data) => {
    if (data.id) {
      await updateMutateAsync(data)
        .then(() => {
          toast.success("Grupo alterado com sucesso");
        })
        .then(() => onCloseModal())
        .catch((error) => toast.error(error + "CATCH"));
    } else {
      await createMutateAsync(data)
        .then(() => {
          toast.success("Grupo cadastrado com sucesso");
        })
        .then(() => onCloseModal())
        .catch((error) => toast.error(error + "CATCH"));
    }
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
      {createLoading || updateLoading || removeLoading ? (
        <button disabled className="btn">
          <Loading />
        </button>
      ) : (
        <FormButtons id={params} DeleteClick={HandleDeleteClick} />
      )}
    </form>
  );
};

interface IFormButtonsProps {
  id: number;
  DeleteClick: () => void;
}

const FormButtons = ({ id, DeleteClick }: IFormButtonsProps) => {
  return (
    <div className="flex w-full gap-x-2 mt-4">
      <button className="btn flex-1">{id ? "Alterar" : "Salvar"}</button>
      {id && (
        <button
          type="button"
          onClick={() => DeleteClick()}
          className="btn-danger"
        >
          <Trash />
        </button>
      )}
    </div>
  );
};
