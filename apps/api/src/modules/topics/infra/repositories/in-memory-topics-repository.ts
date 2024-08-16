import { Topic } from '@/modules/topics/domain/aggregates/topic'
import { TopicsRepository } from '@/modules/topics/domain/repositories/topics-repository'

export class InMemoryTopicsRepository implements TopicsRepository {
  public topics: Topic[] = [
    Topic.restore('h1c6492c-ae5d-4d6e-a612-87a51519fb64', 'Football', [
      {
        name: 'Premier League',
        suggestions: ['Liverpool', 'Man. United', 'Manchester City'],
      },
      {
        name: 'Serie A',
        suggestions: ['Milan', 'Inter', 'Juventus'],
      },
    ]),
    Topic.restore('70fcba4c-fde5-4c15-92a4-24163462debb', 'Books', [
      {
        name: 'Investment',
        suggestions: [
          'The Intelligent Investor - Benjamin Graham',
          'Rich Dad Poor Dad - Robert Kiyosaki',
        ],
      },
      {
        name: 'Children',
        suggestions: ['Momo - Michael Ende', 'BFG - Roald Dahl'],
      },
    ]),
  ]

  async getTopics() {
    return this.topics
  }
}
