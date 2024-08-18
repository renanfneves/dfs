import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

import { QUERY_KEYS } from "@/libs/react-query/query-keys"

import { getTopicsApi } from "../api/get-topics-api"

export function usePrefetchTopics() {
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.GET_TOPICS],
      queryFn: getTopicsApi,
    })
  }, [queryClient])
}