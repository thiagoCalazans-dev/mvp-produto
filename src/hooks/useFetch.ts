import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import ajax from "../services/ajax";
import { queryClient } from "../services/queryClient";


export const useFetch = <T>(payload: string,  url: string, params: string) => {
   const useCreate = <T>() => {
    const {isLoading: createLoading, mutateAsync: createAsync }=  useMutation((data: T) => {
      return ajax.post(url, data)}, {
      onSuccess: () => {queryClient.invalidateQueries(payload);
     },
    onError: (error: Error) => {
       toast.error(error.message)
    }
    })
    return {createLoading, createAsync}
  }
  
  const useRemove = <T>() => {
    const {isLoading: removeLoading, mutateAsync: removeAsync } = useMutation((data: T) => {
      const fullUrl = `${url}/${params}`
      return ajax.delete(fullUrl, data)}, {
        onSuccess: () => {queryClient.invalidateQueries(payload);
        },
  
      onError: (error: Error) => {
        toast.error(error.message)
      }
    },
    )
    return {removeLoading, removeAsync}
  }

const useUpdate = <T>() => {
    const {isLoading: updateLoading, mutateAsync: updateAsync } = useMutation((data: T,) => {
      const fullUrl = `${url}/${params}`
      return ajax.put(fullUrl, data)}, {
        onSuccess: () => {queryClient.invalidateQueries(payload);
              },
              onError: (error: Error) => {
        toast.error(error.message)
      },
  
    })
    return {updateLoading, updateAsync}
  }

  const useGet = <T>() => {
    return  useQuery<T, Error>(payload, async () => {
       const { data } = await ajax.get(url);
       return data
     });
   }
  
  const useGetById = <T>(id?:string | string[]) => {
    const { data, error, isLoading } = useQuery<T, Error>([payload, id], async () => {
      const { data } = await ajax.get(`${url}${params}`);
      return data;
    });
    return { data, error, isLoading };
  }

  const {createLoading, createAsync} = useCreate()
  const {removeLoading, removeAsync} = useRemove()
  const {updateLoading, updateAsync} = useUpdate()


  return {createLoading, removeLoading, updateLoading, createAsync, removeAsync, updateAsync, useGet, useGetById}
}

// export const useCreate = <T>(payload: string,  url: string) => {
//   const {isLoading: createLoading, mutateAsync: createMutateAsync }=  useMutation((data: T) => {
//     return ajax.post(url, data)}, {
//     onSuccess: () => {queryClient.invalidateQueries(payload);
//    },
//   onError: (error: Error) => {
//      toast.error(error.message)
//   }
//   })
//   return {createLoading, createMutateAsync}
// }

// export const useRemove = <T>(payload: string,  url: string, params:string) => {
//   const {isLoading: removeLoading, mutateAsync: removeMutateAsync } = useMutation((data: T) => {
//     const fullUrl = `${url}/${params}`
//     return ajax.delete(fullUrl, data)}, {
//       onSuccess: () => {queryClient.invalidateQueries(payload);
//       },

//     onError: (error: Error) => {
//       toast.error(error.message)
//     }
//   },
//   )
//   return {removeLoading, removeMutateAsync}
// }

// export const useUpdate = <T>(payload: string,  url: string, params:string) => {
//   const {isLoading: updateLoading, mutateAsync: updateMutateAsync } = useMutation((data: T,) => {
//     const fullUrl = `${url}/${params}`
//     return ajax.put(fullUrl, data)}, {
//       onSuccess: () => {queryClient.invalidateQueries(payload);
//             },
//             onError: (error: Error) => {
//       toast.error(error.message)
//     },

//   })
//   return {updateLoading, updateMutateAsync}
// }
