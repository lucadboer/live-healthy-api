import { InMemmorySnacksRepository } from '@/repositories/in-memmory/in-memmory-snack-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchSnacksService } from './fetch-snacks'

let snacksRepository: InMemmorySnacksRepository
let sut: FetchSnacksService

describe('Fetch snacks Service', async () => {
  beforeEach(() => {
    snacksRepository = new InMemmorySnacksRepository()

    sut = new FetchSnacksService(snacksRepository)
  })

  it('should be able to fetch snacks', async () => {
    const userId = 'user-01'

    for (let i = 0; i <= 3; i++) {
      await snacksRepository.create({
        id: `snack-${i}`,
        title: 'Rice and Beans',
        description: '',
        date: new Date(),
        hour: '12:00',
        is_diet: true,
        user_id: userId,
      })
    }

    const { snacks } = await sut.execute({ userId })

    expect(snacks).toHaveLength(4)
  })
})
