import { User } from '@/DTO/User'
import { UsersRepository } from '../users-repository'
import { prisma } from '@/libs/prisma'

export class PrismaUsersRepository implements UsersRepository {
  
  async create({id, name, email, password_hash}: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        id,
        name,
        email,
        password_hash
      }
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      }
    })

    return user
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    })

    return user
  }
}
