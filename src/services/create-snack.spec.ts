import { InMemmorySnacksRepository } from '@/repositories/in-memmory/in-memmory-snack-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSnackService } from './create-snack'
import { InMemmoryUsersRepository } from '@/repositories/in-memmory/in-memmory-user-repository'
import { ResourcesNotFoundError } from './errors/resources-not-found-error'
import { randomUUID } from 'crypto'

let snacksRepository: InMemmorySnacksRepository
let usersRepository: InMemmoryUsersRepository
let sut: CreateSnackService

describe('Create snack Service', async () => {
  beforeEach(() => {
    usersRepository = new InMemmoryUsersRepository()
    snacksRepository = new InMemmorySnacksRepository()

    sut = new CreateSnackService(snacksRepository, usersRepository)
  })

  const testUser = {
    id: randomUUID(),
    name: 'John Doe',
    email: 'john@doe.com',
    password_hash: '123456',
  }

  it('should be able to create a new snack', async () => {
    const { id } = await usersRepository.create(testUser)

    const { snack } = await sut.execute({
      id: 'snack-01',
      title: 'Rice and Beans',
      description: '',
      date: new Date().toISOString(),
      hour: '12:00',
      is_diet: true,
      user_id: id,
    })

    expect(snack.is_diet).toEqual(true)
  })

  it('should not be able to create a new stack without user', async () => {
    expect(async () => {
      await sut.execute({
        id: '123456',
        title: 'Rice and Beens',
        description: '',
        date: new Date().toISOString(),
        hour: '12:00',
        is_diet: true,
        user_id: 'does not exist',
      })
    }).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })
})
