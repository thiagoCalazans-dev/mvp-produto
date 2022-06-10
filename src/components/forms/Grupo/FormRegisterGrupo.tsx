import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { GrupoContext } from "../../../context/grupo/context";
import { useCreate } from "../../../hooks/useFetch";
import { IFormGrupo, IGrupo } from "../../../interface/Grupo";
import { Loading } from "../../Loading";

interface Iprops {
    closeModal: () => void
}




export const FormRegisterGrupo = ({closeModal}: Iprops) => {

    const { register, handleSubmit } = useForm<IFormGrupo>()
    const {mutate, isLoading} = useCreate<IFormGrupo>('grupos', 'grupos', "Grupo adcionado com sucesso")


    const onSubmit: SubmitHandler<IFormGrupo> =  async data =>  {
            await mutate(data)            
            !isLoading && closeModal()
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>           
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
    )
}