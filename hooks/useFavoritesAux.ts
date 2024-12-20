
import { fetcher } from '@/lib/fetcher'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function useFavoritesAux() {
  const { data, mutate, error, isLoading } = useSWR('/api/my-list', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  return {
    data,
    mutate,
    error,
    isLoading,
  }
}
