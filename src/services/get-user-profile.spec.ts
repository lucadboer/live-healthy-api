import { InMemmoryUsersRepository } from '@/repositories/in-memmory/in-memmory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { GetUserProfileService } from './get-user-profile'

let usersRepository: InMemmoryUsersRepository
let sut: GetUserProfileService

describe('Get user profile Service', async () => {
  beforeEach(() => {
    usersRepository = new InMemmoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able to get a user', async () => {
    const { id } = await usersRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('test123', 6)
    })

    const { user } = await sut.execute({ userId: id })

    expect(user.email).toEqual('john@doe.com')
  })
})
