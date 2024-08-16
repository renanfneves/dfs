import { UnprocessableEntityError } from '@/errors/unprocessable-entity-error'
import { InMemoryAgentsRepository } from '@/modules/agents/infra/repositories/in-memory-agents-repository'

import { GetAvailableAgentUseCase } from './get-available-agent-use-case'

let agentsRepository: InMemoryAgentsRepository
let sut: GetAvailableAgentUseCase

describe('GetAvailableAgentUseCase', async () => {
  beforeEach(() => {
    agentsRepository = new InMemoryAgentsRepository()
    sut = new GetAvailableAgentUseCase(agentsRepository)
  })

  it('should return all topics', async () => {
    const available = await sut.execute()

    expect(available).not.toBeNull()
    expect(
      agentsRepository.agents.some((agent) => agent.id === available.id),
    ).toBeTruthy()
  })

  it('should throw unprocessable entity error in case none agent if found', async () => {
    agentsRepository.agents = []

    await expect(() => sut.execute()).rejects.toBeInstanceOf(
      UnprocessableEntityError,
    )
  })
})
