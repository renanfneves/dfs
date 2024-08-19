import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getAvailableAgentUseCase } from '../factories/get-available-agent-use-case-factory'

export async function getAvailableAgent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get(
      '/agents/available',
      {
        schema: {
          tags: ['Agents'],
          summary: 'Get an available agent to respond to chat messages',
          response: {
            200: z.object({
              agent: z.string(),
            }),
          },
        },
      },
      async () => {
        const agent = await getAvailableAgentUseCase.execute()

        return { agent: agent.name }
      },
    )
}
