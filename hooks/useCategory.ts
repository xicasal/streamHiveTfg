
import { fetcher } from '@/lib/fetcher'
import useSWR from 'swr'

export default function useCategory(category?: string) {
  const { data, mutate, error, isLoading } = useSWR(category ? `/api/categories/${category}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    mutate,
    error,
    isLoading,
  }
}
