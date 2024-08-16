import { Agent } from '@/modules/agents/domain/aggregates/agent'
import { AgentsRepository } from '@/modules/agents/domain/repositories/agents-repository'

export class InMemoryAgentsRepository implements AgentsRepository {
  public agents: Agent[] = [
    Agent.restore('e1c6492c-ae5d-4d6e-a612-87a51519fb63', 'Robert C. Martin'),
    Agent.restore('80fcba4c-fde5-4c15-92a4-24163462debe', 'Martin Fowler'),
    Agent.restore('722b55fd-6535-4642-bba7-9ea93b0f1719', 'Richard Helm'),
    Agent.restore('90fcba4c-fde5-4c15-92a4-24163462debe', 'Erich Gamma'),
    Agent.restore('152f3fa8-d12b-4460-9c74-f423b463d76e', 'Ralph Johnson'),
    Agent.restore('f2f3fa8-d12b-4460-9c74-f423b463d76e', 'John Vlissides'),
  ]

  async getAvailableAgent() {
    const randomIndex = Math.floor(Math.random() * this.agents.length)

    return this.agents[randomIndex]
  }
}
