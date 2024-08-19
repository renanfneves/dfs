import { ChatSessionStatus } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { ChatSession } from '@/modules/chat-sessions/domain/aggregates/chat-session'
import { ChatSessionsRepository } from '@/modules/chat-sessions/domain/repositories/chat-sessions-repository'

export class PrismaChatSessionsRepository implements ChatSessionsRepository {
  async create(chatSession: ChatSession) {
    const status = this.convertStatus(chatSession.getStatus())

    await prisma.chatSession.create({
      data: {
        agentId: chatSession.agentId,
        email: chatSession.email,
        topicId: chatSession.topicId,
        subTopicId: chatSession.subTopicId,
        chosenSubject: chatSession.chosenSubject,
        status,
      },
    })
  }

  async updateStatus(chatSession: ChatSession) {
    const status = this.convertStatus(chatSession.getStatus())

    await prisma.chatSession.update({
      where: { id: chatSession.id },
      data: {
        status,
      },
    })
  }

  private convertStatus(statusString: string): ChatSessionStatus {
    const status: ChatSessionStatus =
      ChatSessionStatus[statusString as keyof typeof ChatSessionStatus]

    return status
  }
}
