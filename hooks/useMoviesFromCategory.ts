
import { fetcher } from '@/lib/fetcher'
import useSWR from 'swr'

export default function useMoviesFromCategory(id?: string) {
  const { data, mutate, error, isLoading } = useSWR(id ? `/api/my-list/categories/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    refreshInterval: 3000,
    revalidateOnReconnect: false,
  })

  return {
    data,
    mutate,
    error,
    isLoading,
  }
}
