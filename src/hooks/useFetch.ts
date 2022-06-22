import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import ajax from "../services/ajax";
import { queryClient } from "../services/queryClient";

export const useGet = <T>(payload: string, url: string) => {
  const { data, error, isLoading, isFetching } = useQuery<T, Error>(payload, async () => {
    const { data } = await ajax.get(url);
    return data;
  });

  return { data, error, isLoading, isFetching };
}

export const useGetById = <T>(payload: string, id: string, url: string) => {
  const { data, error, isLoading } = useQuery<T, Error>([payload, id], async () => {
    const { data } = await ajax.get(`${url}/${id}`);
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
  onError: (error: Error) => {
    toast.error(error.name)
    console.log(error)
  }
  })
} 

export const useRemove = <T>(payload: string,  url: string, closeModal?: () => void) => {
  return useMutation((data: T) => {
    return ajax.delete(url, data)}, {
      onSuccess: () => {queryClient.invalidateQueries(payload);
      toast.success('Removido com sucesso');
      closeModal && closeModal();
     },
    onError: (error: Error) => {
    toast.error('ocorreu um erro' + error.message)
    console.log(error)
    }
  },
  )
}

export const useUpdate = <T>(payload: string,  url: string, onSuccessMessage:string, closeModal?: () => void) => {
  return useMutation((data: T) => {
    return ajax.put(url, data)}, {
      onSuccess: () => {queryClient.invalidateQueries(payload);
        toast.success(`${onSuccessMessage}`)
        closeModal && closeModal();
     },
    onError: (error) => {
      toast.error('ocorreu um erro')
      console.log(error)
    },
  })
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

