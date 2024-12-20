
import { fetcher } from '@/lib/fetcher'
import useSWR from 'swr'

export default function useSearchMovies(target?: string) {
  const { data, error, isLoading } =  useSWR(target ? `/api/search/${target}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    error,
    isLoading,
  }
}
