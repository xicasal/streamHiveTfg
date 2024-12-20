
import { fetcher } from '@/lib/fetcher'
import useSWR from 'swr'

export default function useCategoriesFromMyList() {
  const { data, error, isLoading, mutate } = useSWR('/api/my-list/categories', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
