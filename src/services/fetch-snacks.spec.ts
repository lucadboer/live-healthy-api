import { InMemmorySnacksRepository } from '@/repositories/in-memmory/in-memmory-snack-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchSnacksService } from './fetch-snacks'

let snacksRepository: InMemmorySnacksRepository
let sut: FetchSnacksService

describe('Create snack Service', async () => {
  beforeEach(() => {
    snacksRepository = new InMemmorySnacksRepository()

    sut = new FetchSnacksService(snacksRepository)
  })

  it('should be able to create a new snack', async () => {
    const userId = 'user-01'

    for (let i = 0; i <= 3; i++) {
      await snacksRepository.create({
        id: `snack-${i}`,
        title: 'Rice and Beans',
        description: '',
        date: new Date(),
        hours: '12:00',
        isDiet: true,
        userId,
      })
    }

    const { snacks } = await sut.execute({ userId })

    expect(snacks).toHaveLength(4)
  })
})
