import { GetAvailableAgentUseCase } from '@/modules/agents/application/use-case/get-available-agent-use-case'

import { PrismaAgentsRepository } from '../repositories/prisma-agents-repository'

const agentsRepository = new PrismaAgentsRepository()

export const getAvailableAgentUseCase = new GetAvailableAgentUseCase(
  agentsRepository,
)
