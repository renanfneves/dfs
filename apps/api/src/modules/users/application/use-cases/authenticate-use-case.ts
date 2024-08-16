import { User } from '@/modules/users/domain/aggregates/user'
import { UsersRepository } from '@/modules/users/domain/repositories/users-repository'
import { EncryptedIp } from '@/modules/users/domain/value-objects/encrypted-ip'

interface AuthenticateUseCaseProps {
  ip: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ ip }: AuthenticateUseCaseProps): Promise<User> {
    const encryptedIp = new EncryptedIp(ip)
    let user = await this.usersRepository.getUserByIp(encryptedIp)

    if (!user) {
      user = await this.usersRepository.createUser(encryptedIp)
    }

    return user
  }
}
