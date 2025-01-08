import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function useAdminUsers() {
  const { data, error, isLoading, mutate } = useSWR('/api/admin-users', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    error,
    isLoading,
    mutate
  }
}
