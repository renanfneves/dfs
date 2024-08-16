import { UnprocessableEntityError } from '@/errors/unprocessable-entity-error'

import { ChatSession } from '../aggregates/chat-session'

describe('ChatSessionStatus', () => {
  it('should start a chat session', () => {
    const chatSession = ChatSession.create(
      'topicId',
      'subTopicId',
      'chosenSubject',
      'agentId',
      'userId',
    )

    chatSession.start()

    expect(chatSession.status.value).toBe('inProgress')
  })

  it('should close a chat session', () => {
    const chatSession = ChatSession.create(
      'topicId',
      'subTopicId',
      'chosenSubject',
      'agentId',
      'userId',
    )

    chatSession.start()
    chatSession.close()

    expect(chatSession.status.value).toBe('completed')
  })

  it('should throw an error if the chat session is already closed', () => {
    const chatSession = ChatSession.create(
      'topicId',
      'subTopicId',
      'chosenSubject',
      'agentId',
      'userId',
    )

    chatSession.start()
    chatSession.close()

    expect(() => chatSession.close()).toThrow(UnprocessableEntityError)
  })

  it('should throw an error if the chat session is already in progress', () => {
    const chatSession = ChatSession.create(
      'topicId',
      'subTopicId',
      'chosenSubject',
      'agentId',
      'userId',
    )

    chatSession.start()

    expect(() => chatSession.start()).toThrow(UnprocessableEntityError)
  })
})
