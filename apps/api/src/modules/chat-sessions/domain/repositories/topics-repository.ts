import { Topic } from '../aggregates/topic'

export interface TopicsRepository {
  getById(id: string): Promise<Topic | null>
}
