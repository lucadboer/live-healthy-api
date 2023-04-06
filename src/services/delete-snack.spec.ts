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

  it('should be able to edit a snack', async () => {
    await snacksRepository.create({
      id: '123456',
      title: 'Rice and Beens',
      description: '',
      date: new Date(),
      hours: '12:00',
      isDiet: true,
    })

    await sut.execute('123456')

    expect(snacksRepository.items).toEqual([])
  })
})
