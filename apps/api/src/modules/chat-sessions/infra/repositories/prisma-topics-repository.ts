import { prisma } from '@/lib/prisma'
import { Topic } from '@/modules/chat-sessions/domain/aggregates/topic'
import { TopicsRepository } from '@/modules/chat-sessions/domain/repositories/topics-repository'

export class PrismaTopicsRepository implements TopicsRepository {
  async getById(id: string): Promise<Topic | null> {
    const data = await prisma.topic.findUnique({
      where: { id },
      include: { subTopics: true, category: true },
    })

    if (!data) {
      return null
    }

    const topic = new Topic(
      data.id,
      data.category.name,
      data.subTopics.map((subTopic) => ({
        id: subTopic.id,
        name: subTopic.name,
        suggestions: subTopic.suggestions,
      })),
    )

    return topic
  }
}
