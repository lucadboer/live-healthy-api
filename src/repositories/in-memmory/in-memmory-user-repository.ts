import { User } from '@/DTO/User'
import { UsersRepository } from '../users-repository'

export class InMemmoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: User) {
    const user = {
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(user)

    return user
  }
}
