import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserService } from '../create-user'
import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { CreateSnackService } from '../create-snack'

export function makeCreateSnackService() {
  const snacksRepository = new PrismaSnacksRepository()
  const usersRepository = new PrismaUsersRepository()
  const service = new CreateSnackService(snacksRepository, usersRepository)

  return service
}
