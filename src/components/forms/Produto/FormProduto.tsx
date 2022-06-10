import { MagnifyingGlass } from "phosphor-react";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { GrupoContext } from "../../../context/grupo/context";
import { useCreate } from "../../../hooks/useFetch";
import { useModal } from "../../../hooks/useModal";
import { IFormGrupo, IGrupo } from "../../../interface/Grupo";
import { IProduto } from "../../../interface/Produto";
import { Loading } from "../../Loading";
import { Modal } from "../../Modal";


export const FormProduto = () => {

    const { register, handleSubmit } = useForm<IProduto>()
    const {mutate, isLoading} = useCreate<IProduto>('grupos', 'grupos', "Grupo adcionado com sucesso")
    const {closeModal, modal, openModal} = useModal()

    const onSubmit: SubmitHandler<IProduto> =  async data =>  {
            await mutate(data)           
            
    }

    return (
        <div className="card">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}> 
        <h1 className="font-semibold text-center text-3xl">Cadastro Produto:</h1>
        <div className="form-control">
                <label className="label"htmlFor="">Id:</label>
                <input disabled className="input" type="text"  {...register("id")}/>               
            </div> 
               <div className="form-control">
                <label className="label"htmlFor="">Grupo:</label>
                <div className="flex gap-2">
                <button type="button" className="btn" onClick={openModal}><MagnifyingGlass/></button>
                <input className="input w-12" type="text"  {...register("grupoId")}/>
                <p className="input-outlined">Descricao grupo</p>               
                </div>
            </div>         
            <div className="form-control">
                <label className="label"htmlFor="">Código:</label>
                <input className="input" type="text"  {...register("codigo")}/>               
            </div>
            <div className="form-control">
                <label className="label"htmlFor="">Descrição:</label>
                <input className="input" type="text" {...register("descricao")} />
            </div>
            <button className="btn mt-4">{isLoading ? <Loading/> : `Salvar`}</button>
        </form>
        <Modal closeModal={closeModal} modal={modal}>TABLE GRUPOS PESQUISA</Modal>
        </div>
    )
}