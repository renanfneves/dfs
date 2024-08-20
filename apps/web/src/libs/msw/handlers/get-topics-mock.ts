import { http, HttpResponse } from 'msw'

import { MOCKED_TOPICS } from '../constants/topics'
import { withCORS } from '../middlewares/with-cors'

export const getTopicsMock = http.get(
  '*/api/topics',
  withCORS(async () => {
    return HttpResponse.json({
      topics: MOCKED_TOPICS
    })
  }),
)
