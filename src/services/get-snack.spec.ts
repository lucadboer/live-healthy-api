import { InMemmorySnacksRepository } from '@/repositories/in-memmory/in-memmory-snack-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetSnackService } from './get-snack'

let snacksRepository: InMemmorySnacksRepository
let sut: GetSnackService

describe('Create snack Service', async () => {
  beforeEach(() => {
    snacksRepository = new InMemmorySnacksRepository()

    sut = new GetSnackService(snacksRepository)
  })

  it('should be able to get one snack', async () => {
    const snackId = 'snack-01'

    await snacksRepository.create({
      id: snackId,
      title: 'Rice and Mistake',
      description: '',
      date: new Date(),
      hours: '12:00',
      isDiet: true,
      userId: 'user-01',
    })

    const { snack } = await sut.execute({ snackId })

    expect(snack.title).toEqual('Rice and Mistake')
  })
})
