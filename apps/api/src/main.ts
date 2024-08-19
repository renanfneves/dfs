import 'dotenv/config'

import fastifyCors from '@fastify/cors'
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

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

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
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

const API_PREFIX = '/api'

app.register(getAvailableAgent, { prefix: API_PREFIX })
app.register(getTopics, { prefix: API_PREFIX })
app.register(createChatSession, { prefix: API_PREFIX })

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`Server listening at 3000`)
})
