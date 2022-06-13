import { MagnifyingGlass } from "phosphor-react";
import {
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProdutoContext } from "../../../context/produto/context";
import { useCreate, useGetById } from "../../../hooks/useFetch";
import { useModal } from "../../../hooks/useModal";
import { IGrupo } from "../../../interface/Grupo";
import { IFormProduto, IProduto } from "../../../interface/Produto";
import { Loading } from "../../Loading";
import { GrupoSearchTable } from "../../SearchTables/GrupoSearchTable";

interface IProps {
  closeOnSubmit: () => void
}

export const FormProduto = ({closeOnSubmit}: IProps) => {
  //states
  const {selectedGrupo, setSelectedGrupo, handleSelectedCodigoChange, handleCodigoGrupoBlur, Modal, openGrupoSearchTable } = useContext(ProdutoContext)


  //hooks
  const { register, handleSubmit, setValue } = useForm<IProduto>(); 
  const { mutate, isLoading} = useCreate<IFormProduto>(
    "produtos",
    `grupos/${selectedGrupo.id}/produtos`,
    "Produto adcionado com sucesso"
  );

//functions

const onSubmit: SubmitHandler<IFormProduto> = async (data) => {
  mutate(data);
  setSelectedGrupo({} as IGrupo)
  closeOnSubmit();
 };

  //Effects
  const setInputGrupoId = useCallback(() => {
    setValue("grupoId", selectedGrupo.id);
  }, [selectedGrupo, setValue]);

  useEffect(() => {
    setInputGrupoId();
  }, [setInputGrupoId]);

  return (
    <div className="card">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label" htmlFor="">
            Id:
          </label>
          <input disabled className="input" type="text" {...register("id")} />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="">
            Grupo:
          </label>
          <div className="flex gap-2">
            <button type="button" className="btn" onClick={openGrupoSearchTable}>
              <MagnifyingGlass />
            </button>
            <input hidden className="" type="text" {...register("grupoId")} />
            <input
              className="input w-12"
              type="text"
              value={selectedGrupo.codigo}
              onChange={handleSelectedCodigoChange}
              onBlur={handleCodigoGrupoBlur}
            />
            <p className="input-outlined">{selectedGrupo.descricao}</p>
          </div>
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
        <button className="btn mt-4">{isLoading ? <Loading/> : `Salvar`}</button>
      </form>
       <Modal title="Pesquisa Grupos">
        <GrupoSearchTable/>
      </Modal>
    </div>
  );
};
