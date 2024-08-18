import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/components/layout/app-layout'
import { CustomerSupport } from '@/modules/customer-support/ui/page'
import { ErrorBoundary } from '@/modules/error-boundary/ui/page'
import { NotFound } from '@/modules/not-found/ui/page'

import { APP_ROUTES } from './app-routes'

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.BASE_PATH,
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [{ path: APP_ROUTES.BASE_PATH, element: <CustomerSupport /> }],
  },
  { path: APP_ROUTES.NOT_FOUND, element: <NotFound /> },
])
