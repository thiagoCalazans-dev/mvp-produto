import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import ajax from "../services/ajax";
import { queryClient } from "../services/queryClient";


export const useGet = <T>(payload: string, url: string) => {
 return  useQuery<T, Error>(payload, async () => {
    const { data } = await ajax.get(url);
    return data;
  });


}

export const useGetById = <T>(payload:string, baseUrl:string, id?:string | string[]) => {
  const { data, error, isLoading } = useQuery<T, Error>([payload, id], async () => {
    const { data } = await ajax.get(`${baseUrl}/${id}`);
    return data;
  });

  return { data, error, isLoading };
}

export const useCreate = <T>(payload: string,  url: string) => {
  const {isLoading: createLoading, mutateAsync: createMutateAsync }=  useMutation((data: T) => {
    return ajax.post(url, data)}, {
    onSuccess: () => {queryClient.invalidateQueries(payload);
   },
  onError: (error: Error) => {
     toast.error(error.message)
  }
  })
  return {createLoading, createMutateAsync}
} 

export const useRemove = <T>(payload: string,  url: string, params:string) => {
  const {isLoading: removeLoading, mutateAsync: removeMutateAsync } = useMutation((data: T) => {
    const fullUrl = `${url}/${params}`   
    return ajax.delete(fullUrl, data)}, {
      onSuccess: () => {queryClient.invalidateQueries(payload);    
      },

    onError: (error: Error) => {  
      toast.error(error.message)
    }
  },
  )
  return {removeLoading, removeMutateAsync}
}

export const useUpdate = <T>(payload: string,  url: string, params:string) => {
  const {isLoading: updateLoading, mutateAsync: updateMutateAsync } = useMutation((data: T,) => {
    const fullUrl = `${url}/${params}`   
    return ajax.put(fullUrl, data)}, {
      onSuccess: () => {queryClient.invalidateQueries(payload);
            },
            onError: (error: Error) => {  
      toast.error(error.message)
    },
  
  })
  return {updateLoading, updateMutateAsync}
} 
     

//nao funciona - precisa melhorar a tipagem
export const useOptimisticCreate = <T>(payload: string, url: string, onSuccessMessage: string, closeModal?: ()=>void) => {
  return useMutation(
    (data: T) => {
      return ajax.post(url, data);
    },
    {
      onMutate: async (newData) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(payload);

        // Snapshot the previous value
        const previousData =
          queryClient.getQueryData(payload);

        // optimistically update
        queryClient.setQueryData(payload, newData);

        return { previousData };
      },
      onSuccess: (data) => {     
        queryClient.invalidateQueries(payload);
        toast.success(`${onSuccessMessage}`);
        //   queryClient.setQueryData('person', data);
        return console.log('mutation data', data);
      },
      onError: (error: Error, context: any) => {
        console.log('error: ', error.message);
        queryClient.setQueryData(payload, context?.previousData);
        return console.log(`rolling back optimistic update with id: ${context?.previousData?.id}`);
      },   
    }
  );
};

