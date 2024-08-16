import { SubTopic } from '../models/sub-topic'

export class Topic {
  constructor(
    public readonly id: string,
    public readonly category: string,
    public readonly subTopics: SubTopic[],
  ) {}
}
