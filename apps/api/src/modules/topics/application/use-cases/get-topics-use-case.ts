import { Topic } from '@/modules/topics/domain/aggregates/topic'
import { TopicsRepository } from '@/modules/topics/domain/repositories/topics-repository'

export class GetTopicsUseCase {
  constructor(private readonly topicsRepository: TopicsRepository) {}

  async execute(): Promise<Topic[]> {
    const data = await this.topicsRepository.getTopics()

    const topics = data.map((topic) => {
      return Topic.restore(topic.id, topic.category, topic.subcategories)
    })

    return topics
  }
}
