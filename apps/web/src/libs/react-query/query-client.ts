import { QueryClient } from '@tanstack/react-query'

export const DEFAULT_STALE_TIME = 1000 * 60 * 60 // 1 hour

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: DEFAULT_STALE_TIME
    },
  },
})

