import './globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { queryClient } from './libs/react-query/query-client'
import { ReactQueryDevtools } from './libs/react-query/query-tools'
import { router } from './routes/router'

export function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Helmet titleTemplate="%s | Deutsche Fintech Solutions" />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}
