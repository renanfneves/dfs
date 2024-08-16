import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/middlewares/auth'

import { createChatSessionUseCase } from '../factories/create-chat-session-use-case-factory'

export async function createChatSession(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/chat-sessions',
      {
        schema: {
          tags: ['Chat Sessions'],
          summary: 'Create Chat Session',
          security: [{ bearerAuth: [] }],
          body: z.object({
            userId: z.string(),
            agentId: z.string(),
            topicId: z.string(),
            subTopicId: z.string(),
            chosenSubject: z.string(),
          }),
          response: {
            201: z.object({}),
          },
        },
      },
      async (request, reply) => {
        const { userId, agentId, topicId, subTopicId, chosenSubject } =
          request.body
        await createChatSessionUseCase.execute({
          userId,
          agentId,
          topicId,
          subTopicId,
          chosenSubject,
        })

        return reply.status(201).send()
      },
    )
}
