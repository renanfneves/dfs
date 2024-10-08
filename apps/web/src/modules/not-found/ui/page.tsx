import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { useTranslation } from '@/libs/i18n'
import { APP_ROUTES } from '@/routes/app-routes'

export function NotFound() {
  const { t } = useTranslation()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Helmet title="404" />
      <h1>{t('not_found.title')}</h1>
      <p>{t('not_found.description')}</p>
      <Link to={APP_ROUTES.BASE_PATH}>{t('go_home')}</Link>
    </main>
  )
}
