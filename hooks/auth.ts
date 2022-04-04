import useSWR, { Key } from 'swr';
import { userFetcher } from '../api/auth';

const useUser = () => {
    const url: Key = '/auth'
    const { data, error } = useSWR(url, userFetcher)
    return {
        data: data,
        error: error
    }   
}

export { useUser}