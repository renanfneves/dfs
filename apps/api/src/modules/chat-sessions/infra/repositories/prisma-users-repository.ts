import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/modules/chat-sessions/domain/repositories/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async exists(id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { id } })
    return !!user
  }
}
