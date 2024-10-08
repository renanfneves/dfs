import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getTopicsUseCase } from '../factories/get-topics-use-case-factory'

export async function getTopics(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get(
      '/topics',
      {
        schema: {
          tags: ['Topics'],
          summary: 'Get topics tree',
          response: {
            200: z.object({
              topics: z.array(
                z.object({
                  id: z.string(),
                  category: z.string(),
                  subcategories: z.array(
                    z.object({
                      id: z.string(),
                      name: z.string(),
                      suggestions: z.array(z.string()),
                    }),
                  ),
                }),
              ),
            }),
          },
        },
      },
      async () => {
        const topics = await getTopicsUseCase.execute()

        return {
          topics,
        }
      },
    )
}
