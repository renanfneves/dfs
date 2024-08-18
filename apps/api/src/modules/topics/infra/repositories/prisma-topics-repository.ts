import { prisma } from '@/lib/prisma'
import { Topic } from '@/modules/topics/domain/aggregates/topic'
import { Subcategory } from '@/modules/topics/domain/models/subcategory'
import { TopicsRepository } from '@/modules/topics/domain/repositories/topics-repository'

export class PrismaTopicsRepository implements TopicsRepository {
  async getTopics() {
    const data = await prisma.topic.findMany({
      include: {
        category: true,
        subTopics: true,
      },
    })

    const topics = data.map((topic) =>
      Topic.restore(
        topic.id,
        topic.category.name,
        topic.subTopics.map(
          (subTopic) => new Subcategory(subTopic.id, subTopic.name, subTopic.suggestions),
        ),
      ),
    )

    return topics
  }
}
