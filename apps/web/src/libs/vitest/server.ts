import { setupServer } from 'msw/node'

import { mswHandlers } from '../msw/handlers'

export const server = setupServer(...mswHandlers)

server.events.on('response:mocked', async ({ request, response }) => {
  console.log({
    request: request.url,
    statusCode: response.status,
  })
})
