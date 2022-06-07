import { useQuery } from 'react-query'
import ajax from '../services/ajax'


export function useGet<T>(id: string, url: string )
{
    const {data, error, isLoading} = useQuery<T, Error>(id, async () => {        
        const {data} = await ajax.get(url)
        return data
    })

    return {data, error, isLoading}
}

export const usePost = async <T>(value: T, url: string) => {
    await ajax.post(url, value);  
  };   