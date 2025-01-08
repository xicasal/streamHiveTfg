
import { fetcher } from '@/lib/fetcher'
import useSWR from 'swr'

export default function useCommentsByMovie(movieId: string) {
  const { data, isLoading, error, mutate } = useSWR(`/api/comments/${movieId}`, fetcher , {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    isLoading,
    error,
    mutate
  }
}
