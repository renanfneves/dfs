import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authenticateUseCase } from '../factories/authenticate-use-case-factory'

export async function authenticateWithIp(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users/authenticate-with-ip',
    {
      schema: {
        tags: ['Users'],
        summary: 'Authenticate with User IP Address',
        body: z.object({
          ip: z.string().ip({ version: 'v4' }),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { ip } = request.body

      const user = await authenticateUseCase.execute({ ip })

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
