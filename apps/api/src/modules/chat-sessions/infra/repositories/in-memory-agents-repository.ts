import { Agent } from '@/modules/chat-sessions/domain/aggregates/agent'
import { AgentsRepository } from '@/modules/chat-sessions/domain/repositories/agents-repository'

export class InMemoryAgentsRepository implements AgentsRepository {
  public agents: Agent[] = [
    new Agent('a1c6492c-ae5d-4d6e-a612-87a51519fb64', 'John Doe'),
  ]

  async getByName(name: string) {
    const agent = this.agents.find((agent) => agent.name === name)

    return agent || null
  }
}
