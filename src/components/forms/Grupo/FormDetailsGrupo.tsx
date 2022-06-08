import { Trash } from "phosphor-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IGrupo } from "../../../interface/Grupo";
import { Loading } from "../../Loading";

interface Iprops {
    closeModal: () => void  
}


export const FormDetailsGrupo = ({closeModal}: Iprops) => {

    const { register, handleSubmit } = useForm<IGrupo>()
    // const {mutate, isLoading} = useUpdate('grupos', 'grupos')
    const [isEditable, setIsEditable] = useState<boolean>(false)


    const onSubmit: SubmitHandler<IGrupo> =  async data =>  {
            // await mutate(data)
            // !isLoading && closeModal()
            console.log(data)
    }

    return (
        <>
        {isEditable ?      
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>  
        <div className="form-control">
                <label  className="label"htmlFor="id">Id:</label>
                <input  className="input" id="id" type="text"  {...register("id")}/>               
            </div>         
            <div className="form-control">
                <label className="label"htmlFor="">Código:</label>
                <input className="input" type="text"  {...register("codigo")}/>               
            </div>
            <div className="form-control">
                <label className="label"htmlFor="">Descrição:</label>
                <input className="input" type="text" {...register("descricao")} />
            </div>
            <div className="flex w-full gap-x-2 mt-4">
            <button type="button" onClick={() => setIsEditable(!isEditable)} className="btn grow">{`Salvar`}</button>            
            </div>
        </form>
        :
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>  
        <div className="form-control">
                <label  className="label"htmlFor="id">Id:</label>
                <input disabled className="input" id="id" type="text"  {...register("id")}/>               
            </div>         
            <div className="form-control">
                <label className="label"htmlFor="">Código:</label>
                <input disabled className="input" type="text"  {...register("codigo")}/>               
            </div>
            <div className="form-control">
                <label className="label"htmlFor="">Descrição:</label>
                <input disabled className="input" type="text" {...register("descricao")} />
            </div>
            <div className="flex w-full gap-x-2 mt-4">
            <button type="button" onClick={() => setIsEditable(!isEditable)} className="btn-outlined grow">{`Editar`}</button>          
            </div>
        </form>  
        }
        </>      
                          )
}