import { User } from '@/DTO/User'

export interface UsersRepository {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
