import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createChatSessionUseCase } from '../factories/create-chat-session-use-case-factory'

export async function createChatSession(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/chat-sessions',
      {
        schema: {
          tags: ['Chat Sessions'],
          summary: 'Create Chat Session',
          body: z.object({
            email: z.string(),
            agent: z.string(),
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
        const { email, agent, topicId, subTopicId, chosenSubject } =
          request.body
        await createChatSessionUseCase.execute({
          email,
          agent,
          topicId,
          subTopicId,
          chosenSubject,
        })

        return reply.status(201).send()
      },
    )
}
