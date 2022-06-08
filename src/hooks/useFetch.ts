import { useMutation, useQuery } from "react-query";
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

export const useCreate = (payload: string,  url: string) => {
  return useMutation((data: IFormGrupo) => {
    return ajax.post(url, data)}, {
    onSuccess: () => queryClient.invalidateQueries(payload)
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

export const useRemove = (payload: string,  url: string, id: number) => {
  return useMutation((id) => {
    return ajax.delete(`${url}/${String(id)}`)}, {
    onSuccess: () => queryClient.invalidateQueries(payload)
  })
} 
       
 
const deleteFornecedor = async (id: number) => {
  await ajax.delete(`grupos/${id}`);
};  


// const update = useMutation(
//     async (employee) => {
//         const { data } = await axios.put("/api/Employee", employee);
//         return data;
//     },
//     {
//         onSuccess: (updatedEmployee) => {
//             queryClient.setQueryData("employees", (currentEmployees) =>
//                 currentEmployees.map(
//                     (employee) => (employee.id === updatedEmployee.id
//                         ? updatedEmployee
//                         : employee)
//                 )
//             );
//         },
//     }
// );

// const remove = useMutation(
//     async (id) => {
//         const { data } = await axios.delete(`/api/Employee/${id}`);
//         return data;
//     },
//     {
//         onSuccess: (id) => {
//             queryClient.setQueryData("employees", (currentEmployees) =>
//                 currentEmployees.filter((employee) => employee.id !== id)
//             );
//         },
//     }
// );
