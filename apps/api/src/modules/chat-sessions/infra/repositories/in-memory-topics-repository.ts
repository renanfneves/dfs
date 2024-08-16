import { Topic } from '@/modules/chat-sessions/domain/aggregates/topic'
import { TopicsRepository } from '@/modules/chat-sessions/domain/repositories/topics-repository'

export class InMemoryTopicsRepository implements TopicsRepository {
  public topics: Topic[] = [
    new Topic('h1c6492c-ae5d-4d6e-a612-87a51519fb64', 'Football', [
      {
        id: '1',
        name: 'Premier League',
        suggestions: ['Liverpool', 'Man. United', 'Manchester City'],
      },
    ]),
  ]

  async getById(id: string) {
    const topic = this.topics.find((topic) => topic.id === id)

    return topic ?? null
  }
}
