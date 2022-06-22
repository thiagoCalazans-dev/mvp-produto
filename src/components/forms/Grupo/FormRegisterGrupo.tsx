import { useForm, SubmitHandler } from "react-hook-form";
import { useCreate, useOptimisticCreate } from "../../../hooks/useFetch";
import { IFormGrupo, IGrupo } from "../../../interface/Grupo";
import { Loading } from "../../Loading";

interface Iprops {
    closeModal: () => void
    isFetching: boolean
}




export const FormRegisterGrupo = ({closeModal, isFetching}: Iprops) => {

    const { register, handleSubmit } = useForm<IFormGrupo>()
    const {mutate, isLoading} = useCreate<IFormGrupo>('grupos', 'grupos', "Grupo adcionado com sucesso")


    const onSubmit: SubmitHandler<IFormGrupo> =  async data =>  {
            await mutate(data)           
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