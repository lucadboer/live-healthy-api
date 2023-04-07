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
    await snacksRepository.create({
      id: 'snack-01',
      title: 'Rice and Beans',
      description: '',
      date: new Date(),
      hours: '12:00',
      isDiet: true,
      userId: 'user-01',
    })

    const { snack } = await sut.execute({
      id: 'snack-01',
      title: 'Rice and mistake',
      description: '',
      date: new Date(),
      hours: '12:00',
      isDiet: true,
      userId: 'user-01',
    })

    expect(snack.title).toEqual('Rice and mistake')
  })
})
