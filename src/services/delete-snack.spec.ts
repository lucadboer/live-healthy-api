import { InMemmorySnacksRepository } from '@/repositories/in-memmory/in-memmory-snack-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteSnackService } from './delete-snack'

let snacksRepository: InMemmorySnacksRepository
let sut: DeleteSnackService

describe('delete snack Service', async () => {
  beforeEach(() => {
    snacksRepository = new InMemmorySnacksRepository()
    sut = new DeleteSnackService(snacksRepository)
  })

  it('should be able to delete a snack', async () => {
    await snacksRepository.create({
      id: 'snack-01',
      title: 'Rice and Beans',
      description: '',
      date: new Date(),
      hour: '12:00',
      is_diet: true,
      user_id: 'user-01',
    })

    await sut.execute('snack-01')

    expect(snacksRepository.items).toEqual([])
  })
})
