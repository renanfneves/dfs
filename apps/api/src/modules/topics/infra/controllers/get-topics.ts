import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/middlewares/auth'

import { getTopicsUseCase } from '../factories/get-topics-use-case-factory'

export async function getTopics(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/topics',
      {
        schema: {
          tags: ['Topics'],
          summary: 'Get topics tree',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              topics: z.array(
                z.object({
                  category: z.string(),
                  subcategories: z.array(
                    z.object({
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
