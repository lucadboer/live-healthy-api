import { User } from '@/DTO/User'
import { UsersRepository } from '../users-repository'
import { prisma } from '@/libs/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: User): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
