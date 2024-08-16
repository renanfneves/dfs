import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { NotFoundError } from './errors/not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'
import { UnprocessableEntityError } from './errors/unprocessable-entity-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  console.error(error)
  if (error instanceof UnprocessableEntityError) {
    reply.status(422).send({ message: error.message })
  }

  if (error instanceof NotFoundError) {
    reply.status(404).send({ message: error.message })
  }

  if (error instanceof UnauthorizedError) {
    reply.status(401).send({ message: error.message })
  }

  reply.status(500).send({ message: 'Internal server error' })
}
