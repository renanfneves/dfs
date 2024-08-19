import { randomUUID } from 'node:crypto'

import ChatSessionStatus, {
  ChatSessionStatusFactory,
} from '../value-objects/chat-session-status'

export class ChatSession {
  status: ChatSessionStatus

  private constructor(
    public readonly id: string,
    public readonly topicId: string,
    public readonly subTopicId: string,
    public readonly chosenSubject: string,
    public readonly agentId: string,
    public readonly email: string,
    status: string,
  ) {
    this.status = ChatSessionStatusFactory.create(status, this)
  }

  static create(
    topicId: string,
    subTopicId: string,
    chosenSubject: string,
    agentId: string,
    email: string,
  ): ChatSession {
    const id = randomUUID()
    const status = 'open'
    return new ChatSession(
      id,
      topicId,
      subTopicId,
      chosenSubject,
      agentId,
      email,
      status,
    )
  }

  static restore(
    id: string,
    topicId: string,
    subTopicId: string,
    chosenSubject: string,
    agentId: string,
    email: string,
    status: string,
  ): ChatSession {
    return new ChatSession(
      id,
      topicId,
      subTopicId,
      chosenSubject,
      agentId,
      email,
      status,
    )
  }

  start() {
    this.status.start()
  }

  close() {
    this.status.close()
  }

  getStatus() {
    return this.status.value
  }
}
