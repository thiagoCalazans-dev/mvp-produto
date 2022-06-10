import { Trash } from "phosphor-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRemove, useUpdate } from "../../../hooks/useFetch";
import { IGrupo } from "../../../interface/Grupo";


interface Iprops {
    closeModal: () => void  
    initialData: IGrupo
    urlParams: string
}



export const FormDetailsGrupo = ({closeModal, initialData, urlParams}: Iprops) => {
    
    const { register, handleSubmit } = useForm<IGrupo>({defaultValues: initialData})
    const {mutate: updateMutate, isLoading} = useUpdate('grupos', `grupos/${urlParams}`, "Grupos alterado com sucesso")
    const {mutate: removeMutate} = useRemove('grupos', `grupos/${urlParams}`)   

    const onSubmit: SubmitHandler<IGrupo> =  async grupo =>  {
            await updateMutate(grupo)
            !isLoading && closeModal()            
    }

    const HandleDeleteClick = async () => {
            console.log(initialData)
             await removeMutate(initialData)
            !isLoading && closeModal() 
             }

    return (
        <>    
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>  
        <div className="form-control">
                <label  className="label"htmlFor="id">Id:</label>
                <input disabled className="input" id="id" type="text"  {...register("id")}/>               
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
            <button type="submit" className="btn-outlined grow">Editar</button>  
            <button type="button" onClick={() => HandleDeleteClick()} className="btn-contrast"><Trash/></button>        
            </div>
        </form>         
        </>      
 )
}