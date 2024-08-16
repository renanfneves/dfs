import { AuthenticateUseCase } from '@/modules/users/application/use-cases/authenticate-use-case'

import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

const usersRepository = new PrismaUsersRepository()
export const authenticateUseCase = new AuthenticateUseCase(usersRepository)
