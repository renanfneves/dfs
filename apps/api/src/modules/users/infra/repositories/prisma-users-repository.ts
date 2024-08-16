import { prisma } from '@/lib/prisma'
import { User } from '@/modules/users/domain/aggregates/user'
import { UsersRepository } from '@/modules/users/domain/repositories/users-repository'
import { EncryptedIp } from '@/modules/users/domain/value-objects/encrypted-ip'

export class PrismaUsersRepository implements UsersRepository {
  async getUserByIp(encryptedIp: EncryptedIp): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: { encryptedIp: encryptedIp.value },
    })

    return data ? User.restore(data.id, data.encryptedIp) : null
  }

  async createUser(encryptedIp: EncryptedIp) {
    const data = await prisma.user.create({
      data: {
        encryptedIp: encryptedIp.value,
      },
    })

    return User.restore(data.id, data.encryptedIp)
  }
}
