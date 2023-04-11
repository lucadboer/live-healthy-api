import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserService } from '../authenticate-user'

export function makeAuthenticateUserService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new AuthenticateUserService(usersRepository)

  return service
}
