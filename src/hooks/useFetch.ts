import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { IFormGrupo } from "../interface/Grupo";
import ajax from "../services/ajax";
import { queryClient } from "../services/queryClient";

export const useGet = <T>(payload: string, url: string) => {
  const { data, error, isLoading } = useQuery<T, Error>(payload, async () => {
    const { data } = await ajax.get(url);
    return data;
  });

  return { data, error, isLoading };
}

export const useCreate = <T>(payload: string,  url: string, onSuccessMessage:string) => {
  return useMutation((data: T) => {
    return ajax.post(url, data)}, {
    onSuccess: () => {queryClient.invalidateQueries(payload);
      toast.success(`${onSuccessMessage}`);
   },
  onError: (error) => {
    toast.error(`${error}`)
  }
  })
} 

export const useRemove = <T>(payload: string,  url: string) => {
  return useMutation((data: T) => {
    return ajax.delete(url, data)}, {
      onSuccess: () => {queryClient.invalidateQueries(payload);
        toast.success('Removido com sucesso');
     },
    onError: (error) => {
    toast.error('ocorreu um erro' + error)
    }
  },
  )
}

export const useUpdate = <T>(payload: string,  url: string, onSuccessMessage:string) => {
  return useMutation((data: T) => {
    return ajax.put(url, data)}, {
      onSuccess: () => {queryClient.invalidateQueries(payload);
        toast.success(`${onSuccessMessage}`);
     },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })
} 
     

//Optimistic
// export const useCreate =<T,U> (payload: string,  url: string) => {
//   return useMutation((data: T) => {
//     return ajax.post(url, data)}, {
//    onMutate: async (newData) => {
//      await queryClient.cancelQueries(payload)
//      const previousData = queryClient.getQueryData(payload)
//      queryClient.setQueryData(payload, (oldListData: U[]) => {
//         return {
//          ...oldListData,
//          data: [
//           ...oldListData, {
//             id: oldListData?.data?.length + 1, ...newData            
//           }          
//          ] 
//         }       
//      })
//    }
//   })
// } 

