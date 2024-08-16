import { User } from '@/modules/users/domain/aggregates/user'
import { InMemoryUsersRepository } from '@/modules/users/infra/repositories/in-memory-users-repository'

import { AuthenticateUseCase } from './authenticate-use-case'

const TEST_IP = '192.168.0.1'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('AuthenticateUseCase', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should should persist and authenticate a user by ip', async () => {
    await sut.execute({ ip: TEST_IP })

    expect(usersRepository.users).toHaveLength(1)
  })

  it('should should authenticate and not persist a user with existing ip', async () => {
    const user = User.create(TEST_IP)
    usersRepository.users.push(user)

    await sut.execute({ ip: TEST_IP })
    expect(usersRepository.users).toHaveLength(1)
  })
})
