import { ChatSession } from '../aggregates/chat-session'

export interface ChatSessionsRepository {
  create(chatSession: ChatSession): Promise<void>
  updateStatus(chatSession: ChatSession): Promise<void>
  getManyByUsedId(userId: string): Promise<ChatSession[]>
}
