import { InMemmoryUsersRepository } from '@/repositories/in-memmory/in-memmory-user-repository'
import { CreateUserService } from './create-user'

import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistError } from './errors/user-already-exist-error'

let usersRepository: InMemmoryUsersRepository
let sut: CreateUserService

describe('Create user Service', async () => {
  beforeEach(() => {
    usersRepository = new InMemmoryUsersRepository()
    sut = new CreateUserService(usersRepository)
  })

  const testUser = {
    name: 'John Doe',
    email: 'john@doe.com',
    password: '123456',
  }

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute(testUser)

    expect(user.email).toEqual('john@doe.com')
  })

  it('should not be able to create a new user with same email', async () => {
    await sut.execute(testUser)

    expect(async () => {
      await sut.execute(testUser)
    }).rejects.toBeInstanceOf(UserAlreadyExistError)
  })
})
