import { GetTopicsUseCase } from '../../application/use-cases/get-topics-use-case'
import { PrismaTopicsRepository } from '../repositories/prisma-topics-repository'

const prismaTopicsRepository = new PrismaTopicsRepository()
export const getTopicsUseCase = new GetTopicsUseCase(prismaTopicsRepository)
