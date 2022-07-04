import { ArrowFatLineLeft, ArrowFatLineRight } from "phosphor-react";
import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import ajax from "../services/ajax"
import { queryClient } from "../services/queryClient"


interface IXPagination {
HaAnterior: boolean
HaProxima: boolean
PaginaAtual: number
PaginaTamanho: number
PaginaTotal: number
TotalDeItens: number
}



export const usePagination = <T,>(
    payload: string,
    url: string,   
  ) => {
  
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(50)
    const [paginationInfos, setPaginationInfos] = useState<IXPagination>({} as IXPagination );  


    const useGetWithPagination = () => {
      return useQuery<T>([payload, page], () => fetchPagination(), {
      keepPreviousData: true,
  });
};
  
    const nextPage = () => {
      if (page < paginationInfos.PaginaTotal)
      setPage(page + 1)
      console.log(paginationInfos) 
    }
  
    const previousPage = () => {
      if (page > 1)
      setPage(page - 1)  
    }  
  
    const fetchPagination = async () => {
      const { data } = await ajax.get(
        url + `?PaginaNumero=${page}&PaginaTamanho=${pageSize}`
      );
      return data;
    };
  
    const preFetchPagination = () => {
      queryClient.prefetchQuery([payload, page + 1], () => fetchPagination());
    };

    const getPaginationInfos = async () => {
        const x = await ajax
        .get(url + `?PaginaNumero=${page}&PaginaTamanho=${pageSize}`)
        .then((res) => {
          const header =  res.headers;  
          const xPagination =  JSON.parse(header['x-paginacao'])
          setPaginationInfos(xPagination)               
        })
      }   



const TableFooter = () => {
  return <tfoot className="h-auto rounded-b-lg bg-brand-primary text-light-100 truncate py-1 px-3">
    <tr className="flex justify-center items-center" >
      <td>
        <button onClick={previousPage}
        className="bg-light-300 p-1 rounded-lg shadow-md hover:bg-opacity-30 focus:outline-none
            transition duration-200"><ArrowFatLineLeft  size={16} color="#00466f" weight="fill"/></button>    
      </td>
      <td className="flex flex-1 items-center justify-center h-full">
        <span className="h-full">página {page} de {paginationInfos.PaginaTotal}</span> 
      </td>
      <td>
        <button 
        onClick={nextPage}
        className="bg-light-300 p-1 rounded-lg shadow-md hover:bg-opacity-30 focus:outline-none
            transition duration-200"><ArrowFatLineRight  size={16} color="#00466f" weight="fill"/></button>    
      </td>
    </tr>
  </tfoot>;
};
  
const {data, isLoading, error} = useGetWithPagination()

useEffect(() => {
  if (data) {
    preFetchPagination();
  }   
  getPaginationInfos();
}, [data]);


    return { fetchPagination, preFetchPagination, previousPage, nextPage, getPaginationInfos, useGetWithPagination, TableFooter, page, pageSize, paginationInfos, setPaginationInfos, data, isLoading };
  };

  
