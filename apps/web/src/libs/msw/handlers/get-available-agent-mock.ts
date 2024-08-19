import { http, HttpResponse } from 'msw'

import { withCORS } from '../middlewares/with-cors'

export const getAvailableAgentMock = http.get(
  '*/api/agents/available',
  withCORS(async () => {
    const agents = [
      'Robert C. Martin',
      'Kent Beck',
      'Martin Fowler',
      'Sandy Metz',
      'Eric Evans',
    ]

    return HttpResponse.json({
      agent: agents[Math.floor(Math.random() * agents.length)],
    })
  }),
)
