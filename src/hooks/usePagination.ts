import { useState } from "react"
import { useQuery } from "react-query";
import ajax from "../services/ajax"
import { queryClient } from "../services/queryClient"

export const usePagination = (
    payload: string,
    url: string,
    totalPages: number
  ) => {
  
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(50)
  
  
    const nextPage = () => {
      if (page < totalPages)
      setPage(page + 1)  
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

    
    const useGetWithPagination = <T>() => {
      return useQuery<T, Error>([payload, page], () => fetchPagination(), {
        keepPreviousData: true,
      });
    };
  
    return { fetchPagination, preFetchPagination, useGetWithPagination, previousPage, nextPage, page, pageSize };
  };