import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GrupoContext } from "../../context/grupo/context";
import { usePost } from "../../hooks/useFetch";
import { IFormGrupo } from "../../interface/Grupo";

interface Iprops {
    closeModal: () => void
}


export const FormGrupo = ({closeModal}: Iprops) => {

    const { register, handleSubmit } = useForm<IFormGrupo>()
    const {} = useContext(GrupoContext)
    const {mutate} = usePost("grupos")


    const onSubmit: SubmitHandler<IFormGrupo> =  async data =>  {
        mutate()
          closeModal()
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
            <button className="btn mt-4">Salvar</button>
        </form>
    )
}