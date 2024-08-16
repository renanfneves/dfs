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
    const [agent] = agentsRepository.agents
    const [user] = usersRepository.users
    const [topic] = topicsRepository.topics
    const [subTopic] = topic.subTopics

    await sut.execute({
      userId: user.id,
      agent: agent.name,
      topicId: topic.id,
      subTopicId: subTopic.id,
      chosenSubject: subTopic.suggestions[0],
    })

    const chatSessions = await chatSessionsRepository.getManyByUsedId(user.id)

    expect(chatSessions).toHaveLength(1)
  })

  it('should throw an error if the agent does not exist', async () => {
    await expect(
      sut.execute({
        userId: 'FAKE',
        agent: 'NOT_EXISTING_AGENT',
        topicId: 'FAKE',
        subTopicId: 'FAKE',
        chosenSubject: 'FAKE',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })

  it('should throw an error if the user does not exist', async () => {
    const [agent] = agentsRepository.agents

    await expect(
      sut.execute({
        userId: 'NOT_EXISTING_USER',
        agent: agent.name,
        topicId: 'FAKE',
        subTopicId: 'FAKE',
        chosenSubject: 'FAKE',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })

  it('should throw an error if the topic does not exist', async () => {
    const [agent] = agentsRepository.agents
    const [user] = usersRepository.users

    await expect(
      sut.execute({
        userId: user.id,
        agent: agent.name,
        topicId: 'NOT_EXISTING_TOPIC',
        subTopicId: 'FAKE',
        chosenSubject: 'FAKE',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })

  it('should throw an error if the subtopic does not belong to topic', async () => {
    const [agent] = agentsRepository.agents
    const [user] = usersRepository.users
    const [topic] = topicsRepository.topics

    await expect(
      sut.execute({
        userId: user.id,
        agent: agent.name,
        topicId: topic.id,
        subTopicId: 'NOT_BELONGING_SUBTOPIC',
        chosenSubject: '1',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })

  it('should throw an error if the chosen subject is invalid', async () => {
    const [agent] = agentsRepository.agents
    const [user] = usersRepository.users
    const [topic] = topicsRepository.topics
    const [subTopic] = topic.subTopics


    await expect(
      sut.execute({
        userId: '1',
        agent: '1',
        topicId: topic.id,
        subTopicId: subTopic.id,
        chosenSubject: '1',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })
})
