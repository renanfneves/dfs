import { UnprocessableEntityError } from '@/errors/unprocessable-entity-error'
import { ChatSession } from '@/modules/chat-sessions/domain/aggregates/chat-session'
import { AgentsRepository } from '@/modules/chat-sessions/domain/repositories/agents-repository'
import { ChatSessionsRepository } from '@/modules/chat-sessions/domain/repositories/chat-sessions-repository'
import { TopicsRepository } from '@/modules/chat-sessions/domain/repositories/topics-repository'
import { UsersRepository } from '@/modules/chat-sessions/domain/repositories/users-repository'

export interface Input {
  userId: string
  agentId: string
  topicId: string
  subTopicId: string
  chosenSubject: string
}

export class CreateChatSessionUseCase {
  constructor(
    private readonly chatSessionsRepository: ChatSessionsRepository,
    private readonly topicsRepository: TopicsRepository,
    private readonly agentsRepository: AgentsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    agentId,
    topicId,
    subTopicId,
    chosenSubject,
  }: Input): Promise<void> {
    const topic = await this.topicsRepository.getById(topicId)

    if (!topic) {
      throw new UnprocessableEntityError('Invalid topic')
    }

    const subTopic = topic.subTopics.find(
      (subTopic) => subTopic.id === subTopicId,
    )

    if (!subTopic) {
      throw new UnprocessableEntityError('Invalid subtopic')
    }

    if (!subTopic.suggestions.includes(chosenSubject)) {
      throw new UnprocessableEntityError('Invalid chosen subject')
    }

    const agentExists = await this.agentsRepository.exists(agentId)
    const userExists = await this.usersRepository.exists(userId)

    if (!agentExists || !userExists) {
      throw new UnprocessableEntityError('Invalid entity')
    }

    const chatSession = ChatSession.create(
      topic.id,
      subTopic.id,
      chosenSubject,
      agentId,
      userId,
    )

    await this.chatSessionsRepository.create(chatSession)
  }
}
