import { UnprocessableEntityError } from '@/errors/unprocessable-entity-error'

import { ChatSession } from '../aggregates/chat-session'

export default abstract class ChatSessionStatus {
  abstract value: string

  constructor(readonly chatSession: ChatSession) {}

  abstract request(): void
  abstract start(): void
  abstract close(): void
}

export class RequestedStatus extends ChatSessionStatus {
  value: string

  constructor(chatSession: ChatSession) {
    super(chatSession)
    this.value = 'open'
  }

  request(): void {
    throw new UnprocessableEntityError('Invalid status')
  }

  start(): void {
    this.chatSession.status = new InProgressStatus(this.chatSession)
  }

  close(): void {
    throw new UnprocessableEntityError('Invalid status')
  }
}

export class InProgressStatus extends ChatSessionStatus {
  value: string

  constructor(chatSession: ChatSession) {
    super(chatSession)
    this.value = 'inProgress'
  }

  request(): void {
    throw new UnprocessableEntityError('Invalid status')
  }

  start(): void {
    throw new UnprocessableEntityError('Invalid status')
  }

  close(): void {
    this.chatSession.status = new ClosedStatus(this.chatSession)
  }
}

export class ClosedStatus extends ChatSessionStatus {
  value: string

  constructor(chatSession: ChatSession) {
    super(chatSession)
    this.value = 'completed'
  }

  request(): void {
    throw new UnprocessableEntityError('Invalid status')
  }

  start(): void {
    throw new UnprocessableEntityError('Invalid status')
  }

  close(): void {
    throw new UnprocessableEntityError('Invalid status')
  }
}

export class ChatSessionStatusFactory {
  static create(type: string, chatSession: ChatSession) {
    if (type === 'open') return new RequestedStatus(chatSession)
    if (type === 'inProgress') return new InProgressStatus(chatSession)
    if (type === 'closed') return new ClosedStatus(chatSession)
    throw new UnprocessableEntityError()
  }
}
