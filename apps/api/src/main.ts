import 'dotenv/config'

import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from './env'
import { errorHandler } from './errors-handler'
import { getAvailableAgent } from './modules/agents/infra/controllers/get-available-agent'
import { createChatSession } from './modules/chat-sessions/infra/controllers/create-chat-session'
import { getTopics } from './modules/topics/infra/controllers/get-topics'
import { authenticateWithIp } from './modules/users/infra/controllers/authenticate-with-ip'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'DFS API',
      description: 'Monolithic API for DFS',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(getAvailableAgent)
app.register(getTopics)
app.register(authenticateWithIp)
app.register(createChatSession)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`Server listening at 3000`)
})
