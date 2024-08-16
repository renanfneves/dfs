import { NotFoundError } from '@/errors/not-found-error'
import { ChatSession } from '@/modules/chat-sessions/domain/aggregates/chat-session'
import { ChatSessionsRepository } from '@/modules/chat-sessions/domain/repositories/chat-sessions-repository'

export class InMemoryChatSessionsRepository implements ChatSessionsRepository {
  private chatSessions: ChatSession[] = []

  async create(chatSession: ChatSession): Promise<void> {
    this.chatSessions.push(chatSession)
  }

  async updateStatus(chatSession: ChatSession): Promise<void> {
    const index = this.chatSessions.findIndex(
      (chat) => chat.id === chatSession.id,
    )

    if (index === -1) {
      throw new NotFoundError('Chat session not found')
    }

    this.chatSessions[index].status = chatSession.status
  }

  async getManyByUsedId(userId: string): Promise<ChatSession[]> {
    return this.chatSessions.filter(
      (chatSession) => chatSession.userId === userId,
    )
  }
}
