import { Agent } from '../aggregates/agent'

export interface AgentsRepository {
  getAvailableAgent(): Promise<Agent | null>
}
