import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, RenderOptions } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { afterEach } from 'vitest'

type RenderWithRouterOptions = {
  route?: string
} & RenderOptions

afterEach(() => {
  cleanup()
})

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export function renderTestWithProviders(
  ui: React.ReactElement,
  { route = '/', ...renderOptions }: RenderWithRouterOptions = {}
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <HelmetProvider>
        <MemoryRouter initialEntries={[route]}>
          <QueryClientProvider client={testQueryClient}>
            {children}
          </QueryClientProvider>
        </MemoryRouter>
      </HelmetProvider>
    ),
    ...renderOptions,
  })
}
