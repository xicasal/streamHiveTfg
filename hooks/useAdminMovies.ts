import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function useAdminMovies() {
  const { data, isLoading, error, mutate } = useSWR('/api/admin-movies', fetcher, {
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
