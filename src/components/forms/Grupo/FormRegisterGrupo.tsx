import { useForm, SubmitHandler } from "react-hook-form";
import { useCreate } from "../../../hooks/useFetch";
import { IFormGrupo } from "../../../interface/Grupo";
import { Loading } from "../../Loading";

interface Iprops {
    closeModal: () => void
    showId?: boolean
}


export const FormRegisterGrupo = ({closeModal, showId}: Iprops) => {

    const { register, handleSubmit } = useForm<IFormGrupo>()
    const {mutate, isLoading} = useCreate('grupos', 'grupos')


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