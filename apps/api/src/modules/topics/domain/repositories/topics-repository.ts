import { Topic } from '../aggregates/topic'

export interface TopicsRepository {
  getTopics(): Promise<Topic[]>
}
