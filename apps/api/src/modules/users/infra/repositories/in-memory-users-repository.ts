import { User } from '@/modules/users/domain/aggregates/user'
import { UsersRepository } from '@/modules/users/domain/repositories/users-repository'
import { EncryptedIp } from '@/modules/users/domain/value-objects/encrypted-ip'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async getUserByIp(encryptedIp: EncryptedIp) {
    const user = this.users.find((user) =>
      user.encryptedIp.equals(encryptedIp.value),
    )

    return user || null
  }

  async createUser(encryptedIp: EncryptedIp) {
    if (this.users.find((user) => user.encryptedIp.equals(encryptedIp.value))) {
      throw new Error('User already exists')
    }

    const user = User.create(encryptedIp.value)
    this.users.push(user)
    return user
  }
}
