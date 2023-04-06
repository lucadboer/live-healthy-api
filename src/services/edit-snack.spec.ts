import { InMemmorySnacksRepository } from '@/repositories/in-memmory/in-memmory-snack-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { EditSnackService } from './edit-snack'

let snacksRepository: InMemmorySnacksRepository
let sut: EditSnackService

describe('Edit snack Service', async () => {
  beforeEach(() => {
    snacksRepository = new InMemmorySnacksRepository()
    sut = new EditSnackService(snacksRepository)
  })

  it('should be able to edit a snack', async () => {
    snacksRepository.create({
      id: '123456',
      title: 'Rice and Beens',
      description: '',
      date: new Date(),
      hours: '12:00',
      isDiet: true,
    })

    const { snack } = await sut.execute({
      id: '123456',
      title: 'Rice and ROOOO',
      description: '',
      date: new Date(),
      hours: '12:00',
      isDiet: true,
    })

    expect(snack.title).toEqual('Rice and ROOOO')
  })
})
