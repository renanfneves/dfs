import { CreateChatSessionUseCase } from '@/modules/chat-sessions/application/use-cases/create-chat-session-use-case'

import { PrismaAgentsRepository } from '../repositories/prisma-agents-repository'
import { PrismaChatSessionsRepository } from '../repositories/prisma-chat-sessions-repository'
import { PrismaTopicsRepository } from '../repositories/prisma-topics-repository'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

const chatSessionsRepository = new PrismaChatSessionsRepository()
const topicsRepository = new PrismaTopicsRepository()
const agentsRepository = new PrismaAgentsRepository()
const usersRepository = new PrismaUsersRepository()
export const createChatSessionUseCase = new CreateChatSessionUseCase(
  chatSessionsRepository,
  topicsRepository,
  agentsRepository,
  usersRepository,
)
