import { InMemoryTopicsRepository } from '@/modules/topics/infra/repositories/in-memory-topics-repository'

import { GetTopicsUseCase } from './get-topics-use-case'

let topicsRepository: InMemoryTopicsRepository
let sut: GetTopicsUseCase

describe('GetTopicsUseCase', async () => {
  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    sut = new GetTopicsUseCase(topicsRepository)
  })

  it('should return all topics', async () => {
    const topics = await sut.execute()

    expect(topics.length).toEqual(topicsRepository.topics.length)
  })

  it('should return all topics with the correct structure', async () => {
    const topics = await sut.execute()

    topics.forEach((topic, index) => {
      expect(topic.id).toEqual(topicsRepository.topics[index].id)
      expect(topic.category).toEqual(topicsRepository.topics[index].category)
      expect(topic.subcategories).toEqual(
        topicsRepository.topics[index].subcategories,
      )
    })
  })
})
