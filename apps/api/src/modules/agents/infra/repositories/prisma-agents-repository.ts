import { prisma } from '@/lib/prisma'
import { Agent } from '@/modules/agents/domain/aggregates/agent'
import { AgentsRepository } from '@/modules/agents/domain/repositories/agents-repository'

interface RawAgent {
  id: string
  name: string
}

export class PrismaAgentsRepository implements AgentsRepository {
  async getAvailableAgent() {
    const agents = await prisma.$queryRaw<RawAgent[]>`
    SELECT 
      a.id, a.name
    FROM agents a
    LEFT JOIN (
      SELECT "agentId", COUNT(*) as active_sessions
      FROM chat_sessions
      WHERE status IN ('open', 'inProgress')
      GROUP BY "agentId"
    ) cs ON a.id = cs."agentId"
    ORDER BY cs.active_sessions ASC NULLS FIRST
    LIMIT 1;
  `

    if (agents.length === 0) {
      return null
    }

    const [agent] = agents
    return Agent.restore(agent.id, agent.name)
  }
}
