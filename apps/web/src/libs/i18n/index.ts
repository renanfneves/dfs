import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

import * as en from './locales/en'
import * as pt from './locales/pt'

export const defaultNS = 'common'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  defaultNS,
  resources: {
    pt,
    en,
  },
})

export { i18n, useTranslation }
