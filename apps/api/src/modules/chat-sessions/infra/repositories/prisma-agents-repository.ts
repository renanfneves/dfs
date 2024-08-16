import { prisma } from '@/lib/prisma'
import { AgentsRepository } from '@/modules/chat-sessions/domain/repositories/agents-repository'

export class PrismaAgentsRepository implements AgentsRepository {
  async exists(id: string): Promise<boolean> {
    const agent = await prisma.agent.findUnique({
      where: { id },
    })

    return !!agent
  }
}
