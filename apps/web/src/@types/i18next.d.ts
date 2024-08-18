/* eslint-disable camelcase */
import { defaultNS } from '@/libs/i18n'
import { common, customer_support } from '@/libs/i18n/locales/pt'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: {
      common: typeof common
      customer_support: typeof customer_support
    }
  }
}
