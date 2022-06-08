import { useMutation, useQuery } from "react-query";
import ajax from "../services/ajax";

export function useGet<T>(id: string, url: string) {
  const { data, error, isLoading } = useQuery<T, Error>(id, async () => {
    const { data } = await ajax.get(url);
    return data;
  });

  return { data, error, isLoading };
}

export const usePost = (url: string) => useMutation((value) => {
    return ajax.post(url, value);
  });

