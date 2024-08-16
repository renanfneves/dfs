import { prisma } from '@/lib/prisma'
import { AgentsRepository } from '@/modules/chat-sessions/domain/repositories/agents-repository'
import { Agent } from '@/modules/chat-sessions/domain/aggregates/agent'

export class PrismaAgentsRepository implements AgentsRepository {
  async getByName(name: string) {
    const agent = await prisma.agent.findUnique({
      where: { name },
    })

    return agent
  }
}
