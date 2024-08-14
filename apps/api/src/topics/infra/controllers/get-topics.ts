import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getTopics(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/topics',
    {
      schema: {
        tags: ['Topics'],
        summary: 'Get topics tree',
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
      return {
        topics: [
          {
            category: 'Football',
            subcategories: [
              {
                name: 'Premier League',
                suggestions: ['Liverpool', 'Man. United', 'Manchester City'],
              },
              {
                name: 'Serie A',
                suggestions: ['Milan', 'Inter', 'Juventus'],
              },
            ],
          },
          {
            category: 'Books',
            subcategories: [
              {
                name: 'Investment',
                suggestions: [
                  'The Intelligent Investor - Benjamin Graham',
                  'Rich Dad Poor Dad - - Robert Kiyosaki',
                ],
              },
              {
                name: 'Children',
                suggestions: ['Momo - Michael Ende', 'BFG - Roald Dahl'],
              },
            ],
          },
        ],
      }
    },
  )
}
