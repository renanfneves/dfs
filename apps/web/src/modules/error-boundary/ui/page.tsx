import { useEffect } from 'react'
import { Link, useRouteError } from 'react-router-dom'

import { useTranslation } from '@/libs/i18n'
import { APP_ROUTES } from '@/routes/app-routes'

export const ErrorBoundary = () => {
  const error = useRouteError()
  const { t } = useTranslation()

  useEffect(() => {
    // TODO: Send error log to a tool ex.: Sentry
    console.log(error)
  }, [error])

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-between bg-primary">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl text-white" data-testid="notFoundPageTitle">
          {t('error_boundary.title')}
        </h1>
        <small className="text-center text-white">
          {t('error_boundary.description')}
        </small>
        <Link
          to={APP_ROUTES.BASE_PATH}
          className="text-zinc-200 underline"
          data-testid="goToForgotPasswordLink"
        >
          {t('go_to_home')}
        </Link>
      </div>
    </main>
  )
}
