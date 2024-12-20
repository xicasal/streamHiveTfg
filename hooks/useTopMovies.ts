import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function useTopMovies() {
  const { data, error, isLoading } = useSWR('/api/movies/by-imdb', fetcher, {
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
