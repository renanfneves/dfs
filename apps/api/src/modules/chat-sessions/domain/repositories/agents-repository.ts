import { Agent } from "../aggregates/agent"

export interface AgentsRepository {
  getByName(name: string): Promise<Agent | null>
}
