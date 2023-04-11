import { InMemmoryUsersRepository } from '@/repositories/in-memmory/in-memmory-user-repository'
import { CreateUserService } from './create-user'

import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistError } from './errors/user-already-exist-error'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { AuthenticateUserService } from './authenticate-user'

let usersRepository: InMemmoryUsersRepository
let sut: AuthenticateUserService

describe('Authenticate user Service', async () => {
  beforeEach(() => {
    usersRepository = new InMemmoryUsersRepository()
    sut = new AuthenticateUserService(usersRepository)
  })

  it('should be able to authenticate a user', async () => {
    const userId = randomUUID()

    const user = await usersRepository.create({
      id: userId,
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('test123', 6)
    })
    
    const {user: {id}} = await sut.execute({
      email: user.email,
      password: user.password_hash
    })

    expect(id).toEqual(user.id)
  })
})
