import { http, HttpResponse } from 'msw'

import { withCORS } from '../middlewares/with-cors'

export const saveChatSessionMock = http.post(
  '*/api/chat-sessions',
  withCORS(async () => {
    return new HttpResponse(null, { status: 201 })
  }),
)
