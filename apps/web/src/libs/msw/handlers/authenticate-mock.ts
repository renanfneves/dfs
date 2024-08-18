import { http, HttpResponse } from 'msw'

import { withCORS } from '../middlewares/with-cors'

export const authenticateMock = http.post(
  '*/api/authenticate',
  withCORS(async () => {
    return HttpResponse.json({
      token: '123456789'
    })
  }),
)
