import { UnprocessableEntityError } from '@/errors/unprocessable-entity-error'
import { InMemoryAgentsRepository } from '@/modules/chat-sessions/infra/repositories/in-memory-agents-repository'
import { InMemoryChatSessionsRepository } from '@/modules/chat-sessions/infra/repositories/in-memory-chat-sessions-repository'
import { InMemoryTopicsRepository } from '@/modules/chat-sessions/infra/repositories/in-memory-topics-repository'
import { InMemoryUsersRepository } from '@/modules/chat-sessions/infra/repositories/in-memory-users-repository'

import { CreateChatSessionUseCase } from './create-chat-session-use-case'

let chatSessionsRepository: InMemoryChatSessionsRepository
let topicsRepository: InMemoryTopicsRepository
let agentsRepository: InMemoryAgentsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateChatSessionUseCase

describe('CreateChatSessionUseCase', () => {
  beforeEach(() => {
    chatSessionsRepository = new InMemoryChatSessionsRepository()
    topicsRepository = new InMemoryTopicsRepository()
    agentsRepository = new InMemoryAgentsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateChatSessionUseCase(
      chatSessionsRepository,
      topicsRepository,
      agentsRepository,
      usersRepository,
    )
  })

  it('should create a chat session', async () => {
    const topic = topicsRepository.topics[0]
    const subTopic = topic.subTopics[0]
    const agent = agentsRepository.agents[0]
    const user = usersRepository.users[0]

    await sut.execute({
      userId: user.id,
      agentId: agent.id,
      topicId: topic.id,
      subTopicId: subTopic.id,
      chosenSubject: subTopic.suggestions[0],
    })

    const chatSessions = await chatSessionsRepository.getManyByUsedId(user.id)

    expect(chatSessions).toHaveLength(1)
  })

  it('should throw an error if the topic does not exist', async () => {
    await expect(
      sut.execute({
        userId: '1',
        agentId: '1',
        topicId: '1',
        subTopicId: '1',
        chosenSubject: '1',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })

  it('should throw an error if the subtopic does not exist', async () => {
    const topic = topicsRepository.topics[0]

    await expect(
      sut.execute({
        userId: '1',
        agentId: '1',
        topicId: topic.id,
        subTopicId: '1',
        chosenSubject: '1',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })

  it('should throw an error if the chosen subject is invalid', async () => {
    const topic = topicsRepository.topics[0]
    const subTopic = topic.subTopics[0]

    await expect(
      sut.execute({
        userId: '1',
        agentId: '1',
        topicId: topic.id,
        subTopicId: subTopic.id,
        chosenSubject: '1',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })

  it('should throw an error if the agent does not exist', async () => {
    const topic = topicsRepository.topics[0]
    const subTopic = topic.subTopics[0]

    await expect(
      sut.execute({
        userId: '1',
        agentId: '1',
        topicId: topic.id,
        subTopicId: subTopic.id,
        chosenSubject: subTopic.suggestions[0],
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })

  it('should throw an error if the user does not exist', async () => {
    const topic = topicsRepository.topics[0]
    const subTopic = topic.subTopics[0]
    const agent = agentsRepository.agents[0]

    await expect(
      sut.execute({
        userId: '1',
        agentId: agent.id,
        topicId: topic.id,
        subTopicId: subTopic.id,
        chosenSubject: subTopic.suggestions[0],
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })
})
