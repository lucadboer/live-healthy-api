import { User } from '@/DTO/User'
import { UsersRepository } from '../users-repository'

export class InMemmoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: User) {
    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(user)

    return user
  }
}
