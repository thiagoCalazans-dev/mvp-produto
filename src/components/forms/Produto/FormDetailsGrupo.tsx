import { MagnifyingGlass } from "phosphor-react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProdutoContext } from "../../../context/produto/context";
import { useUpdate } from "../../../hooks/useFetch";
import { IFormProduto, IProduto } from "../../../interface/Produto";
import { Loading } from "../../Loading";
import { GrupoSearchTable } from "../../SearchTables/GrupoSearchTable";

interface IProps {
  closeOnSubmit: () => void
}

export const FormProduto = ({closeOnSubmit}: IProps) => {
  //context
  const {selectedGrupo, setSelectedProduto, handleSelectedCodigoChange, handleCodigoGrupoBlur, openGrupoSearchTable, Modal, handleSelectGrupoClick } = useContext(ProdutoContext)
  
  //hooks
  const { register, handleSubmit, setValue } = useForm<IProduto>();
  
  const { updateLoading, updateMutateAsync} = useUpdate<IFormProduto>(
    "produtos",
    `grupos/${selectedGrupo.id}/produtos`,
    "Produto adcionado com sucesso"
  );

//functions

const onSubmit: SubmitHandler<IFormProduto> = async (data) => {
  updateMutateAsync(data);
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
        <button className="btn mt-4">{updateLoading ? <Loading/> : `Salvar`}</button>
      </form>
       <Modal title="Pesquisa Grupos" onCloseModal={() => console.log ('teste')}>
        <GrupoSearchTable/>
      </Modal>
    </div>
  );
};
