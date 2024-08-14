import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getAgents(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/agents',
    {
      schema: {
        tags: ['Agents'],
        summary: 'Get available agent to respond chat messages',
        response: {
          200: z.object({
            name: z.string(),
          }),
        },
      },
    },
    async () => {
      return { name: 'Agent' }
    },
  )
}
