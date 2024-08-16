import { UnprocessableEntityError } from '@/errors/unprocessable-entity-error'
import { AgentsRepository } from '@/modules/agents/domain/repositories/agents-repository'

export class GetAvailableAgentUseCase {
  constructor(private agentsRepository: AgentsRepository) {}

  async execute() {
    const availableAgent = await this.agentsRepository.getAvailableAgent()

    if (!availableAgent) {
      throw new UnprocessableEntityError('No agents available')
    }

    return availableAgent
  }
}
