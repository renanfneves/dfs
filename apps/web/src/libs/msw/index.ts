import { http } from 'msw'
import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { mswHandlers } from './handlers'

export const worker = setupWorker(...mswHandlers)

http.all('*', (req) => {
  req.request.headers.set('Access-Control-Allow-Origin', '*')
  req.request.headers.set('Access-Control-Allow-Methods', '*')
  req.request.headers.set('Access-Control-Allow-Headers', '*')
})

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
