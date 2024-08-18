import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/libs/react-query/query-keys";

import { getTopicsApi } from "../api/get-topics-api";

export function useTopics() {
  const { data, ...state } = useQuery({
    queryKey: [QUERY_KEYS.GET_TOPICS],
    queryFn: getTopicsApi
  });

  const topics = data ?? [] as Topic[]

  return {
    topics,
    ...state
  };
}