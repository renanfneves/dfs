import { User } from '@/modules/chat-sessions/domain/aggregates/user'
import { UsersRepository } from '@/modules/chat-sessions/domain/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [new User('u1c6492c-ae5d-4d6e-a612-87a51519fb64')]

  async exists(id: string): Promise<boolean> {
    return this.users.some((user) => user.id === id)
  }
}
