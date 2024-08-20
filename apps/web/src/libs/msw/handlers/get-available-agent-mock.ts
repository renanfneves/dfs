import { http, HttpResponse } from 'msw'

import { MOCKED_AVAILABLE_AGENTS } from '../constants/agents'
import { withCORS } from '../middlewares/with-cors'

export const getAvailableAgentMock = http.get(
  '*/api/agents/available',
  withCORS(async () => {
    return HttpResponse.json({
      agent: MOCKED_AVAILABLE_AGENTS[Math.floor(Math.random() * MOCKED_AVAILABLE_AGENTS.length)],
    })
  }),
)
