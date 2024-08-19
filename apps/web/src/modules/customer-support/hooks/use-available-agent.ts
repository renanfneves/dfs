import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/libs/react-query/query-keys"

import { getAvailableAgentApi } from "../api/get-available-agent-api"

export function useAvailableAgent(enabled: boolean = false) {
  const { data: agent = '', ...state } = useQuery({
    queryKey: [QUERY_KEYS.GET_AVAILABLE_AGENT],
    queryFn: getAvailableAgentApi,
    staleTime: Infinity,
    enabled
  });

  return {
    agent,
    ...state
  }
}
